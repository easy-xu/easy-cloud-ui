import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import AuthEntityPage from '@/components/AuthEntityPage';
import { useRequest } from 'umi';
import { baseList, baseTree } from '@/services/base';
import { toTreeData, toListData } from '@/utils/baseUtil';

const CmsAuth: FC = (props: any) => {
  const [menuIds, setMenuIds] = useState<any>([]);
  const menuIdsRequest = useRequest(() => baseTree('cms', 'menu', {}), {
    onSuccess: (data) => {
      setMenuIds(toTreeData(data, 'id', 'name', 'children'));
    },
  });
  const [optionIds, setOptionIds] = useState<any>([]);
  const optionIdsRequest = useRequest(() => baseList('cms', 'option', {}), {
    onSuccess: (data) => {
      setOptionIds(toListData(data, 'id', 'name'));
    },
  });

  const fields: IFields = [
    {
      name: '权限名称',
      code: 'name',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 50 }],
    },
    {
      name: '权限字符串',
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
    {
      name: '权限菜单',
      code: 'menuIds',
      type: 'tree',
      tree: menuIds,
      style: { search: { display: false }, table: { display: false } },
    },
    {
      name: '权限操作',
      code: 'optionIds',
      type: 'checks',
      checks: optionIds,
      style: { search: { display: false }, table: { display: false } },
    },
  ];

  return (
    <AuthEntityPage
      model="cms"
      entity="auth"
      pageTitle="权限页面"
      fields={fields}
      option={['add', 'edit', 'delete']}
    />
  );
};
// @ts-ignore
CmsAuth.title = '权限页面';
export default CmsAuth;
