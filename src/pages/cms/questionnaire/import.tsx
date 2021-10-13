import { FC, useState } from 'react';
import { Upload, message, Button, Steps, Divider, Table, Space } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { getHeader } from '@/utils/api';
import { useRequest } from 'umi';
import {
  deleteQuestionnaire,
  importQuestionnaire,
  pageListQuestionnaire,
} from '@/services/questionnaire';
const { Step } = Steps;

const QuestionnaireImport: FC = (props: any) => {
  //上传步骤
  const initSteps: {
    title?: string;
    description?: string;
    status?: 'wait' | 'error' | 'process' | 'finish' | undefined;
  }[] = [
    { title: '上传excle', status: 'wait' },
    { title: '解析excle', status: 'wait' },
    { title: '导入数据', status: 'wait' },
  ];
  const [steps, setSteps] = useState(initSteps);

  const uploadProps: any = {
    name: 'file',
    action: '/api/file/upload',
    accept: '.xls,.xlsx',
    headers: getHeader(),
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status == 'uploading') {
        let newSteps: any = Object.assign([], steps);
        newSteps[0].status = 'process';
        newSteps[0].description = '上传中';
        setSteps(newSteps);
      }
      if (info.file.status === 'done') {
        let newSteps: any = Object.assign([], steps);
        newSteps[0].status = 'finish';
        newSteps[0].description = '上传成功';
        newSteps[1].status = 'process';
        newSteps[1].description = '解析中';
        setSteps(newSteps);
        importQuestionnaireRequest.run(info.file.response.data.id);
      } else if (info.file.status === 'error') {
        let newSteps: any = Object.assign([], steps);
        newSteps[0].status = 'error';
        newSteps[0].description = '上传失败';
        setSteps(newSteps);
      }
    },
  };

  const importQuestionnaireRequest = useRequest(
    (fileId) => importQuestionnaire(fileId),
    {
      manual: true,
      onSuccess: (data) => {
        console.log(data);
        let newSteps: any = Object.assign([], steps);
        newSteps[1].status = 'finish';
        newSteps[1].description = '解析成功';
        newSteps[2].status = 'finish';
        newSteps[2].description = '导入成功';
        setSteps(newSteps);
      },
      onError: (data: any) => {
        console.log(data);
        let newSteps: any = Object.assign([], steps);
        newSteps[1].status = 'error';
        newSteps[1].description = data;
        setSteps(newSteps);
      },
    },
  );

  //问卷表格

  //查询列表
  const [page, setPage] = useState<any>({ current: 1, size: 10 });

  const [records, setRecords] = useState<any>([]);

  const pageListQuestionnaireRequest = useRequest(
    () => pageListQuestionnaire(page),
    {
      onSuccess: (data) => {
        console.log(data);
        setRecords(data.page.records);
      },
    },
  );

  const deleteQuestionnaireRequest = useRequest(
    (id) => deleteQuestionnaire(id),
    {
      manual: true,
      onSuccess: (data) => {
        pageListQuestionnaireRequest.run();
      },
    },
  );

  const deleteClick = function (id: number) {
    deleteQuestionnaireRequest.run(id);
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button size="small" danger onClick={() => deleteClick(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Steps>
        {steps.map((step, index) => {
          return (
            <Step
              key={index}
              title={step.title}
              description={step.description}
              status={step.status}
              icon={step.status == 'process' ? <LoadingOutlined /> : ''}
            />
          );
        })}
      </Steps>
      <Divider />
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>上传测试题</Button>
      </Upload>
      <Divider />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={records}
      />
      ;
    </div>
  );
};

export default QuestionnaireImport;
