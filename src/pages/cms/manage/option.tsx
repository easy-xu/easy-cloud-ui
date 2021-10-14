import { FC, useState } from 'react';
import CmsCurd, { IFields } from '@/components/CmsCurd';
import { cmsList } from '@/services/cms';
import { useRequest } from 'umi';
import {
  DashboardOutlined,
  BankOutlined,
  BellOutlined,
  AuditOutlined,
  CalendarOutlined,
  ContactsOutlined,
  DatabaseOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const Option: FC = (props: any) => {
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
      name: '操作名称',
      code: 'name',
      type: 'string',
    },
    {
      name: '操作字符',
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

  return <CmsCurd model="option" name="操作" fields={fields} />;
};
// @ts-ignore
Option.title = '操作页面';
// @ts-ignore
Option.code = 'option';
export default Option;
