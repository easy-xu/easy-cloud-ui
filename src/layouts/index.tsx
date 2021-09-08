import React, { FC } from 'react';
import { IRouteComponentProps, Link, useModel, history } from 'umi';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

import './index.less';

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

  console.info('index-user', user);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['geme1']}>
          <Menu.Item key="game1">
            <Link to="/game1">小游戏1</Link>
          </Menu.Item>
          <Menu.Item key="game2">
            <Link to="/game2">小游戏2</Link>
          </Menu.Item>
          {user.isLogin ? (
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
        <div className="layout-content">{children}</div>
      </Content>
      <Footer>Simple Game ©2021 Created by Xu</Footer>
    </Layout>
  );
};

export default BaseLayout;
