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
  Spin,
} from 'antd';
const { Panel } = Collapse;
const { Item } = Descriptions;

import './index.less';
import FixRow from '@/components/FixRow';
import Loading from '@/components/Loading';

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

  const results = listAnswerResultRequest.data;

  if (!questionnaire || !results) {
    return <Loading />;
  }

  return (
    <div>
      <Card>
        <div className="div-head">
          <h1>{questionnaire.title}</h1>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="参与测试"
                value={questionnaire.participantNum}
              />
            </Col>
            <Col span={12}>
              <Statistic title="题目数量" value={questionnaire.questionNum} />
            </Col>
          </Row>
        </div>
        <div className="div-result">
          <FixRow>
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
          </FixRow>
        </div>
      </Card>
    </div>
  );
};

export default Result;
