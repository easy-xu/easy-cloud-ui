import React, { FC } from 'react';
import { IRouteComponentProps, Link, useModel, history, Redirect } from 'umi';
import { Layout, Menu, Avatar, Button, Spin, Row, Col } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
import './index.less';

const CmsLayout: FC<IRouteComponentProps> = ({
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
      <Sider className="site-layout-background" width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="系统管理">
            <Menu.Item key="1">
              <Link to="/cms/menu">菜单管理</Link>
            </Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Content>
        {user ? (
          <div className="cms-layout-content">{children}</div>
        ) : (
          <div className="layout-spin">
            <Spin size="large" />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default CmsLayout;
