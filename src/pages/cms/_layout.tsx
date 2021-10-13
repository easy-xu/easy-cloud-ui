import React, { FC, useState } from 'react';
import {
  IRouteComponentProps,
  Link,
  useModel,
  history,
  Redirect,
  useRequest,
} from 'umi';
import { Layout, Menu, Anchor, Button, Spin, Row, Col } from 'antd';
import * as Icon from '@ant-design/icons';

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
import './index.less';
import { cmsMenuTree } from '@/services/cms';
import Loading from '@/components/Loading';

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

  const [menuTree, setMenuTree] = useState([]);

  const menuTreeRequest = useRequest(
    () => cmsMenuTree({ userNo: user.userNo }),
    {
      onSuccess: (data) => {
        setMenuTree(data);
      },
    },
  );

  const getIcon = (iconType: string) => {
    return (
      <div>
        {React.createElement(Icon[iconType], {
          style: { fontSize: '16px', color: '#1890ff' },
        })}
      </div>
    );
  };

  const getNodes = (menus: any, parentPath: string) => {
    return menus?.map((menu: any) => {
      const path = parentPath + '/' + menu.path;
      if (menu.type == 'F') {
        return (
          <SubMenu
            key={path}
            icon={menu.icon ? getIcon(menu.icon) : ''}
            title={menu.name}
          >
            {getNodes(menu.children, path)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={path}>
            <Link to={path}>{menu.name}</Link>
          </Menu.Item>
        );
      }
    });
  };

  const menuTreeNode = getNodes(menuTree, '');

  const selectKey = location.pathname;
  const openKey = selectKey.substring(0, selectKey.lastIndexOf('/'));

  return (
    <Layout className="layout">
      <Sider className="cms-sider" width={200}>
        <Anchor>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            defaultSelectedKeys={[selectKey]}
            defaultOpenKeys={[openKey]}
          >
            {menuTreeNode}
          </Menu>
        </Anchor>
      </Sider>

      <Content>
        {user ? (
          <div className="cms-layout-content">{children}</div>
        ) : (
          <Loading />
        )}
      </Content>
    </Layout>
  );
};

export default CmsLayout;
