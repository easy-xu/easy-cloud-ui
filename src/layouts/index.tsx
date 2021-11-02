import React, { FC, useEffect, useState } from 'react';
import { IRouteComponentProps, Link, useModel, history, Redirect } from 'umi';
import {
  Layout,
  Menu,
  Avatar,
  Button,
  Dropdown,
  BackTop,
  ConfigProvider,
  Row,
  Col,
  Image,
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
import Footer from '../Home/Footer1';
//@ts-ignore
import { Nav00DataSource } from '../Home/data.source';
import '../Home/less/antMotionStyle.less';

import { Card, Typography } from 'antd';
import Header from '@/components/Header';
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
  const { user, logout } = useModel('user', (model) => ({
    user: model.user,
    logout: model.logout,
  }));

  const { isMobile, setIsMobile } = useModel('system', (model) => ({
    isMobile: model.isMobile,
    setIsMobile: model.setIsMobile,
  }));

  function clearCache() {
    sessionStorage.clear();
    localStorage.clear();
  }

  function logoutClick() {
    logout();
    history.push('/user/login');
  }

  useEffect(() => {
    console.log('useEffect');
    enquireScreen((b: boolean) => {
      console.log('bbb2', !!b);
      setIsMobile(!!b);
    });
  }, []);

  console.log(isMobile);

  if (!user) {
    return <Loading />;
  }

  let menuNodes = [
    <Menu.Item key="index">
      <Link to="/">首页</Link>
    </Menu.Item>,
    <Menu.Item key="questionnaire">
      <Link to="/questionnaire/list">测一测</Link>
    </Menu.Item>,
    <Menu.Item key="knowledge">
      <Link to="/knowledge">知识图谱</Link>
    </Menu.Item>,
    <Menu.Item key="wx">
      <Dropdown
        placement="bottomCenter"
        overlay={
          <div>
            <Image
              width="172px"
              src="https://simple-cloud-1256275568.cos.ap-shanghai.myqcloud.com/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg"
            ></Image>
          </div>
        }
      >
        <div>公众号</div>
      </Dropdown>
    </Menu.Item>,
  ];
  if (user.isLogin) {
    menuNodes = [
      ...menuNodes,
      <Menu.Item key="cms">
        <Link to="/cms">控制台</Link>
      </Menu.Item>,

      <Menu.Item key="avatar">
        <Dropdown
          placement="bottomCenter"
          overlay={
            <div>
              <Menu theme="dark">
                <Menu.Item key="setting:1">
                  <Link to="/user/info">账号信息</Link>
                </Menu.Item>
                <Menu.Item key="logout" onClick={logoutClick}>
                  退出
                </Menu.Item>
              </Menu>
            </div>
          }
        >
          <div style={{ height: '100%' }}>
            <Avatar
              style={{
                backgroundColor: '#7265e6',
                verticalAlign: 'middle',
              }}
            >
              {user.nickname?.substring(0, 1)}
            </Avatar>
          </div>
        </Dropdown>
      </Menu.Item>,
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

  Nav00DataSource.Menu.children = menuNodes;
  const selectKey = location.pathname.split('/')[1];

  //刷新条件
  const refresh = isMobile
    ? [selectKey, user?.isLogin, isMobile]
    : ['', user?.isLogin, isMobile];

  return (
    <ConfigProvider locale={zhCN}>
      <Header
        dataSource={Nav00DataSource}
        isMobile={isMobile}
        refresh={refresh}
        menuSelectKey={selectKey}
      />
      <Layout className="layout">
        <Content>
          <div className="layout-content">{children}</div>
        </Content>
        <Button onClick={clearCache}>清除缓存</Button>
      </Layout>
      <BackTop />
    </ConfigProvider>
  );
};

export default BaseLayout;
