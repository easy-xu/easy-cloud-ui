import { Result, Button } from 'antd';
import { Link } from 'umi';

const NotFound = () => {
  return (
    <Result
      status="warning"
      title="对不起，您访问的页面不存在。"
      extra={
        <Button type="primary" key="index">
          <Link to="/">返回首页</Link>
        </Button>
      }
    />
  );
};

NotFound.title = '未找到';
export default NotFound;
