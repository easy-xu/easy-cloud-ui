import { FC, useState } from 'react';
import CmsCurd, { IFields } from '@/components/CmsCurd';
import { cmsList, cmsMenuTree } from '@/services/cms';
import { useRequest } from 'umi';
import { Checkbox } from 'antd';

const User: FC = (props: any) => {
  const [roleData, setRoleData] = useState([]);
  const [checkedRoleKeys, setCheckedRoleKeys] = useState<React.Key[]>([]);

  const roleDataRequest = useRequest(() => cmsList('role', {}), {
    onSuccess: (data) => {
      const roleData = data.map((item: any) => {
        return { label: item.name, value: item.id };
      });
      setRoleData(roleData);
    },
  });

  function onRoleChecked(checkedValues: any) {
    setCheckedRoleKeys(checkedValues);
  }

  const roleCheckedClear = () => {
    setCheckedRoleKeys([]);
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
      name: '用户名',
      code: 'username',
      type: 'string',
    },
    {
      name: '昵称',
      code: 'nickname',
      type: 'string',
    },
    {
      name: '邮箱',
      code: 'email',
      type: 'string',
      style: {
        search: { display: false },
        table: { display: false },
      },
    },
    {
      name: '手机号',
      code: 'phoneNumber',
      type: 'string',
      style: {
        search: { display: false },
        table: { display: false },
      },
    },
    {
      name: '用户角色',
      code: 'roleIds',
      type: 'tree',
      style: {
        search: { display: false },
        table: { display: false },
      },
      node: <Checkbox.Group options={roleData} onChange={onRoleChecked} />,
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

  console.log(checkedRoleKeys);

  return (
    <CmsCurd
      model="user"
      name="用户"
      fields={fields}
      extendData={[
        {
          key: 'roleIds',
          data: checkedRoleKeys,
          setData: setCheckedRoleKeys,
          clear: roleCheckedClear,
        },
      ]}
    />
  );
};

export default User;
