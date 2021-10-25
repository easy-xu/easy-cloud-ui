import { Card, Typography } from 'antd';
import { FC } from 'react';
const { Title, Paragraph, Text, Link } = Typography;
//@ts-ignore
import Home from '../Home';
const IndexPage: FC = () => {
  return <Home />;
};
//@ts-ignore
IndexPage.title = '首页';
export default IndexPage;
