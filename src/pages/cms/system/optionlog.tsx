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
    },
    {
      name: '设备编号',
      code: 'deviceNo',
      type: 'string',
    },
    {
      name: '操作名称',
      code: 'optionName',
      type: 'string',
      style: {
        search: { display: false },
      },
    },
  ];

  return (
    <CurdPage
      model="sys"
      entity="optionlog"
      pageTitle="操作记录页面"
      fields={fields}
      isAuthData={false}
      option={[]}
    />
  );
};
// @ts-ignore
Option.title = '操作记录页面';
export default SysOptionLog;
