import { FC, useEffect, useState } from 'react';
import {
  IRouteComponentProps,
  Link,
  Redirect,
  useModel,
  useRequest,
} from 'umi';

import FixRow from '@/components/FixRow';
import { knowledgeNodeTree } from '@/services/knowledge';
import { Layout, Menu, Anchor, Button, Spin, Row, Col, Drawer } from 'antd';
const { Sider, Content, Header, Footer } = Layout;
const { SubMenu } = Menu;
import './index.less';
import CustHeader from '@/components/CustHeader';

const KnowlageLayout: FC<IRouteComponentProps> = ({
  children,
  location,
  route,
  history,
  match,
}) => {
  const { user } = useModel('user', (model) => ({
    user: model.user,
  }));

  const { isMobile } = useModel('system', (model) => ({
    isMobile: model.isMobile,
  }));

  const [nodeTree, setNodeTree] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const nodeTreeRequest = useRequest(() => knowledgeNodeTree({}), {
    manual: true,
    onSuccess: (data) => {
      setNodeTree(data);
    },
  });

  useEffect(() => {
    nodeTreeRequest.run();
  }, []);

  const getNodes = (nodes: any) => {
    return nodes?.map((node: any) => {
      if (node.type == 'N' || node.type == 'NC') {
        return (
          <SubMenu
            key={node.id}
            title={node.name}
            onTitleClick={() => {
              history.push('/knowledge/detail?id=' + node.id);
            }}
          >
            {getNodes(node.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={node.id}>
            <Link key={node.id} to={'/knowledge/detail?id=' + node.id}>
              {node.name}
            </Link>
          </Menu.Item>
        );
      }
    });
  };
  const nodeTreeNode = getNodes(nodeTree);
  const selectKey = location.pathname;
  const openKey = selectKey.substring(0, selectKey.lastIndexOf('/'));

  const menuNode = (
    <Menu
      mode="inline"
      style={isMobile ? {} : { height: '100%' }}
      defaultSelectedKeys={[selectKey]}
      defaultOpenKeys={[openKey]}
    >
      {nodeTreeNode}
    </Menu>
  );

  const topMenu = isMobile ? (
    <div className="kl-top-menu-div">
      <Button
        type="primary"
        onClick={() => {
          setMenuVisible(true);
        }}
      >
        ????????????
      </Button>
      <Drawer
        title="????????????"
        placement="right"
        onClose={() => {
          setMenuVisible(false);
        }}
        visible={menuVisible}
      >
        {menuNode}
      </Drawer>
    </div>
  ) : (
    ''
  );

  const leftMenu = isMobile ? (
    ''
  ) : (
    <Sider className="kl-sider" width={200}>
      <Anchor>{menuNode}</Anchor>
    </Sider>
  );
  return (
    <Layout className="layout">
      <Header>
        <CustHeader />
      </Header>
      <Layout>
        {leftMenu}
        <Content>
          {topMenu}
          <div className="kl-layout-content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default KnowlageLayout;
