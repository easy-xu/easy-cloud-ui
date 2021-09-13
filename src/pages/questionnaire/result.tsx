import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import {
  getAnswer,
  getQuestionnaire,
  initAnswer,
} from '@/services/questionnaire';

import { Card, Radio, Space, Button, Statistic, Row, Col } from 'antd';
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
  const getAnswerRequest = useRequest(() => getAnswer(answerId), {
    onSuccess: (data) => {
      //查询问卷
      if (questionnaire == undefined) {
        queryQuestionnaireRequest.run(data.questionnaireId);
      }
    },
  });

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
