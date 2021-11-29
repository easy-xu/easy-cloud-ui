import { FC, useEffect } from 'react';
import { IRouteComponentProps, Link, useModel, history, Redirect } from 'umi';
import { Layout, Menu, Button, BackTop, ConfigProvider } from 'antd';

import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import './index.less';
import Loading from '@/components/Loading';
//@ts-ignore
import { enquireScreen } from 'enquire-js';
import { Card, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { SubMenu } = Menu;

const BaseLayout: FC<IRouteComponentProps> = ({
  children,
  location,
  route,
  history,
  match,
}) => {
  const { user, initUser } = useModel('user', (model) => ({
    user: model.user,
    initUser: model.init,
  }));

  const { isMobile, setIsMobile } = useModel('system', (model) => ({
    isMobile: model.isMobile,
    setIsMobile: model.setIsMobile,
  }));

  function clearCache() {
    sessionStorage.clear();
    localStorage.clear();
  }

  useEffect(() => {
    enquireScreen((b: boolean) => {
      setIsMobile(!!b);
    });
    //初始化用户信息
    initUser();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="layout">
        <Content>
          <div className="layout-content">{children}</div>
        </Content>
        {user.username == 'admin' ? (
          <Button onClick={clearCache}>清除缓存</Button>
        ) : (
          ''
        )}
      </Layout>
      <BackTop />
    </ConfigProvider>
  );
};

export default BaseLayout;
