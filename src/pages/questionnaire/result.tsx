import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import {
  queryAnswer,
  queryQuestionnaire,
  statusAnswer,
  listAnswerResult,
} from '@/services/questionnaire';

import {
  Card,
  Statistic,
  Row,
  Col,
  Collapse,
  Descriptions,
  Tabs,
  Divider,
  Typography,
} from 'antd';
import { Radar } from '@ant-design/charts';

const { Panel } = Collapse;
const { Item } = Descriptions;
const { Title, Paragraph, Text, Link } = Typography;

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

  const { isMobile } = useModel('system', (model) => ({
    isMobile: model.isMobile,
  }));

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

  //判断最大分值结论
  let maxScoreResultId = results[0].id;
  let maxScore = 0;
  results.forEach((r: any) => {
    if (r.score > maxScore) {
      maxScore = r.score;
      maxScoreResultId = r.id;
    }
  });

  //雷达图配置
  const config = {
    data: results?.map((d: any) => ({ name: d.title, value: d.score })),
    xField: 'name',
    yField: 'value',
    meta: {
      value: {
        alias: '分数',
        min: 0,
        nice: true,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
      // 开启辅助点
      point: {},
      area: {},
    },
  };

  const chartOnReady = (plot: any) => {
    console.log('chartOnReady');
    // axis-label 添加点击事件
    plot.on('axis-label:click', (...args: any[]) => {
      console.log(...args);
    });
  };

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
            <Radar {...config} onReady={chartOnReady} />
          </FixRow>
          <FixRow>
            <div>
              <Tabs
                tabPosition={isMobile ? 'top' : 'right'}
                defaultActiveKey={`${maxScoreResultId}`}
              >
                {results.map((item: any) => {
                  return (
                    <Tabs.TabPane tab={item.title} key={`${item.id}`}>
                      <Title level={3}>
                        {item.title}{' '}
                        <Text code strong italic>
                          {item.score}分
                        </Text>
                      </Title>
                      {item.descriptions.map((desc: any) => {
                        return (
                          <div key={desc.id}>
                            <Title level={5}>{desc.name}</Title>
                            <Paragraph>{desc.value}</Paragraph>
                          </div>
                        );
                      })}
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </div>
          </FixRow>
        </div>
      </Card>
    </div>
  );
};

export default Result;
