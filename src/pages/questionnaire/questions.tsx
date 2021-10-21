import { FC, useState } from 'react';
import { useRequest, history, useModel, Redirect } from 'umi';
import {
  queryAnswer,
  queryAnswerQuestion,
  queryQuestionByIndex,
  queryQuestionnaire,
  saveAnswerQuestion,
  statusAnswer,
} from '@/services/questionnaire';
import {
  Card,
  Radio,
  Space,
  Button,
  Statistic,
  Row,
  Col,
  Typography,
} from 'antd';
const { Title, Paragraph } = Typography;

import './index.less';
import FixRow from '@/components/FixRow';
import Loading from '@/components/Loading';

let index = 0;
let max_index = 0;

let lock = false;

const Questions: FC = (props: any) => {
  const answerId = parseInt(props.location.query.answer);
  if (!answerId) {
    return <Redirect to="/questionnaire/list" />;
  }

  const { questionnaire, setQuestionnaire } = useModel('questionnaire');

  //查询问题
  const queryQuestionReqeust = useRequest(
    (questionnaireId, index) => queryQuestionByIndex(questionnaireId, index),
    {
      manual: true,
      onSuccess: (data) => {
        //查询当前问题是否有答案
        queryAnswerQuestionRequest.run(answerId, data.id);
      },
    },
  );

  //查询问卷
  const queryQuestionnaireRequest = useRequest(
    (questionnaireId) => queryQuestionnaire(questionnaireId),
    {
      manual: true,
      onSuccess: (data) => {
        setQuestionnaire(data);
      },
    },
  );

  //查询回答
  const queryAnswerRequest = useRequest(() => queryAnswer(answerId), {
    onSuccess: (data) => {
      //查询问卷
      if (questionnaire == undefined) {
        queryQuestionnaireRequest.run(data.questionnaireId);
      }
      //查询问题状态
      statusAnswerRequest.run(data.id);
    },
  });

  //查询回答状态
  const statusAnswerRequest = useRequest((answerId) => statusAnswer(answerId), {
    manual: true,
    onSuccess: (data) => {
      if (data.flow == 2) {
        return <Redirect to={'/questionnaire/result?answer=' + data.id} />;
      } else {
        //设置问题索引
        index = data.questionIndex;
        max_index = index;
        //查询当前问题
        queryQuestionReqeust.run(data.questionnaireId, data.questionIndex);
      }
    },
  });

  //保存问题答案
  const saveAnswerQuestionRequest = useRequest(
    (params) => saveAnswerQuestion(params),
    {
      manual: true,
      debounceInterval: 500,
      onSuccess: (data) => {
        if (index >= questionnaire.questionNum) {
          //跳转结束页面
          history.push('/questionnaire/result?answer=' + answerId);
        } else {
          //跳转下一个问题
          nextQuestion();
        }
      },
    },
  );

  const queryAnswerQuestionRequest = useRequest(
    (answerId, questionId) => queryAnswerQuestion(answerId, questionId),
    {
      manual: true,
      onSuccess: (data) => {
        //已回答问题设置选中状态
        setSelectId(data.optionId);
        lock = false;
      },
    },
  );

  //问题选择的答案编号
  const [selectId, setSelectId] = useState(1);

  const nextQuestion = function () {
    if (index >= questionnaire.questionNum) {
      return;
    }
    index++;
    if (index > max_index) {
      max_index = index;
    }
    queryQuestionReqeust.run(questionnaire.id, index);
  };

  const preQuestion = function () {
    if (index <= 1) {
      return;
    }
    index--;
    queryQuestionReqeust.run(questionnaire.id, index);
  };

  const onSelect = function (e: any, option: any) {
    if (lock) {
      return;
    }
    lock = true;
    //设置选中状态
    setSelectId(option.id);
    e.stopPropagation();
    const params = {
      id: answer.id,
      answerId: answerId,
      questionId: question.id,
      optionId: option.id,
      optionValue: option.value,
    };
    console.log(params);
    saveAnswerQuestionRequest.run(params);
  };

  const question = queryQuestionReqeust.data;
  const answer = queryAnswerQuestionRequest.data;

  if (!questionnaire || !question) {
    return <Loading />;
  }

  return (
    <div>
      <Card>
        <div className="div-head">
          <Title level={3}>{questionnaire.title}</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="参与测试"
                value={questionnaire.participantNum}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="剩余题目"
                value={questionnaire.questionNum - index + 1}
                suffix={'/' + questionnaire.questionNum}
              />
            </Col>
          </Row>
        </div>
        <div className="div-question">
          <FixRow>
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
                            ? {
                                background: '#b37feb',
                              }
                            : {}
                        }
                        onClick={(e) => onSelect(e, option)}
                      >
                        <Radio value={option.id}>{option.text}</Radio>
                      </Card>
                    </div>
                  );
                })}
              </Space>
            </Radio.Group>
          </FixRow>
        </div>
        <div className="div-button">
          <Row gutter={16}>
            <Col span={12}>
              {index != 1 ? <Button onClick={preQuestion}>上一题</Button> : ''}
            </Col>
            <Col span={12}>
              {index < max_index ? (
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
