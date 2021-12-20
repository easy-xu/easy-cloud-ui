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

const { Sider, Content, Footer, Header } = Layout;
const { SubMenu } = Menu;
import './index.less';
import Loading from '@/components/Loading';
import CustHeader from '@/components/CustHeader';
import FixRow from '@/components/FixRow';
import { baseTree } from '@/services/base';

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
  //判断是否存在
  route.routes?.forEach((item) => {
    if (notFound && item.path == location.pathname) {
      notFound = false;
    }
  });

  const [menuTree, setMenuTree] = useState([]);
  const [notAuth, setNotAuth] = useState<boolean>(false);
  const [small, setSmall] = useState<boolean>(false);

  const menuTreeRequest = useRequest(
    () => baseTree('cms', 'menu', { userNo: user.userNo }),
    {
      manual: true,
      onSuccess: (data) => {
        setMenuTree(data);
        const paths = getPath(data, '/cms');
        //判断是否分配菜单
        if (
          paths.indexOf(location.pathname) == -1 &&
          location.pathname != '/cms'
        ) {
          setNotAuth(true);
        }
      },
    },
  );

  useEffect(() => {
    menuTreeRequest.run();
  }, []);

  const getPath = (menus: any, parentPath: string) => {
    let paths: any[] = [];
    menus?.map((menu: any) => {
      const path = parentPath + '/' + menu.code;
      if (menu.type == 'F') {
        paths = [...paths, ...getPath(menu.children, path)];
      } else {
        paths.push(path);
      }
    });
    return paths;
  };

  const getIcon = (iconType: string) => {
    return (
      <div>
        {
          //@ts-ignore
          React.createElement(Icon[iconType], {
            style: { fontSize: '16px', color: '#1890ff' },
          })
        }
      </div>
    );
  };
  const getNodes = (menus: any, parentPath: string) => {
    return menus?.map((menu: any) => {
      const path = parentPath + '/' + menu.code;
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
            <Link key={menu.id} to={path}>
              {menu.name}
            </Link>
          </Menu.Item>
        );
      }
    });
  };
  const menuTreeNode = getNodes(menuTree, '/cms');
  const selectKey = location.pathname;
  const openKey = selectKey.substring(0, selectKey.lastIndexOf('/'));

  const menuNode = (
    <Menu
      mode="inline"
      style={small ? {} : { height: '100%' }}
      defaultSelectedKeys={[selectKey]}
      defaultOpenKeys={[openKey]}
    >
      {menuTreeNode}
    </Menu>
  );

  const topMenu = small ? menuNode : '';

  const showTopMenu = function (broken: any) {
    setSmall(broken);
  };

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
      <Header>
        <CustHeader />
      </Header>
      <Layout>
        <Sider
          className="cms-sider"
          width={200}
          collapsible
          breakpoint="md"
          trigger={null}
          onBreakpoint={showTopMenu}
          collapsedWidth="0"
        >
          <Anchor>{menuNode}</Anchor>
        </Sider>

        <Content>
          {topMenu}
          <div className="cms-layout-content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default CmsLayout;
