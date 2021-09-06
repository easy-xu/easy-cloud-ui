import { IRouteComponentProps } from 'umi'
import { Link } from 'umi';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';


import './index.less';

const { Header, Content, Footer } = Layout;

export default function BaseLayout({ children, location, route, history, match }: IRouteComponentProps) {
    return <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu mode="horizontal" defaultSelectedKeys={['geme1']}>
                <Menu.Item key='game1'><Link to="/game1">小游戏1</Link></Menu.Item>
                <Menu.Item key='game2'><Link to="/game2">小游戏2</Link></Menu.Item>
                <Menu.Item key='user'>
                    <Link to="/user">
                        xuhonglin <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} icon={<UserOutlined />} />
                    </Link>
                </Menu.Item>
            </Menu>

        </Header>
        <Content>
            <div className="layout-content">{children}</div>
        </Content>
        <Footer>Simple Game ©2021 Created by Xu</Footer>
    </Layout>
}