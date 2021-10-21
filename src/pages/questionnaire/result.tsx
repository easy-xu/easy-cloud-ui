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
  Button,
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
    return <Loading></Loading>;
  }

  const { questionnaire, setQuestionnaire } = useModel('questionnaire');

  //问卷回答状态
  const [flow, setFlow] = useState(0);

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
      setFlow(data.flow);
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
  const listAnswerResultRequest = useRequest(() => listAnswerResult(answerId), {
    manual: true,
    onSuccess: (data) => {},
  });

  const results = listAnswerResultRequest.data;

  if (!questionnaire || flow == 0) {
    return <Loading />;
  }

  //判断最大分值结论
  let maxScoreResultId = 0;
  let maxScore = 0;
  results?.forEach((r: any) => {
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

  const flowNode =
    flow == 1 ? (
      <FixRow>
        <div className="div-button">
          <Paragraph>测试未完成</Paragraph>
          <Button
            type="primary"
            onClick={() => {
              history.push('/questionnaire/questions?answer=' + answerId);
            }}
          >
            继续答题
          </Button>
        </div>
      </FixRow>
    ) : //问卷已提交
    flow == 2 ? (
      <FixRow>
        <div className="div-button">
          <Statistic.Countdown
            title="测试已完成, 等待计算结果"
            format="ss"
            value={Date.now() + 3 * 1000}
            onFinish={() => {
              statusAnswerRequest.run();
            }}
          />
        </div>
      </FixRow>
    ) : //问卷计算中
    flow == 3 ? (
      <FixRow>
        <div className="div-button">
          <Statistic.Countdown
            title="结果计算中..."
            format="ss"
            value={Date.now() + 3 * 1000}
            onFinish={() => {
              statusAnswerRequest.run();
            }}
          />
        </div>
      </FixRow>
    ) : //问卷计算结束
    flow == 4 && !results ? (
      <FixRow>
        <div className="div-button">
          <Statistic.Countdown
            title="结果已计算完成，查询结果中.."
            format=""
            value={Date.now() + 1 * 1000}
            onFinish={() => {
              listAnswerResultRequest.run();
            }}
          />
        </div>
      </FixRow>
    ) : (
      ''
    );

  const resultsNode = results ? (
    <div className="div-result">
      <FixRow>
        <Radar {...config} />
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
  ) : (
    ''
  );

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
        {flowNode}
        {resultsNode}
      </Card>
    </div>
  );
};

export default Result;
