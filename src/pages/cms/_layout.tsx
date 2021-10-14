import React, { FC, useEffect, useState } from 'react';
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
  const { user } = useModel('user', (model) => ({
    user: model.user,
  }));

  let notFound = true;
  let notAuth = false;
  //判断是否存在
  route.routes?.forEach((item) => {
    if (notFound && item.path == location.pathname) {
      notFound = false;
    }
  });

  const [menuTree, setMenuTree] = useState([]);

  const menuTreeRequest = useRequest(
    () => cmsMenuTree({ userNo: user.userNo }),
    {
      manual: true,
      onSuccess: (data) => {
        setMenuTree(data);
        notAuth = true;
      },
    },
  );

  useEffect(() => {
    menuTreeRequest.run();
  }, []);

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
      //判断是否分配菜单
      if (
        (notAuth && location.pathname == path) ||
        location.pathname == '/cms'
      ) {
        notAuth = false;
      }
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

  if (!user.isLogin) {
    return <Redirect to="/user/login"></Redirect>;
  }

  if (notFound) {
    return <Redirect to="/404"></Redirect>;
  }
  if (notAuth) {
    return <Redirect to="/403"></Redirect>;
  }

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
        <div className="cms-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};
export default CmsLayout;
