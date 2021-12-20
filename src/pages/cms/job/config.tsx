import { FC, useState } from 'react';
import CurdPage, { IFields } from '@/components/CurdPage';
import AuthEntityPage from '@/components/AuthEntityPage';
import { useRequest } from 'umi';
import { baseList, baseTree } from '@/services/base';
import { toTreeData, toListData } from '@/utils/baseUtil';
import { jobOption } from '@/services/job';

const JobConfig: FC = (props: any) => {
  const fields: IFields = [
    {
      name: '任务名称',
      code: 'name',
      type: 'string',
      style: { search: { display: true } },
      rules: [{ required: true }, { type: 'string', max: 60 }],
    },
    {
      name: '周期表达式',
      code: 'cron',
      type: 'string',
      style: { search: { display: false } },
      rules: [{ required: true }, { type: 'string', max: 60 }],
    },
    {
      name: '处理器',
      code: 'invoker',
      type: 'select',
      select: [{ code: 'SpringJobInvoker', name: '默认处理器' }],
      style: {
        search: { display: false },
      },
      rules: [{ required: true }],
    },
    {
      name: '任务类名',
      code: 'beanName',
      type: 'string',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 60 }],
    },
    {
      name: '任务参数',
      code: 'params',
      type: 'textarea',
      style: { search: { display: false } },
      rules: [{ type: 'string', max: 500 }],
    },
    {
      name: '执行状态',
      code: ['trigger', 'state'],
      type: 'select',
      //NONE, NORMAL, PAUSED, COMPLETE, ERROR, BLOCKED
      select: [
        { code: 'NONE', name: '停止', color: 'gray' },
        { code: 'NORMAL', name: '正常', color: 'green' },
        { code: 'PAUSED', name: '暂停', color: 'yellow' },
        { code: 'COMPLETE', name: '完成', color: 'green' },
        { code: 'ERROR', name: '错误', color: 'red' },
        { code: 'BLOCKED', name: '等待', color: 'yellow' },
      ],
      style: {
        search: { display: false },
        add: { display: false },
        edit: { display: false },
      },
    },
    {
      name: '最后触发时间',
      code: ['trigger', 'previousFireTime'],
      type: 'datetime',
      style: {
        search: { display: false },
        add: { display: false },
        edit: { display: false },
      },
    },
    {
      name: '下次触发时间',
      code: ['trigger', 'nextFireTime'],
      type: 'datetime',
      style: {
        search: { display: false },
        add: { display: false },
        edit: { display: false },
      },
    },
  ];

  const [queryVersion, setQueryVersion] = useState<string>();

  const jobOptionRequest = useRequest(
    (option: string, id: number) => jobOption(option, { id: id }),
    {
      manual: true,
      onSuccess: () => {
        setQueryVersion(new Date().toString());
      },
    },
  );

  const jobRunClick = (values?: any) => {
    jobOptionRequest.run('run', values.id);
  };

  const jobStartClick = (values?: any) => {
    jobOptionRequest.run('start', values.id);
  };
  const jobPauseClick = (values?: any) => {
    jobOptionRequest.run('pause', values.id);
  };

  const jobStopClick = (values?: any) => {
    jobOptionRequest.run('stop', values.id);
  };

  return (
    <AuthEntityPage
      model="job"
      entity="config"
      pageTitle="任务页面"
      fields={fields}
      option={['add', 'edit', 'delete']}
      queryVersion={queryVersion}
      extendOption={[
        {
          key: 'start',
          props: { type: 'primary' },
          name: '开启',
          requireAuth: 'edit',
          onClick: jobStartClick,
        },
        {
          key: 'run',
          name: '执行',
          requireAuth: 'edit',
          onClick: jobRunClick,
        },
        {
          key: 'pause',
          name: '暂停',
          requireAuth: 'edit',
          onClick: jobPauseClick,
        },
        {
          key: 'stop',
          props: { danger: true },
          name: '停止',
          requireAuth: 'edit',
          onClick: jobStopClick,
        },
      ]}
    />
  );
};
// @ts-ignore
JobConfig.title = '任务页面';
export default JobConfig;
