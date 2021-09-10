import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import { getQuestionnaire, initQuestionnaire } from '@/services/question';

import { Card, Radio, Space, Button, Statistic, Row, Col } from 'antd';
import './questions.less';

let i = 1;

const Questions: FC = () => {
  //查询问卷
  const getRequest = useRequest(() => getQuestionnaire(1), {
    onSuccess: (data) => {
      if (data.answer) {
        history.push('/questionnaire/questions');
      }
    },
  });

  //初始化问卷
  const initRequset = useRequest((id) => initQuestionnaire(id), {
    manual: true,
  });

  const nextQuestion = function () {};

  const preQuestion = function () {};

  const init = function () {
    initRequset.run(i);
    history.push('/questionnaire/questions');
  };

  const data = getRequest.data;

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
                  <Button onClick={preQuestion}>上一题</Button>
                </Col>
                <Col span={12}>
                  <Button onClick={nextQuestion} type="primary">
                    下一题
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
