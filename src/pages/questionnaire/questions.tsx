import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import { getQuestionByIndex } from '@/services/questionnaire';
import { Card, Radio, Space, Button, Statistic, Row, Col } from 'antd';
import './questions.less';

const Questions: FC = (props: any) => {
  console.log(props);
  console.log(props.location.query.answer);

  const { questionnaire, index, setIndex } = useModel('questionnaire');

  console.log('questionnaire', questionnaire);

  if (!questionnaire) {
    history.push('/questionnaire/list');
    return <div>跳转中...</div>;
  }

  //查询问题
  const queryQuestionReqeust = useRequest(() =>
    getQuestionByIndex(questionnaire.id, index),
  );
  console.log('queryQuestionReqeust', queryQuestionReqeust.data);

  //问题选择的答案编号
  const [selectId, setSelectId] = useState(0);

  const nextQuestion = function () {
    if (index >= questionnaire.questionNum) {
      return;
    }
    setIndex(index + 1);
    queryQuestionReqeust.run();
  };

  const preQuestion = function () {
    if (index <= 1) {
      return;
    }
    setIndex(index - 1);
    queryQuestionReqeust.run();
  };

  const onSelect = function (id: any) {
    setSelectId(id);
    nextQuestion();
  };

  const question = queryQuestionReqeust.data;

  return (
    <div>
      <Card>
        <div className="div-head">
          <h1>{questionnaire ? questionnaire.title : ''}</h1>
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
                          selectId == option.id ? { background: '#b37feb' } : {}
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
              {index != 1 ? <Button onClick={preQuestion}>上一题</Button> : ''}
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
    </div>
  );
};

export default Questions;
