import React, { FC, useEffect, useState } from 'react';
import { IRouteComponentProps, Link, useModel, history, Redirect } from 'umi';
import {
  Layout,
  Menu,
  Avatar,
  Button,
  Anchor,
  BackTop,
  ConfigProvider,
  Row,
  Col,
} from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import './index.less';
import Loading from '@/components/Loading';

//@ts-ignore
import { enquireScreen } from 'enquire-js';
//@ts-ignore
import Nav from '../Home/Nav0';
//@ts-ignore
import Footer from '../Home/Footer1';
//@ts-ignore
import { Footer10DataSource, Nav00DataSource } from '../Home/data.source';
import '../Home/less/antMotionStyle.less';

import { Card, Typography } from 'antd';
import Header from '@/components/Header';
const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { SubMenu } = Menu;

let isMobile;
enquireScreen((b: boolean) => {
  isMobile = b;
});

const BaseLayout: FC<IRouteComponentProps> = ({
  children,
  location,
  route,
  history,
  match,
}) => {
  const { user, logout } = useModel('user', (model) => ({
    user: model.user,
    logout: model.logout,
  }));

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const openPath = ['/user/login', '/user/signin', '/403', '/404'];

  if (openPath.indexOf(location.pathname) == -1 && user == undefined) {
    //return <Redirect to='/403' />
  }

  function clearCache() {
    sessionStorage.clear();
    localStorage.clear();
  }

  if (!user) {
    return <Loading />;
  }

  console.log('isMobile', isMobile);

  let menuNodes = [
    <Menu.Item key="index">
      <Link to="/">首页</Link>
    </Menu.Item>,
    <Menu.Item key="questionnaire">
      <Link to="/questionnaire/list">测一测</Link>
    </Menu.Item>,
  ];
  if (user.isLogin) {
    menuNodes = [
      ...menuNodes,
      <Menu.Item key="cms">
        <Link to="/cms">控制台</Link>
      </Menu.Item>,
      <SubMenu
        key="SubMenu"
        icon={
          <Avatar
            style={{
              backgroundColor: '#7265e6',
              verticalAlign: 'middle',
            }}
          >
            {user.username}
          </Avatar>
        }
      >
        <Menu.Item key="setting:1">
          <Link to="/user">账号信息</Link>
        </Menu.Item>
        <Menu.Item key="logout" onClick={logout}>
          退出
        </Menu.Item>
      </SubMenu>,
    ];
  } else {
    menuNodes = [
      ...menuNodes,
      <Menu.Item key="login">
        <Link to="/user/login">
          <LoginOutlined />
          登录
        </Link>
      </Menu.Item>,
    ];
  }

  useEffect(() => {
    enquireScreen((b: any) => {
      setIsMobile(!!b);
    });
  }, []);

  Nav00DataSource.Menu.children = menuNodes;

  const openKey = location.pathname.split('/')[1];
  return (
    <ConfigProvider locale={zhCN}>
      <Header
        dataSource={Nav00DataSource}
        isMobile={isMobile}
        refresh={menuNodes.length}
      />
      <Layout className="layout">
        <Content>
          <div className="layout-content">{children}</div>
        </Content>
        <Footer
          id="Footer1_0"
          key="Footer1_0"
          dataSource={Footer10DataSource}
          isMobile={isMobile}
        />
        <Button onClick={clearCache}>清除缓存</Button>
      </Layout>
      <BackTop />
    </ConfigProvider>
  );
};

export default BaseLayout;
