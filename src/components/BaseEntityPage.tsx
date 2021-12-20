import { FC } from 'react';
import CurdPage, { ICurdPage, IFields } from '@/components/CurdPage';

const BaseEntityPage: FC<ICurdPage> = (props) => {
  const newFields: IFields = [
    ...props.fields,
    {
      subPage: 'property',
      name: '主键',
      code: 'id',
      type: 'number',
      style: {
        add: { hidden: true },
        edit: { hidden: true },
        search: { display: false },
        table: { display: false },
      },
    },
    {
      subPage: 'property',
      name: '创建人员编号',
      code: 'createBy',
      type: 'string',
      style: {
        add: { display: false },
        edit: { disable: true },
        search: { display: false },
        table: { display: false },
      },
    },
    {
      subPage: 'property',
      name: '创建人员昵称',
      code: 'createByNickname',
      type: 'string',
      style: {
        add: { display: false },
        edit: { disable: true },
        search: { display: false },
        table: { display: false },
      },
    },
    {
      subPage: 'property',
      name: '创建时间',
      code: 'createTime',
      type: 'datetime',
      style: {
        add: { display: false },
        edit: { disable: true },
        search: { display: false },
        table: { display: false },
      },
    },

    {
      subPage: 'property',
      name: '更新人员编号',
      code: 'updateBy',
      type: 'string',
      style: {
        add: { display: false },
        edit: { display: false },
        search: { display: false },
        table: { display: false },
      },
    },
    {
      subPage: 'property',
      name: '更新人员昵称',
      code: 'updateByNickname',
      type: 'string',
      style: {
        add: { display: false },
        edit: { display: false },
        search: { display: false },
        table: { display: false },
      },
    },
    {
      subPage: 'property',
      name: '更新时间',
      code: 'updateTime',
      type: 'datetime',
      style: {
        add: { display: false },
        edit: { display: false },
        search: { display: false },
        table: { display: false },
      },
    },
  ];

  return <CurdPage {...props} fields={newFields} />;
};
export default BaseEntityPage;
