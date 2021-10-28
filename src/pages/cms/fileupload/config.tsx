import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';

const FileServerConfig: FC = (props: any) => {
  const fields: IFields = [
    {
      name: '主键',
      code: 'id',
      type: 'number',
      style: {
        search: { display: false },
        table: { display: false },
        add: { hidden: true },
        edit: { hidden: true },
      },
    },

    {
      name: '服务器名称',
      code: 'name',
      type: 'string',
      rules: [{ required: true }],
    },

    {
      name: '状态',
      code: 'deleted',
      type: 'select',
      select: [
        { code: '0', name: '启用', color: 'green' },
        { code: '1', name: '停用', color: 'red' },
      ],
    },
  ];

  return (
    <CurdPage
      namespace="file"
      model="config"
      name="文件服务器"
      fields={fields}
    />
  );
};
// @ts-ignore
FileServerConfig.title = '文件服务器页面';
export default FileServerConfig;
