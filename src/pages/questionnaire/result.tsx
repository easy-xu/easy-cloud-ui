import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import {
  queryAnswer,
  queryQuestionnaire,
  initAnswer,
  statusAnswer,
  listAnswerResult,
} from '@/services/questionnaire';

import {
  Card,
  Radio,
  Space,
  Button,
  Statistic,
  Row,
  Col,
  Collapse,
  Descriptions,
  Divider,
} from 'antd';
const { Panel } = Collapse;
const { Item } = Descriptions;

import './questions.less';

let i = 1;

const Result: FC = (props: any) => {
  const answerId = parseInt(props.location.query.answer);
  if (!answerId) {
    history.push('/questionnaire/list');
    return <div>加载中...</div>;
  }

  const { questionnaire, setQuestionnaire } = useModel('questionnaire');

  //查询回答
  const queryAnswerRequest = useRequest(() => queryAnswer(answerId), {
    onSuccess: (data) => {
      //查询问卷
      if (questionnaire == undefined) {
        queryQuestionnaireRequest.run(data.questionnaireId);
      }
    },
  });

  //查询回答
  const statusAnswerRequest = useRequest(() => statusAnswer(answerId), {
    onSuccess: (data) => {
      console.log(data);
      if (data.flow == 2) {
        listAnswerResultRequest.run(answerId);
      }
    },
  });

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

  //查询回答计算结果
  const listAnswerResultRequest = useRequest(
    (answerId) => listAnswerResult(answerId),
    {
      manual: true,
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  //初始化问卷
  const initRequset = useRequest((id) => initAnswer(id), {
    manual: true,
    onSuccess: (data) => {
      history.push('/questionnaire/questions?answer=' + data.id);
    },
  });

  const reInit = function () {
    initRequset.run(i);
  };

  const goOthers = function () {
    history.push('/questionnaire/list');
  };

  const init = function () {
    initRequset.run(i);
  };

  const data = questionnaire;
  const results = listAnswerResultRequest.data;

  return (
    <div>
      {data ? (
        <Card>
          <div className="div-head">
            <h1>{data.title}</h1>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="参与测试" value={data.participantNum} />
              </Col>
              <Col span={12}>
                <Statistic title="题目数量" value={data.questionNum} />
              </Col>
            </Row>
          </div>

          <div className="div-result">
            {results ? (
              <div>
                {results.map((item: any, index: number) => {
                  return (
                    <div>
                      <Descriptions
                        column={1}
                        title={item.title + ', 得分:' + item.score}
                        bordered
                      >
                        {item.descriptions.map((desc: any) => {
                          return <Item label={desc.name}>{desc.value}</Item>;
                        })}
                      </Descriptions>
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}
            ,
          </div>
          <div className="div-button">
            {data.answer ? (
              <Row gutter={16}>
                <Col span={12}>
                  <Button onClick={reInit}>重新测试</Button>
                </Col>
                <Col span={12}>
                  <Button onClick={goOthers} type="primary">
                    查看其它
                  </Button>
                </Col>
              </Row>
            ) : (
              ''
            )}
          </div>
        </Card>
      ) : (
        ''
      )}
    </div>
  );
};

export default Result;
