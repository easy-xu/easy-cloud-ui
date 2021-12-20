import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import AuthEntityPage from '@/components/AuthEntityPage';
import { useRequest } from 'umi';
import { baseList, baseTree } from '@/services/base';
import { toTreeData, toListData } from '@/utils/baseUtil';

const SysCodeMap: FC = (props: any) => {
  const fields: IFields = [
    {
      name: '字典名称',
      code: 'codeName',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 100 }],
    },
    {
      name: '字典取值',
      code: 'codeValue',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 100 }],
    },
    {
      name: '字典分类',
      code: 'codeType',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 30 }],
    },
    {
      name: '显示顺序',
      code: 'orderNum',
      type: 'number',
      initial: 0,
      style: { search: { display: false } },
    },
    {
      name: '备注',
      code: 'remark',
      type: 'textarea',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 500 }],
    },
  ];

  return (
    <AuthEntityPage
      model="sys"
      entity="codemap"
      pageTitle="字典页面"
      fields={fields}
      option={['add', 'edit', 'delete']}
    />
  );
};
// @ts-ignore
SysCodeMap.title = '字典页面';
export default SysCodeMap;
