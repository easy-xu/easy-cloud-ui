import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import { getQuestionnaire, initAnswer } from '@/services/questionnaire';

import { Card, Radio, Space, Button, Statistic, Row, Col } from 'antd';
import './questions.less';

let i = 1;

const Questions: FC = () => {
  const { questionnaire, queryQuestionnaire } = useModel('questionnaire');

  queryQuestionnaire(1);

  //初始化问卷
  const initRequset = useRequest((id) => initAnswer(id), {
    manual: true,
    onSuccess: (data) => {
      history.push('/questionnaire/questions');
    },
  });

  const reInit = function () {
    initRequset.run(i);
  };

  const goQuesiton = function () {
    history.push('/questionnaire/questions?answer=3');
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
                <Statistic title="参与测试" value={112893} />
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

export default Questions;
