import React, { FC } from 'react';
import { Form, Input, Button, Checkbox, Card, PageHeader } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRequest, history, useModel } from 'umi';
import { loginRequest } from '@/services/cms';

import './login.less';

const UserLogin: FC = () => {
  const { login } = useModel('user', (model) => ({ login: model.login }));

  //用户登录
  const { data, error, loading, run } = useRequest(
    (params) => loginRequest(params),
    {
      manual: true,
      onSuccess: (result) => {
        login(result);
        //跳转首页
        history.push('/');
      },
    },
  );

  const onFinish = (values: any) => {
    run(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-div">
      <Card>
        <PageHeader className="site-page-header" title="用户登录" />
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
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/user/lost">
              忘记密码
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登 录
            </Button>
            没有账号？<a href="/user/signin">立即注册</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// @ts-ignore
UserLogin.noLayout = true;
export default UserLogin;
