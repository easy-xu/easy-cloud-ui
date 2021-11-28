/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React, { FC } from 'react';

//@ts-ignore
import Nav3 from './Home/Nav3';
//@ts-ignore
import { Nav30DataSource } from './Home/data.source';
import './Home/less/antMotionStyle.less';
import { Menu, Divider, Row, Col } from 'antd';
import { Link, useModel } from 'umi';
const { Item, SubMenu } = Menu;

const CustHeader: React.FC<{ children?: any }> = ({ children }) => {
  const { user, logout } = useModel('user', (model) => ({
    user: model.user,
    logout: model.logout,
  }));

  if (!user.isLogin) {
    return <Link to="/user/login"></Link>;
  }

  const dataSource = Nav30DataSource;

  return (
    <div className="div-cust-header">
      <Row>
        <Col span={8}>
          <Link to="/">
            <img src={dataSource.logo.children} height="36px" alt="logo" />
          </Link>
        </Col>
        <Col span={8} offset={8}>
          <div>
            <Menu mode="horizontal">
              <SubMenu key="sub1" title={user.username}>
                <Menu.Item key="1">
                  <Link to="/user/info">个人信息</Link>
                </Menu.Item>
                <Menu.Item key="2" onClick={logout}>
                  退出
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustHeader;
