import { Form, Input, Button, Checkbox, Card, PageHeader } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'

function UserLogin() {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-div">
            <Card >
                <PageHeader className="site-page-header" title="用户注册" />
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密 码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="re-password"
                        rules={[
                            { required: true, message: '密码不能为空' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="确认密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注 册
                        </Button>
                        已有账号？<a href="/user/login">立即登录</a>
                    </Form.Item>

                </Form>
            </Card>
        </div >
    );
}

export default UserLogin
