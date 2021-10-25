import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import { useRequest } from 'umi';
import { baseList } from '@/services/base';

const Knowledge: FC = (props: any) => {
  //页面状态
  const [folders, setFolders] = useState<any>([]);

  //查询知识点文件夹
  const knowledgeFolderRequest = useRequest(
    () => baseList('knowledge', 'node', { types: ['N', 'NC'] }),
    {
      onSuccess: (data) => {
        let folders = data.map((item: any) => {
          return { code: item.id, name: item.name };
        });
        folders.splice(0, 0, { code: 0, name: '根节点' });
        setFolders(folders);
      },
    },
  );

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
      name: '节点名称',
      code: 'name',
      type: 'string',
      rules: [{ required: true }],
    },
    {
      name: '父节点',
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
        { code: 'N', name: '节点', color: 'red' },
        { code: 'NC', name: '节点内容', color: 'yellow' },
        { code: 'C', name: '内容', color: 'green' },
      ],
    },
    {
      name: '内容主键',
      code: 'contentId',
      type: 'number',
      style: {
        search: { display: false },
        table: { display: false },
        add: { displayCondition: { type: ['C', 'NC'] }, hidden: true },
        edit: { displayCondition: { type: ['C', 'NC'] }, hidden: true },
      },
    },
    {
      name: '内容',
      code: 'markdown',
      type: 'markdown',
      style: {
        search: { display: false },
        table: { display: false },
        add: { displayCondition: { type: ['C', 'NC'] } },
        edit: { displayCondition: { type: ['C', 'NC'] } },
      },
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
    <CurdPage
      namespace="knowledge"
      model="node"
      name="知识点"
      fields={fields}
      refresh={[knowledgeFolderRequest]}
    />
  );
};
// @ts-ignore
Knowledge.title = '知识点页面';
export default Knowledge;
