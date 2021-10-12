import React, { FC } from 'react';
import { IRouteComponentProps, Link, useModel, history, Redirect } from 'umi';
import { Layout, Menu, Avatar, Button, Spin, Row, Col } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

import './index.less';
import FixRow from '@/components/FixRow';

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

  console.log(location);

  const openPath = ['/user/login', '/user/signin', '/403', '/404'];

  if (openPath.indexOf(location.pathname) == -1 && user == undefined) {
    //return <Redirect to='/403' />
  }

  function clearCache() {
    sessionStorage.clear();
    localStorage.clear();
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['test']}>
          <Menu.Item key="test">
            <Link to="/questionnaire/list">测一测</Link>
          </Menu.Item>
          {user && user.isLogin ? (
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
              {' '}
              <Menu.Item key="cms">
                <Link to="/cms">控制台</Link>
              </Menu.Item>
              <Menu.Item key="setting:1">
                <Link to="/user">账号信息</Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={logout}>
                退出
              </Menu.Item>
            </SubMenu>
          ) : (
            <Menu.Item key="login">
              <Link to="/user/login">
                <LoginOutlined /> 登录
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Content>
        {user ? (
          <div className="layout-content">{children}</div>
        ) : (
          <div className="layout-spin">
            <Spin size="large" />
          </div>
        )}
      </Content>
      <Footer>
        Simple ©2021 Created by 为了呆毛
        <br /> <Button onClick={clearCache}>清除缓存</Button>
      </Footer>
    </Layout>
  );
};

export default BaseLayout;
