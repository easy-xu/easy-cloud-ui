import { FC, useState } from 'react';
import { ICurdPage, IFields } from '@/components/CurdPage';
import { useRequest } from 'umi';
import { baseList } from '@/services/base';
import BaseEntityPage from './BaseEntityPage';

const AuthEntityPage: FC<ICurdPage> = (props) => {
  const [groupIds, setGroupIds] = useState<any>([]);
  const groupIdsRequest = useRequest(() => baseList('cms', 'group', {}), {
    onSuccess: (data) => {
      let groupIds = data.map((item: any) => {
        return { code: item.id, name: item.name };
      });
      setGroupIds(groupIds);
    },
  });

  const newFields: IFields = [
    ...props.fields,
    {
      subPage: 'base',
      name: '状态',
      code: 'deleted',
      type: 'select',
      initial: '0',
      select: [
        { code: '0', name: '正常', color: 'green' },
        { code: '1', name: '停用', color: 'red' },
      ],
    },
    {
      subPage: 'property',
      name: '数据分组',
      code: 'groupId',
      type: 'select',
      select: groupIds,
      style: { search: { display: false }, table: { display: false } },
    },
    {
      subPage: 'property',
      name: '所有者权限',
      code: 'ownMode',
      type: 'select',
      initial: 'w',
      select: [
        { code: 'r', name: '可读' },
        { code: 'w', name: '可读可写' },
        { code: '-', name: '不可读写' },
      ],
      style: { search: { display: false }, table: { display: false } },
    },
    {
      subPage: 'property',
      name: '同分组权限',
      code: 'groupMode',
      type: 'select',
      initial: 'r',
      select: [
        { code: 'r', name: '可读' },
        { code: 'w', name: '可读可写' },
        { code: '-', name: '不可读写' },
      ],
      style: { search: { display: false }, table: { display: false } },
    },
    {
      subPage: 'property',
      name: '其他分组权限',
      code: 'otherMode',
      type: 'select',
      initial: 'r',
      select: [
        { code: 'r', name: '可读' },
        { code: 'w', name: '可读可写' },
        { code: '-', name: '不可读写' },
      ],
      style: { search: { display: false }, table: { display: false } },
    },
  ];

  return <BaseEntityPage {...props} fields={newFields} />;
};
export default AuthEntityPage;
