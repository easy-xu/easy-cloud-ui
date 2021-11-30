import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';

const SysOptionLog: FC = (props: any) => {
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
      name: '用户编号',
      code: 'userNo',
      type: 'string',
      style: {
        search: { display: false },
        table: { display: true },
        add: { display: true },
        edit: { display: true },
      },
      rules: [{ required: false }],
    },
    {
      name: '设备编号',
      code: 'deviceNo',
      type: 'string',
      style: {
        search: { display: false },
        table: { display: true },
        add: { display: true },
        edit: { display: true },
      },
      rules: [{ required: false }],
    },
    {
      name: '操作名称',
      code: 'optionName',
      type: 'string',
      style: {
        search: { display: false },
        table: { display: true },
        add: { display: true },
        edit: { display: true },
      },
      rules: [{ required: false }],
    },
  ];

  return (
    <CurdPage
      model="sys"
      entity="optionlog"
      pageTitle="操作记录页面"
      fields={fields}
    />
  );
};
// @ts-ignore
Option.title = '操作记录页面';
export default SysOptionLog;
