import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import AuthEntityPage from '@/components/AuthEntityPage';
import { useRequest } from 'umi';
import { baseList, baseTree } from '@/services/base';
import { toTreeData, toListData } from '@/utils/baseUtil';

const CmsRole: FC = (props: any) => {
  const [authIds, setAuthIds] = useState<any>([]);
  const authIdsRequest = useRequest(() => baseList('cms', 'auth', {}), {
    onSuccess: (data) => {
      setAuthIds(toListData(data, 'id', 'name'));
    },
  });

  const fields: IFields = [
    {
      name: '角色名称',
      code: 'name',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 30 }],
    },
    {
      name: '角色字符串',
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
      name: '权限',
      code: 'authIds',
      type: 'checks',
      checks: authIds,
      style: { search: { display: false }, table: { display: false } },
    },
  ];

  return (
    <AuthEntityPage
      model="cms"
      entity="role"
      pageTitle="角色页面"
      fields={fields}
      option={['add', 'edit', 'delete']}
    />
  );
};
// @ts-ignore
CmsRole.title = '角色页面';
export default CmsRole;
