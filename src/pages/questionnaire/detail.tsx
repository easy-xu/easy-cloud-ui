import { FC, useState } from 'react';
import { useRequest, history, useModel, Redirect } from 'umi';
import {
  queryAnswer,
  queryQuestionnaire,
  initAnswer,
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
      onSuccess: (data) => {
        statusAnswerRequest.run(data.id);
      },
    },
  );
  //查询回答状态
  const statusAnswerRequest = useRequest((answerId) => statusAnswer(answerId), {
    manual: true,
    onSuccess: (data) => {
      if (data.flow == 2) {
      }
    },
  });

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
    history.push('/questionnaire/questions?answer=' + answer.id);
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
            <Title level={3}>{data.title}</Title>
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
            <Title level={5}>{data.shortDesc}</Title>
            {answer ? (
              <div>
                <Paragraph>检测到已有回答记录</Paragraph>
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
              </div>
            ) : (
              <div>
                <Paragraph></Paragraph>
                <Button
                  type="primary"
                  loading={initRequset.loading}
                  onClick={init}
                >
                  开始测试
                </Button>
              </div>
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
