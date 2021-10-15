import { FC, useState } from 'react';
import CmsCurd, { IFields } from '@/components/CmsCurd';
import { cmsList, cmsMenuTree } from '@/services/cms';
import { useRequest } from 'umi';
import { Tree, Checkbox } from 'antd';

const Auth: FC = (props: any) => {
  const [menuTreeData, setMenuTreeData] = useState([]);
  const [menutreeDisable, setMenuTreeDisable] = useState<boolean>(false);
  const [checkedMenuKeys, setCheckedMenuKeys] = useState<React.Key[]>([]);
  const menuTreeRequest = useRequest(() => cmsMenuTree({}), {
    onSuccess: (data) => {
      setMenuTreeData(convertToTreeData(data));
    },
  });
  const convertToTreeData = (menus: any) => {
    console.log(menus);
    return menus?.map((menu: any) => {
      let children = convertToTreeData(menu.children);
      return {
        key: menu.id,
        title: menu.name,
        children: children,
      };
    });
  };

  const onMenuTreeCheck = (checkedKeysValue: any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedMenuKeys(checkedKeysValue.checked);
  };
  const menuTreeClear = () => {
    setCheckedMenuKeys([]);
  };

  const [optionData, setOptionData] = useState([]);
  const [optionCheckedDisable, setOptionCheckedDisable] =
    useState<boolean>(false);
  const [checkedOptionKeys, setCheckedOptionKeys] = useState<React.Key[]>([]);
  const optionDataRequest = useRequest(() => cmsList('option', {}), {
    onSuccess: (data) => {
      const optionData = data.map((item: any) => {
        return { label: item.name, value: item.id };
      });
      setOptionData(optionData);
    },
  });

  function onOptionChecked(checkedValues: any) {
    setCheckedOptionKeys(checkedValues);
  }

  const optionCheckedClear = () => {
    setCheckedOptionKeys([]);
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
      name: '权限名称',
      code: 'name',
      type: 'string',
    },
    {
      name: '权限字符',
      code: 'code',
      type: 'string',
      style: {
        search: { display: false },
      },
    },
    {
      name: '权限菜单',
      code: 'menuIds',
      type: 'tree',
      style: {
        search: { display: false },
        table: { display: false },
      },
      node: (
        <Tree
          disabled={menutreeDisable}
          checkable
          checkStrictly
          onCheck={onMenuTreeCheck}
          checkedKeys={checkedMenuKeys}
          treeData={menuTreeData}
        />
      ),
    },
    {
      name: '权限操作',
      code: 'optionIds',
      type: 'tree',
      style: {
        search: { display: false },
        table: { display: false },
      },
      node: (
        <Checkbox.Group
          disabled={optionCheckedDisable}
          options={optionData}
          onChange={onOptionChecked}
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
      model="auth"
      name="权限"
      fields={fields}
      extendData={[
        {
          key: 'menuIds',
          data: checkedMenuKeys,
          setDisable: setMenuTreeDisable,
          setData: setCheckedMenuKeys,
          clear: menuTreeClear,
        },
        {
          key: 'optionIds',
          data: checkedOptionKeys,
          setDisable: setOptionCheckedDisable,
          setData: setCheckedOptionKeys,
          clear: optionCheckedClear,
        },
      ]}
    />
  );
};
// @ts-ignore
Auth.title = '权限页面';
// @ts-ignore
Auth.code = 'auth';
export default Auth;
