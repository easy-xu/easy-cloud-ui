import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import AuthEntityPage from '@/components/AuthEntityPage';
import { useRequest } from 'umi';
import { baseList, baseTree } from '@/services/base';
import { toTreeData, toListData } from '@/utils/baseUtil';

const CmsGroup: FC = (props: any) => {
  const fields: IFields = [
    {
      name: '分组名称',
      code: 'name',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 30 }],
    },
    {
      name: '分组字符串',
      code: 'code',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 100 }],
    },
    {
      name: '备注',
      code: 'remark',
      type: 'textarea',
      style: { search: { display: false }, table: { display: false } },
      rules: [{ type: 'string', max: 500 }],
    },
  ];

  return (
    <AuthEntityPage
      model="cms"
      entity="group"
      pageTitle="分组页面"
      fields={fields}
      option={['add', 'edit', 'delete']}
    />
  );
};
// @ts-ignore
CmsGroup.title = '分组页面';
export default CmsGroup;
