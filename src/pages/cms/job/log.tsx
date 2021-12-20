import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import BaseEntityPage from '@/components/BaseEntityPage';
import { useRequest } from 'umi';
import { baseList, baseTree } from '@/services/base';
import { toTreeData, toListData } from '@/utils/baseUtil';

const JobLog: FC = (props: any) => {
  const [jobId, setJobId] = useState<any>([]);
  const jobIdRequest = useRequest(() => baseList('job', 'config', {}), {
    onSuccess: (data) => {
      setJobId(toListData(data, 'id', 'name'));
    },
  });

  const fields: IFields = [
    {
      name: '任务',
      code: 'jobId',
      type: 'select',
      select: jobId,
      style: { search: { display: true } },
      rules: [{ required: true }],
    },
    {
      name: '流水号',
      code: 'requestId',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }],
    },
    {
      name: '日志分类',
      code: 'type',
      type: 'select',
      initial: '',
      select: [
        { code: 'S', name: '系统' },
        { code: 'U', name: '用户' },
      ],
      style: { search: { display: true } },
    },
    {
      name: '执行时间',
      code: 'execTime',
      type: 'datetime',
      style: { search: { display: false } },
    },
    {
      name: '执行结果',
      code: 'execCode',
      type: 'select',
      initial: '0',
      select: [
        { code: '0', name: '正常' },
        { code: '1', name: '异常' },
      ],
      style: { search: { display: false } },
    },
    {
      name: '执行结果描述',
      code: 'execContent',
      type: 'textarea',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 65535 }],
    },
  ];

  return (
    <BaseEntityPage
      model="job"
      entity="log"
      pageTitle="任务日志页面"
      fields={fields}
      option={[]}
    />
  );
};
// @ts-ignore
JobLog.title = '任务日志页面';
export default JobLog;
