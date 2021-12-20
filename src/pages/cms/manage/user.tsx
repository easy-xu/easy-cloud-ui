import { FC, useState } from 'react';
import CurdPage, { formLayout, IFields } from '@/components/CurdPage';
import AuthEntityPage from '@/components/AuthEntityPage';
import { useRequest } from 'umi';
import { baseList, baseTree } from '@/services/base';
import { toTreeData, toListData } from '@/utils/baseUtil';
import { cmsResetPassword } from '@/services/cms';
import { Checkbox, Form, Input, Space, Button, InputNumber } from 'antd';
import FixRow from '@/components/FixRow';

const CmsUser: FC = (props: any) => {
  const [roleIds, setRoleIds] = useState<any>([]);
  const roleIdsRequest = useRequest(() => baseList('cms', 'role', {}), {
    onSuccess: (data) => {
      setRoleIds(toListData(data, 'id', 'name'));
    },
  });
  const [groupIds, setGroupIds] = useState<any>([]);
  const groupIdsRequest = useRequest(() => baseList('cms', 'group', {}), {
    onSuccess: (data) => {
      setGroupIds(toListData(data, 'id', 'name'));
    },
  });

  const fields: IFields = [
    {
      name: '用户名',
      code: 'username',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 60 }],
    },
    {
      name: '用户编号',
      code: 'userNo',
      type: 'string',
      style: {
        add: { display: false },
        edit: { disable: true },
      },
    },
    {
      name: '设备编号',
      code: 'deviceNo',
      type: 'string',
      style: {
        add: { display: false },
        edit: { disable: true },
      },
    },

    {
      name: '用户昵称',
      code: 'nickname',
      type: 'string',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 30 }],
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
      name: '用户邮箱',
      code: 'email',
      type: 'string',
      style: { search: { display: false }, table: { display: false } },
      rules: [
        { type: 'string', max: 50 },
        {
          pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
          message: '用户邮箱格式不正确',
        },
      ],
    },
    {
      name: '手机号码',
      code: 'phone',
      type: 'string',
      style: { search: { display: false }, table: { display: false } },
      rules: [
        {
          pattern: '^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\\d{8}$',
          message: '手机号码格式不正确',
        },
      ],
    },
    {
      name: '用户性别',
      code: 'sex',
      type: 'select',
      initial: 'N',
      select: [
        { code: 'F', name: '女' },
        { code: 'M', name: '男' },
        { code: 'N', name: '未知' },
      ],
      style: { search: { display: false } },
    },
    {
      name: '头像地址',
      code: 'avatar',
      type: 'string',
      style: { search: { display: false }, table: { display: false } },
      rules: [{ type: 'string', max: 100 }],
    },
    {
      name: '角色',
      code: 'roleIds',
      type: 'checks',
      checks: roleIds,
      style: { search: { display: false }, table: { display: false } },
    },
    {
      name: '分组',
      code: 'groupIds',
      type: 'select',
      select: groupIds,
      style: { search: { display: false }, table: { display: false } },
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
        name="re-password"
        key="re-password"
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
    <AuthEntityPage
      model="cms"
      entity="user"
      pageTitle="用户页面"
      fields={fields}
      option={['add', 'edit', 'delete']}
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
  );
};
// @ts-ignore
CmsUser.title = '用户页面';
export default CmsUser;
