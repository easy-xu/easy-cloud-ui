import { FC, useState } from 'react';
import {
  Upload,
  Form,
  Input,
  Button,
  PageHeader,
  Steps,
  Divider,
  Table,
  Space,
  Card,
} from 'antd';
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useRequest } from 'umi';
import {
  deleteQuestionnaire,
  importQuestionnaire,
  pageListQuestionnaire,
} from '@/services/questionnaire';
import FixRow from '@/components/FixRow';
const { Step } = Steps;

const Menu: FC = (props: any) => {
  //上传步骤
  const [status, setStatus] = useState('search');

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

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const addClick = () => {
    setStatus('add');
  };
  const addCancleClick = () => {
    setStatus('search');
  };

  if (status == 'add') {
    return (
      <div className="cms-main">
        <PageHeader
          ghost={false}
          onBack={addCancleClick}
          title="新增"
          subTitle="菜单页面"
        >
          <Form
            name="add"
            labelCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 6, offset: 0 },
              md: { span: 4, offset: 1 },
              lg: { span: 3, offset: 2 },
              xl: { span: 2, offset: 2 },
            }}
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 18, offset: 0 },
              md: { span: 14, offset: 0 },
              lg: { span: 12, offset: 0 },
              xl: { span: 10, offset: 0 },
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="菜单名称" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="菜单路径" name="path">
              <Input />
            </Form.Item>
          </Form>

          <div className="cms-add-options">
            <FixRow>
              <Space>
                <Button key="2" shape="round" onClick={addCancleClick}>
                  取消
                </Button>
                <Button key="1" type="primary" shape="round">
                  确定
                </Button>
              </Space>
            </FixRow>
          </div>
        </PageHeader>
      </div>
    );
  }

  return (
    <div className="cms-main">
      <Card>
        <Form
          layout="inline"
          name="search"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="菜单名称" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="菜单路径" name="path">
            <Input />
          </Form.Item>

          <Space>
            <Button type="primary" icon={<SearchOutlined />} shape="round">
              查询
            </Button>
            <Button icon={<SearchOutlined />} shape="round">
              模糊查询
            </Button>
          </Space>
        </Form>
      </Card>
      <div className="cms-options">
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            shape="round"
            onClick={addClick}
          >
            新增
          </Button>
          <Button icon={<EditOutlined />} shape="round">
            修改
          </Button>
          <Button danger icon={<DeleteOutlined />} shape="round">
            删除
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={records}
      />
    </div>
  );
};

export default Menu;
