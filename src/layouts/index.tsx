import React, { FC } from 'react';
import { IRouteComponentProps, Link, useModel, history, Redirect } from 'umi';
import {
  Layout,
  Menu,
  Avatar,
  Button,
  Anchor,
  BackTop,
  ConfigProvider,
} from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import './index.less';
import Loading from '@/components/Loading';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

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

  let menuNodes = [
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
        title={user.username}
        icon={
          <Avatar
            style={{
              backgroundColor: '#7265e6',
              verticalAlign: 'middle',
            }}
            icon={<UserOutlined />}
          />
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
          <LoginOutlined /> 登录
        </Link>
      </Menu.Item>,
    ];
  }

  const openKey = location.pathname.split('/')[1];
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu mode="horizontal" defaultSelectedKeys={[openKey]}>
            {menuNodes}
          </Menu>
        </Header>
        <Content>
          <div className="layout-content">{children}</div>
        </Content>
        <Footer>
          Simple ©2021 Created by 为了呆毛
          <br /> <Button onClick={clearCache}>清除缓存</Button>
        </Footer>
      </Layout>
      <BackTop />
    </ConfigProvider>
  );
};

export default BaseLayout;
