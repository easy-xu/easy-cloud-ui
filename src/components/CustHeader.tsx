import React, { FC } from 'react';

import './Home/less/antMotionStyle.less';
import { Menu, Divider, Row, Col } from 'antd';
import { Link, useModel } from 'umi';
import Loading from './Loading';
const { Item, SubMenu } = Menu;

const CustHeader: React.FC<{ children?: any }> = ({ children }) => {
  const { user, logout } = useModel('user', (model) => ({
    user: model.user,
    logout: model.logout,
  }));

  if (!user) {
    return <Loading />;
  }

  const pathname = window.location.pathname;

  const userMenu = user.isLogin ? (
    <SubMenu key="sub1" title={user.username}>
      <Menu.Item key="s1">
        <Link to="/user/info">个人信息</Link>
      </Menu.Item>
      <Menu.Item key="s2" onClick={logout}>
        退出
      </Menu.Item>
    </SubMenu>
  ) : (
    <Menu.Item key="2">
      <Link to={'/user/login?redirect=' + pathname}>登录</Link>
    </Menu.Item>
  );

  return (
    <div className="div-cust-header">
      <Row>
        <Col span={8}>
          <Link to="/">
            <img src="/assets/logo.png" height="36px" alt="logo" />
          </Link>
        </Col>
        <Col span={16}>
          <div>
            <Menu mode="horizontal">
              <Menu.Item key="1">
                <Link to="/">首页</Link>
              </Menu.Item>
              {userMenu}
            </Menu>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustHeader;
