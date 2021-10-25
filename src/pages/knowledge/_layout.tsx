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
import { Layout, Menu, Anchor, Button, Spin, Row, Col } from 'antd';
const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
import './index.less';

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

  const topMenu = isMobile ? menuNode : '';

  return (
    <Layout className="layout">
      <Sider
        className="kl-sider"
        width={200}
        collapsible
        breakpoint="md"
        trigger={null}
        collapsedWidth="0"
      >
        <Anchor>{menuNode}</Anchor>
      </Sider>

      <Content>
        {topMenu}
        <div className="kl-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

export default KnowlageLayout;
