import { FC, useState } from 'react';
import CmsCurd, { formLayout, IFields, IStatus } from '@/components/CmsCurd';
import { cmsList, cmsMenuTree, cmsResetPassword } from '@/services/cms';
import { useRequest } from 'umi';
import { Checkbox, Form, Input, Space, Button, InputNumber } from 'antd';
import FixRow from '@/components/FixRow';

const User: FC = (props: any) => {
  const [roleData, setRoleData] = useState([]);
  const [roleCheckedDisable, setRoleCheckedDisable] = useState<boolean>(false);
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

  const [groupData, setGroupData] = useState([]);
  const [groupCheckedDisable, setGroupCheckedDisable] =
    useState<boolean>(false);
  const [checkedGroupKeys, setCheckedGroupKeys] = useState<React.Key[]>([]);
  const groupDataRequest = useRequest(() => cmsList('group', {}), {
    onSuccess: (data) => {
      const groupData = data.map((item: any) => {
        return { label: item.name, value: item.id };
      });
      setGroupData(groupData);
    },
  });
  function onGroupChecked(checkedValues: any) {
    setCheckedGroupKeys(checkedValues);
  }
  const groupCheckedClear = () => {
    setCheckedGroupKeys([]);
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
      name: '编号',
      code: 'userNo',
      type: 'string',
      style: {
        add: { display: false },
        edit: { disable: true },
      },
    },
    {
      name: '用户名',
      code: 'username',
      type: 'string',
      rules: [{ required: true }],
    },
    {
      name: '昵称',
      code: 'nickname',
      type: 'string',
    },
    {
      name: '初始密码',
      code: 'password',
      type: 'password',
      rules: [{ required: true }],
      style: {
        search: { display: false },
        edit: { display: false },
        view: { display: false },
        table: { display: false },
      },
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
      type: 'checkgroup',
      style: {
        search: { display: false },
        table: { display: false },
      },
      node: (
        <Checkbox.Group
          disabled={roleCheckedDisable}
          options={roleData}
          onChange={onRoleChecked}
        />
      ),
    },
    {
      name: '用户分组',
      code: 'groupIds',
      type: 'checkgroup',
      style: {
        search: { display: false },
        table: { display: false },
      },
      node: (
        <Checkbox.Group
          disabled={groupCheckedDisable}
          options={groupData}
          onChange={onGroupChecked}
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

  //重置密码
  const [entity, setEntity] = useState<any>({});
  const [extendOptionStatus, setExtendOptionStatus] = useState<string>();

  const restPasswordRequest = useRequest((params) => cmsResetPassword(params), {
    manual: true,
    onSuccess: (data) => {
      setExtendOptionStatus(undefined);
    },
  });

  const openResetPassword = (values?: any) => {
    setExtendOptionStatus('restPassword');
    setEntity({ id: values.id });
  };
  const finishResetPassword = (values?: any) => {
    console.log('finishResetPassword', values);
    restPasswordRequest.run(values);
  };

  const restPasswordNode = (
    <Form
      name="restPassword"
      initialValues={entity}
      {...formLayout}
      onFinish={finishResetPassword}
      autoComplete="off"
    >
      <Form.Item label="主键" name="id" key="id" hidden>
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="新密码"
        name="password"
        key="password"
        rules={[{ required: true }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="rePassword"
        key="rePassword"
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <div className="cms-add-options">
          <FixRow>
            <Space>
              <Button key="1" type="primary" htmlType="submit" shape="round">
                重置密码
              </Button>
            </Space>
          </FixRow>
        </div>
      </Form.Item>
    </Form>
  );

  const extendOptionPage =
    extendOptionStatus == 'restPassword'
      ? { key: 'restPassword', name: '重置密码', node: restPasswordNode }
      : undefined;

  return (
    <div>
      <CmsCurd
        model="user"
        name="用户"
        fields={fields}
        extendData={[
          {
            key: 'roleIds',
            data: checkedRoleKeys,
            setDisable: setRoleCheckedDisable,
            setData: setCheckedRoleKeys,
            clear: roleCheckedClear,
          },
          {
            key: 'groupIds',
            data: checkedGroupKeys,
            setDisable: setGroupCheckedDisable,
            setData: setCheckedGroupKeys,
            clear: groupCheckedClear,
          },
        ]}
        extendOption={[
          {
            key: 'resetPassword',
            name: '重置密码',
            requireAuth: 'edit',
            onClick: openResetPassword,
          },
        ]}
        extendOptionPage={extendOptionPage}
      />
    </div>
  );
};
// @ts-ignore
User.title = '用户页面';
// @ts-ignore
User.code = 'user';
export default User;
