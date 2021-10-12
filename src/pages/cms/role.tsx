import { FC, useState } from 'react';
import CmsCurd, { IFields } from '@/components/CmsCurd';
import { cmsList } from '@/services/cms';
import { useRequest } from 'umi';

const Role: FC = (props: any) => {
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
      name: '角色名称',
      code: 'name',
      type: 'string',
    },
    {
      name: '角色字符',
      code: 'code',
      type: 'string',
      style: {
        search: { display: false },
      },
    },
    {
      name: '状态',
      code: 'status',
      type: 'select',
      select: [
        { code: '0', name: '启用', color: 'green' },
        { code: '1', name: '停用', color: 'red' },
      ],
    },
  ];

  return <CmsCurd model="role" name="角色" fields={fields} />;
};

export default Role;
