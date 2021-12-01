import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';

const SysApiLog: FC = (props: any) => {
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
      name: '请求流水号',
      code: 'requestId',
      type: 'string',
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
      name: '接口编码',
      code: 'requestCode',
      type: 'string',
      style: {
        search: { display: false },
      },
    },
    {
      name: '接口地址',
      code: 'requestPath',
      type: 'string',
      style: {
        search: { display: false },
      },
    },
    {
      name: '业务编号',
      code: 'businessNo',
      type: 'string',
      style: {
        search: { display: false },
      },
    },
    {
      name: '系统编号',
      code: 'sysCode',
      type: 'string',
      style: {
        search: { display: false },
      },
    },
    {
      name: '接口耗时',
      code: 'usedTime',
      type: 'number',
      style: {
        search: { display: false },
      },
    },
    {
      name: '结果编码',
      code: 'responseCode',
      type: 'number',
      style: {
        search: { display: false },
      },
    },
    {
      name: '结果描述',
      code: 'responseMessage',
      type: 'string',
      style: {
        search: { display: false },
      },
    },
  ];

  return (
    <CurdPage
      model="sys"
      entity="apilog"
      pageTitle="接口日志页面"
      fields={fields}
      isAuthData={false}
      option={[]}
    />
  );
};
// @ts-ignore
Option.title = '接口日志页面';
export default SysApiLog;
