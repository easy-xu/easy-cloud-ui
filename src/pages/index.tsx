import { Card, Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

export default function IndexPage() {
  return (
    <div>
      <Card>
        <Title level={3}>欢迎使用</Title>
        <Paragraph>
          今天是个<Text strong>好日子</Text>
        </Paragraph>
        <Paragraph>不如继续 搬砖。</Paragraph>
      </Card>
    </div>
  );
}
