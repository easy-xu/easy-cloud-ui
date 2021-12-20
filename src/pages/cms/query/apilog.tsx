import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import BaseEntityPage from '@/components/BaseEntityPage';
import { useRequest } from 'umi';
import { baseList, baseTree } from '@/services/base';
import { toTreeData, toListData } from '@/utils/baseUtil';

const SysApiLog: FC = (props: any) => {
  const fields: IFields = [
    {
      name: '请求流水号',
      code: 'requestId',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ type: 'string', max: 60 }],
    },
    {
      name: '用户编号',
      code: 'userNo',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ type: 'string', max: 60 }],
    },
    {
      name: '设备编号',
      code: 'deviceNo',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ type: 'string', max: 60 }],
    },
    {
      name: '接口编码',
      code: 'requestCode',
      type: 'string',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 20 }],
    },
    {
      name: '接口地址',
      code: 'requestPath',
      type: 'string',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 200 }],
    },
    {
      name: '业务编号',
      code: 'businessNo',
      type: 'string',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 20 }],
    },
    {
      name: '系统编号',
      code: 'sysCode',
      type: 'string',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 20 }],
    },
    {
      name: '接口耗时',
      code: 'usedTime',
      type: 'number',
      style: { search: { display: false } },
    },
    {
      name: '结果编码',
      code: 'responseCode',
      type: 'number',
      style: { search: { display: false } },
    },
    {
      name: '结果描述',
      code: 'responseMessage',
      type: 'textarea',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 65535 }],
    },
  ];

  return (
    <BaseEntityPage
      model="sys"
      entity="apilog"
      pageTitle="接口日志页面"
      fields={fields}
      option={[]}
    />
  );
};
// @ts-ignore
SysApiLog.title = '接口日志页面';
export default SysApiLog;
