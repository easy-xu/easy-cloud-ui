import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import { questionRequest } from '@/services/question';

import { Card, Radio, Space, Button, Statistic, Row, Col } from 'antd';
import './questions.less';

let i = 1;

const Questions: FC = () => {
  //问题选择的答案编号
  const [selectId, setSelectId] = useState(0);

  //用户登录
  const { data, error, loading, run } = useRequest(
    (id) => questionRequest(id),
    {
      manual: true,
      onSuccess: (result) => {
        console.log(result);
      },
    },
  );

  const nextQuestion = function () {
    run(i++);
  };

  const preQuestion = function () {
    run(i--);
  };

  const onSelect = function (id: any) {
    setSelectId(id);
  };

  return (
    <div>
      <Card>
        <div className="div-head">
          <h1>{data ? data.questionnaire.title : ''}</h1>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="参与测试" value={112893} />
            </Col>
            <Col span={12}>
              <Statistic title="剩余题目" value={93} suffix="/ 100" />
            </Col>
          </Row>
        </div>
        {data ? (
          <div className="div-question">
            <h2>{data.question}</h2>
            <Radio.Group value={selectId}>
              <Space direction="vertical">
                {data.options.map((option: any) => {
                  return (
                    <div key={option.id} className="div-option">
                      <Card
                        hoverable={true}
                        style={
                          selectId == option.id ? { background: '#b37feb' } : {}
                        }
                        onClick={() => onSelect(option.id)}
                      >
                        <Radio value={option.id}>{option.text}</Radio>
                      </Card>
                    </div>
                  );
                })}
              </Space>
            </Radio.Group>
          </div>
        ) : (
          ''
        )}
        <div className="div-button">
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
        </div>
      </Card>
    </div>
  );
};

export default Questions;
