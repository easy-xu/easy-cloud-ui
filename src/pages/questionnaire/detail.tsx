import { FC, useState } from 'react';
import { useRequest, history, useModel, Redirect } from 'umi';
import {
  queryAnswer,
  queryQuestionnaire,
  initAnswer,
} from '@/services/questionnaire';

import { Card, Radio, Space, Button, Statistic, Row, Col } from 'antd';
import './questions.less';

const Questionnaire: FC = (props: any) => {
  const questionnaireId = props.location.query.id;

  if (!questionnaireId) {
    return <Redirect to="/questionnaire/list" />;
  }

  const { questionnaire, setQuestionnaire } = useModel('questionnaire');

  //查询问卷信息
  const queryQuestionnaireRequest = useRequest(
    () => queryQuestionnaire(questionnaireId),
    {
      onSuccess: (data) => {
        setQuestionnaire(data);
      },
    },
  );
  //查询回答信息
  const queryAnswerRequest = useRequest(
    () => queryAnswer(undefined, questionnaireId),
    {
      onSuccess: (data) => {},
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
    initRequset.run(questionnaireId);
  };

  const goQuesiton = function () {
    history.push('/questionnaire/questions?answer=' + answer.questionIndex);
  };

  const init = function () {
    initRequset.run(questionnaireId);
  };

  const data = questionnaire;
  const answer = queryAnswerRequest.data;

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
            {answer ? (
              <Row gutter={16}>
                <Col span={12}>
                  <Button onClick={reInit}>重新开始</Button>
                </Col>
                <Col span={12}>
                  <Button onClick={goQuesiton} type="primary">
                    继续答题
                  </Button>
                </Col>
              </Row>
            ) : (
              <Button
                type="primary"
                loading={initRequset.loading}
                onClick={init}
              >
                开始测试
              </Button>
            )}
          </div>
        </Card>
      ) : (
        ''
      )}
    </div>
  );
};

export default Questionnaire;
