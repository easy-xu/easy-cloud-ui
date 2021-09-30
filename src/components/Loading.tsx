import { Space, Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import '../pages/index.less';

const Loading: React.FC<{ children?: any }> = ({ children }) => {
  return (
    <div className="div-loading">
      <Spin
        size="large"
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      />
    </div>
  );
};

export default Loading;
