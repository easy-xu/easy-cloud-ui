import { FC, useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Console: FC = (props: any) => {
  const uploadProps = {
    name: 'file',
    action: '/api/file/upload',
    accept: '.xls,.xlsx',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>上传测试题</Button>
      </Upload>
    </div>
  );
};

export default Console;
