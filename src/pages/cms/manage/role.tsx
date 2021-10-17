import { FC, useState } from 'react';
import CmsCurd, { IFields } from '@/components/CmsCurd';
import { cmsList, cmsMenuTree } from '@/services/cms';
import { useRequest } from 'umi';
import { Tree, Checkbox } from 'antd';

const Role: FC = (props: any) => {
  const [authData, setAuthData] = useState([]);
  const [authCheckedDisable, setAuthCheckedDisable] = useState<boolean>(false);
  const [checkedAuthKeys, setCheckedAuthKeys] = useState<React.Key[]>([]);
  const authDataRequest = useRequest(() => cmsList('auth', {}), {
    onSuccess: (data) => {
      const authData = data.map((item: any) => {
        return { label: item.name, value: item.id };
      });
      setAuthData(authData);
    },
  });

  function onAuthChecked(checkedValues: any) {
    setCheckedAuthKeys(checkedValues);
  }

  const authCheckedClear = () => {
    setCheckedAuthKeys([]);
  };

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
      rules: [{ required: true }],
    },
    {
      name: '角色字符',
      code: 'code',
      type: 'string',
      rules: [{ required: true }],
      style: {
        search: { display: false },
      },
    },
    {
      name: '权限操作',
      code: 'authIds',
      type: 'tree',
      style: {
        search: { display: false },
        table: { display: false },
      },
      node: (
        <Checkbox.Group
          disabled={authCheckedDisable}
          options={authData}
          onChange={onAuthChecked}
        />
      ),
    },
    {
      name: '状态',
      code: 'deleted',
      type: 'select',
      select: [
        { code: '0', name: '启用', color: 'green' },
        { code: '1', name: '停用', color: 'red' },
      ],
    },
  ];

  return (
    <CmsCurd
      model="role"
      name="角色"
      fields={fields}
      extendData={[
        {
          key: 'authIds',
          data: checkedAuthKeys,
          setDisable: setAuthCheckedDisable,
          setData: setCheckedAuthKeys,
          clear: authCheckedClear,
        },
      ]}
    />
  );
};
// @ts-ignore
Role.title = '角色页面';
// @ts-ignore
Role.code = 'role';
export default Role;
