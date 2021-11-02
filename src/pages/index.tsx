import { Card, Typography } from 'antd';
import { FC } from 'react';
import { useModel } from 'umi';
const { Title, Paragraph, Text, Link } = Typography;
//@ts-ignore
import Home from '../Home';

const IndexPage: FC = () => {
  const { isMobile } = useModel('system', (model) => ({
    isMobile: model.isMobile,
  }));

  return <Home isMobile={isMobile} />;
};
//@ts-ignore
IndexPage.title = '首页';
export default IndexPage;
