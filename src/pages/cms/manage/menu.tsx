import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import AuthEntityPage from '@/components/AuthEntityPage';
import { useRequest } from 'umi';
import {
  DashboardOutlined,
  BankOutlined,
  BellOutlined,
  AuditOutlined,
  CalendarOutlined,
  ContactsOutlined,
  DatabaseOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { baseList } from '@/services/base';

const CmsMenu: FC = (props: any) => {
  const [parentIds, setParentIds] = useState<any>([]);
  const parentIdsRequest = useRequest(
    () => baseList('cms', 'menu', { type: 'F' }),
    {
      onSuccess: (data) => {
        let parentIds = data.map((item: any) => {
          return { code: item.id, name: item.name };
        });
        parentIds.splice(0, 0, { code: 0, name: '根目录' });
        setParentIds(parentIds);
      },
    },
  );

  const fields: IFields = [
    {
      subPage: 'base',
      name: '菜单名称',
      code: 'name',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 50 }],
    },
    {
      subPage: 'base',
      name: '路径字符',
      code: 'code',
      type: 'string',
      style: { search: { display: false } },
      rules: [{ required: true }, { type: 'string', max: 200 }],
    },
    {
      subPage: 'base',
      name: '父菜单',
      code: 'parentId',
      type: 'select',
      select: parentIds,
      style: { search: { display: true } },
      rules: [{ required: true }],
    },
    {
      subPage: 'base',
      name: '显示顺序',
      code: 'orderNum',
      type: 'number',
      initial: 0,
      style: { search: { display: false } },
    },
    // {
    //   subPage: 'base',
    //   name: '组件路径',
    //   code: 'component',
    //   type: 'string',
    //   style: { search: { display: false } },
    //   rules: [{ type: 'string', max: 255 }],
    // },
    {
      subPage: 'base',
      name: '菜单类型',
      code: 'type',
      type: 'select',
      initial: 'M',
      select: [
        { code: 'F', name: '目录' },
        { code: 'M', name: '菜单' },
      ],
      style: { search: { display: true } },
      rules: [{ required: true }],
    },
    {
      subPage: 'base',
      name: '菜单状态',
      code: 'visible',
      type: 'select',
      initial: '0',
      select: [
        { code: '0', name: '显示' },
        { code: '1', name: '隐藏' },
      ],
      style: { search: { display: false } },
    },
    {
      subPage: 'base',
      name: '菜单图标',
      code: 'icon',
      type: 'select',
      style: { search: { display: false } },
      select: [
        { code: '', name: '无' },
        { code: 'DashboardOutlined', node: <DashboardOutlined /> },
        { code: 'SettingOutlined', node: <SettingOutlined /> },
        { code: 'BankOutlined', node: <BankOutlined /> },
        { code: 'BellOutlined', node: <BellOutlined /> },
        { code: 'AuditOutlined', node: <AuditOutlined /> },
        { code: 'CalendarOutlined', node: <CalendarOutlined /> },
        { code: 'ContactsOutlined', node: <ContactsOutlined /> },
        { code: 'DatabaseOutlined', node: <DatabaseOutlined /> },
        { code: 'TeamOutlined', node: <TeamOutlined /> },
      ],
    },
    {
      subPage: 'base',
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
      entity="menu"
      pageTitle="菜单页面"
      fields={fields}
      option={['add', 'edit', 'delete']}
    />
  );
};
// @ts-ignore
CmsMenu.title = '菜单页面';
export default CmsMenu;
