import { FC } from 'react';

import {
  List,
  Card,
  Radio,
  Progress,
  Space,
  Button,
  Statistic,
  Row,
  Col,
} from 'antd';
import './questions.less';

const Questions: FC = () => {
  const onChange = function () {
    console.log('radio checked');
  };

  return (
    <div>
      <Card>
        <div className="div-head">
          <h1>问卷标题</h1>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="参与测试" value={112893} />
            </Col>
            <Col span={12}>
              <Statistic title="剩余题目" value={93} suffix="/ 100" />
            </Col>
          </Row>
        </div>
        <div className="div-question">
          <h2>问题题目</h2>
          <Radio.Group onChange={onChange}>
            <Space direction="vertical">
              <Radio value={1}>Option A</Radio>
              <Radio value={2}>Option B</Radio>
              <Radio value={3}>Option C</Radio>
              <Radio value={4}>More...</Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className="div-option">
          <Row gutter={16}>
            <Col span={12}>
              <Button>上一题</Button>
            </Col>
            <Col span={12}>
              <Button type="primary">下一题</Button>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Questions;
