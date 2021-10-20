import { FC } from 'react';
import CmsCurd, { IFields } from '@/components/CmsCurd';

const Group: FC = (props: any) => {
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
      name: '分组名称',
      code: 'name',
      type: 'string',
      rules: [{ required: true }],
    },

    {
      name: '分组字符',
      code: 'code',
      type: 'string',
      rules: [{ required: true }],
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

  return <CmsCurd model="group" name="分组" fields={fields} />;
};
// @ts-ignore
Group.title = '分组页面';
export default Group;
