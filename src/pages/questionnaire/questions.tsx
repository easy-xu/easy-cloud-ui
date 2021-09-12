import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import {
  getAnswer,
  getQuestionByIndex,
  getQuestionnaire,
} from '@/services/questionnaire';
import { Card, Radio, Space, Button, Statistic, Row, Col } from 'antd';
import './questions.less';

const Questions: FC = (props: any) => {
  const answerId = props.location.query.answer;
  if (answerId == undefined) {
    history.push('/questionnaire/list');
    return <div>加载中...</div>;
  }

  const { questionnaire, setQuestionnaire } = useModel('questionnaire');
  const [index, setIndex] = useState<number>(1);

  //查询问题
  const queryQuestionReqeust = useRequest(
    (questionnaireId, index) => getQuestionByIndex(questionnaireId, index),
    { manual: true },
  );

  //查询问卷
  const queryQuestionnaireRequest = useRequest(
    (questionnaireId) => getQuestionnaire(questionnaireId),
    {
      manual: true,
      onSuccess: (data) => {
        setQuestionnaire(data);
      },
    },
  );

  const getAnswerRequest = useRequest(() => getAnswer(answerId), {
    onSuccess: (data) => {
      //查询问卷
      if (!questionnaire) {
        queryQuestionnaireRequest.run(data.questionnaireId);
      }
      //设置问题索引
      setIndex(data.questionIndex);
      //查询当前问题
      queryQuestionReqeust.run(data.questionnaireId, data.questionIndex);
    },
  });

  //问题选择的答案编号
  const [selectId, setSelectId] = useState(0);

  const nextQuestion = function () {
    if (index >= questionnaire.questionNum) {
      return;
    }
    setIndex(index + 1);
    queryQuestionReqeust.run(questionnaire.id, index);
  };

  const preQuestion = function () {
    if (index <= 1) {
      return;
    }
    setIndex(index - 1);
    queryQuestionReqeust.run(questionnaire.id, index);
  };

  const onSelect = function (id: any) {
    setSelectId(id);
    nextQuestion();
  };

  const question = queryQuestionReqeust.data;

  return (
    <div>
      {' '}
      {questionnaire ? (
        <Card>
          <div className="div-head">
            <h1>{questionnaire.title}</h1>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="参与测试" value={112893} />
              </Col>
              <Col span={12}>
                <Statistic
                  title="剩余题目"
                  value={questionnaire.questionNum - index}
                  suffix={'/' + questionnaire.questionNum}
                />
              </Col>
            </Row>
          </div>
          {question ? (
            <div className="div-question">
              <h2>{question.title}</h2>
              <Radio.Group value={selectId}>
                <Space direction="vertical">
                  {question.options.map((option: any) => {
                    return (
                      <div key={option.id} className="div-option">
                        <Card
                          hoverable={true}
                          style={
                            selectId == option.id
                              ? { background: '#b37feb' }
                              : {}
                          }
                          onClick={() => onSelect(option.id)}
                        >
                          <Radio value={option.id}>{option.text}</Radio>
                        </Card>
                      </div>
                    );
                  })}
                </Space>
              </Radio.Group>
            </div>
          ) : (
            ''
          )}
          <div className="div-button">
            <Row gutter={16}>
              <Col span={12}>
                {index != 1 ? (
                  <Button onClick={preQuestion}>上一题</Button>
                ) : (
                  ''
                )}
              </Col>
              <Col span={12}>
                {index != questionnaire.questionNum ? (
                  <Button
                    type="primary"
                    loading={queryQuestionReqeust.loading}
                    onClick={nextQuestion}
                  >
                    下一题
                  </Button>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </div>
        </Card>
      ) : (
        ''
      )}
    </div>
  );
};

export default Questions;
