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
  Popover,
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
  const [menuNodes, setMenuNodes] = useState<any[]>([]);

  function clearCache() {
    sessionStorage.clear();
    localStorage.clear();
  }

  function logoutClick() {
    logout();
    history.push('/user/login');
  }

  if (!user) {
    return <Loading />;
  }

  useEffect(() => {
    enquireScreen((b: any) => {
      setIsMobile(!!b);
    });
  }, []);

  useEffect(() => {
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
        <Menu.Item key="avatar">
          <Popover
            placement="bottom"
            color="#001529"
            content={
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
            trigger="hover"
          >
            <Avatar
              style={{
                backgroundColor: '#7265e6',
                verticalAlign: 'middle',
              }}
            >
              {user.nickname}
            </Avatar>
          </Popover>
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
    setMenuNodes(menuNodes);
  }, [user?.isLogin, isMobile]);

  Nav00DataSource.Menu.children = menuNodes;

  const openKey = location.pathname.split('/')[1];
  return (
    <ConfigProvider locale={zhCN}>
      <Header
        dataSource={Nav00DataSource}
        isMobile={isMobile}
        refresh={menuNodes}
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
