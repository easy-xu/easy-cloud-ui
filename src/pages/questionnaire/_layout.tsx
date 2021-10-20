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
import FixRow from '@/components/FixRow';

const PageLayout: FC<IRouteComponentProps> = ({
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

  return <FixRow>{children}</FixRow>;
};

export default PageLayout;
