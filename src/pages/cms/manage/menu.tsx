import { FC, useState } from 'react';
import CmsCurd, { IFields } from '@/components/CmsCurd';
import { cmsList } from '@/services/cms';
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

const Menu: FC = (props: any) => {
  //页面状态
  const [folders, setFolders] = useState<any>([]);

  //查询菜单文件夹
  const menuFolderRequest = useRequest(() => cmsList('menu', { type: 'F' }), {
    onSuccess: (data) => {
      let folders = data.map((item: any) => {
        return { code: item.id, name: item.name };
      });
      folders.splice(0, 0, { code: 0, name: '根目录' });
      setFolders(folders);
    },
  });

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
      name: '菜单名称',
      code: 'name',
      type: 'string',
      rules: [{ required: true }],
    },
    {
      name: '文件夹',
      code: 'parentId',
      type: 'select',
      rules: [{ required: true }],
      select: folders,
      style: {
        search: {
          width: 200,
        },
      },
    },

    {
      name: '路径字符',
      code: 'code',
      type: 'string',
      rules: [{ required: true }],
      style: {
        search: { display: false },
      },
    },
    {
      name: '菜单图标',
      code: 'icon',
      type: 'select',
      select: [
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
      style: {
        search: { display: false },
      },
    },
    {
      name: '显示排序',
      code: 'orderNum',
      type: 'number',
      rules: [{ required: true }],
      style: {
        search: { display: false },
      },
    },
    {
      name: '类型',
      code: 'type',
      type: 'select',
      rules: [{ required: true }],
      select: [
        { code: 'F', name: '目录', color: 'yellow' },
        { code: 'M', name: '菜单', color: 'green' },
      ],
    },
    {
      name: '隐藏',
      code: 'visible',
      type: 'select',
      select: [
        { code: '0', name: '显示', color: 'green' },
        { code: '1', name: '隐藏', color: 'gray' },
      ],
      style: {
        search: { display: false },
      },
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
      model="menu"
      name="菜单"
      fields={fields}
      refresh={[menuFolderRequest]}
    />
  );
};
// @ts-ignore
Menu.title = '菜单页面';
export default Menu;
