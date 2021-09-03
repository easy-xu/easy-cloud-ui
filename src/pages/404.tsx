import { Result, Button, } from 'antd';
import { Link } from 'umi';

const NotFound = () => {

    return (
        <Result
            title="资源不见了"
            extra={
                <Button type="primary" key="console">
                    <Link to="/">返回首页</Link>
                </Button>
            }
        />
    );
};

export default NotFound;