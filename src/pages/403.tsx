import { Result, Button } from 'antd';
import { Link } from 'umi';

const Forbidden = () => {
  return (
    <Result
      status="warning"
      title="对不起，您没有权限访问此页面。"
      extra={[
        <Button key="index">
          <Link to="/">返回首页</Link>
        </Button>,
        <Button type="primary" key="login">
          <Link to="/user/login">立即登录</Link>
        </Button>,
      ]}
    />
  );
};

export default Forbidden;
