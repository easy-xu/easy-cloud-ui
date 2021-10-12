import { FC, useReducer, useState } from 'react';
import {
  InputNumber,
  Form,
  Input,
  Button,
  PageHeader,
  Steps,
  Select,
  Table,
  Space,
  Card,
  Tag,
  Modal,
} from 'antd';
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useRequest } from 'umi';
import FixRow from '@/components/FixRow';
import {
  cmsPageList,
  cmsSaveEntity,
  cmsDeleteEntity,
  cmsQueryEntity,
} from '@/services/cms';

const { Option } = Select;
const { Step } = Steps;

declare type IStyle = {
  display?: boolean;
  hidden?: boolean;
  disable?: boolean;
};

declare type IOption = {
  code: string;
  name: string;
  color: string;
};

declare type IField = {
  name?: string;
  code?: string;
  type?: string;
  style?: {
    search?: IStyle;
    table?: IStyle;
    add?: IStyle;
    edit?: IStyle;
  };
  select?: IOption[];
};

declare type IFields = IField[];

declare type IStatus = 'search' | 'add' | 'edit' | 'view';

declare type IPage = { current: number; size: number };

const Menu: FC = (props: any) => {
  const model = 'menu';

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
      code: 'menuName',
      type: 'string',
    },
    {
      name: '菜单路径',
      code: 'path',
      type: 'string',
    },
    {
      name: '显示排序',
      code: 'orderNum',
      type: 'number',
      style: {
        search: { display: false },
      },
    },
    {
      name: '状态',
      code: 'status',
      type: 'select',
      select: [
        { code: '0', name: '显示', color: 'green' },
        { code: '1', name: '停用', color: 'red' },
      ],
    },
  ];

  const pageListApi = cmsPageList;
  const deleteEntityApi = cmsDeleteEntity;
  const queryEntityApi = cmsQueryEntity;
  const saveEntityApi = cmsSaveEntity;

  //页面状态
  const [status, setStatus] = useState<IStatus>('search');
  //列表选择
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  //删除确认弹窗
  const [deleteConfirmVisible, setDeleteConfirmVisible] =
    useState<boolean>(false);
  //新增-修改对象
  const [entity, setEntity] = useState<any>({});
  //分页信息
  const [page, setPage] = useState<IPage>({ current: 1, size: 10 });
  //查询条件
  const [query, setQuery] = useState<any>({});
  //列表数据
  const [records, setRecords] = useState<any[]>([]);

  // ======useRequest start======
  //新增或保存
  const saveEntiyRequest = useRequest(
    (params) => saveEntityApi(model, params),
    {
      manual: true,
      onSuccess: (data) => {
        setEntity({});
        setStatus('search');
        pageListRequest.run();
      },
    },
  );
  //分页查询
  const pageListRequest = useRequest(() => pageListApi(model, page, query), {
    onSuccess: (data) => {
      setRecords(data.page.records);
    },
  });
  //主键查询
  const queryEntityRequest = useRequest((id) => queryEntityApi(model, id), {
    manual: true,
    onSuccess: (data) => {
      setEntity(data);
    },
  });
  //主键删除
  const deleteEntityRequest = useRequest((id) => deleteEntityApi(model, id), {
    manual: true,
    onSuccess: (data) => {
      setSelectedRowKeys([]);
      setDeleteConfirmVisible(false);
      pageListRequest.run();
    },
  });
  // ======useRequest end======

  // ======click function start======
  //查询条件更新
  const queryChange = (changedValues: any, allValues: any) => {
    setQuery(allValues);
  };
  const queryClick = () => {
    pageListRequest.run();
  };
  //新增按钮
  const addClick = () => {
    setStatus('add');
  };
  //新增确认按钮
  const addSubmitClick = (values: any) => {
    saveEntiyRequest.run(values);
  };
  //新增取消按钮
  const addCancleClick = () => {
    setStatus('search');
  };
  //修改按钮
  const eidtClick = () => {
    queryEntityRequest.run(selectedRowKeys[0]);
    setStatus('edit');
  };
  //修改确认按钮
  const editSubmitClick = (values: any) => {
    saveEntiyRequest.run(values);
  };
  //修改取消按钮
  const editCancleClick = () => {
    setEntity({});
    setStatus('search');
  };
  //表格选择事件
  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  //删除按钮
  const deleteClick = () => {
    setDeleteConfirmVisible(true);
  };
  //确认删除
  const deleteConfirm = () => {
    deleteEntityRequest.run(selectedRowKeys[0]);
  };
  //取消删除
  const deleteCancle = () => {
    setDeleteConfirmVisible(false);
  };
  //查看详情
  const viewClick = (id: number) => {
    queryEntityRequest.run(id);
    setStatus('view');
  };
  // ======click function end======

  // ======render node start======

  const formItem = (item: IField, style?: IStyle) => {
    if (style != undefined && style.display == false) {
      return;
    }
    let hidden = false;
    if (style != undefined && style.hidden == true) {
      hidden = true;
    }
    let disable = false;
    if (status == 'view') {
      disable = true;
    }

    //普通输入框
    let content = <Input readOnly={disable} />;

    //下拉选择框
    if (item.type == 'select' && item.select != undefined) {
      content = (
        <Select style={{ minWidth: 100 }} disabled={disable} allowClear>
          {item.select.map((option: IOption) => {
            return (
              <Option key={option.code} value={option.code}>
                {option.name}
              </Option>
            );
          })}
        </Select>
      );
    }

    //数字输入
    if (item.type == 'number') {
      content = <InputNumber style={{ minWidth: 100 }} readOnly={disable} />;
    }

    return (
      <Form.Item
        label={item.name}
        name={item.code}
        key={item.code}
        hidden={hidden}
      >
        {content}
      </Form.Item>
    );
  };

  //查询选项
  let seachNodes = fields.map((item: IField) => {
    //未声明或者指定显示
    return formItem(item, item.style ? item.style.search : undefined);
  });

  //列表数据
  let columns: any = new Array();
  fields.forEach((item: IField) => {
    //未声明或者指定显示
    if (
      item.style == undefined ||
      item.style.table == undefined ||
      item.style.table.display == undefined ||
      item.style.table.display
    ) {
      columns.push({
        title: item.name,
        dataIndex: item.code,
        key: item.code,
        render: (text: any, record: any) =>
          item && item.select
            ? item.select.map((option) => {
                if (option.code == text) {
                  return (
                    <Tag key={record.id} color={option.color}>
                      {option.name}
                    </Tag>
                  );
                }
              })
            : text,
      });
    }
  });

  columns.push({
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <Button size="small" shape="round" onClick={() => viewClick(record.id)}>
          查看
        </Button>
      </Space>
    ),
  });

  //表格选择
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    defaultSelectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };

  //新增页面字段
  let addFieldNodes = fields.map((item: IField) => {
    //未声明或者指定显示
    return formItem(item, item.style ? item.style.add : undefined);
  });
  //新增页面按钮
  let addOptionNodes = (
    <Form.Item>
      <div className="cms-add-options">
        <FixRow>
          <Space>
            <Button key="2" shape="round" onClick={addCancleClick}>
              取消
            </Button>
            <Button key="1" type="primary" htmlType="submit" shape="round">
              确定
            </Button>
          </Space>
        </FixRow>
      </div>
    </Form.Item>
  );

  //标题
  let addTitle = '新增';

  if (status == 'edit') {
    addTitle = '修改';
  }
  if (status == 'view') {
    addTitle = '查看';
    addOptionNodes = (
      <Form.Item>
        <div className="cms-add-options">
          <FixRow>
            <Space>
              <Button key="1" shape="round" onClick={addCancleClick}>
                返回
              </Button>
            </Space>
          </FixRow>
        </div>
      </Form.Item>
    );
  }
  // ======render node end======

  //debug
  console.log('page render');

  //新增页面
  if (status == 'add' || status == 'edit' || status == 'view') {
    return (
      <div className="cms-main">
        <PageHeader
          ghost={false}
          onBack={addCancleClick}
          title={addTitle}
          subTitle="菜单页面"
        >
          <Form
            initialValues={entity}
            name={status}
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
            onFinish={addSubmitClick}
            autoComplete="off"
          >
            {addFieldNodes}
            {addOptionNodes}
          </Form>
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
          initialValues={query}
          autoComplete="off"
          onValuesChange={queryChange}
        >
          {seachNodes}
          <Form.Item>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                shape="round"
                onClick={queryClick}
              >
                查询
              </Button>
              <Button icon={<SearchOutlined />} shape="round">
                模糊查询
              </Button>
            </Space>
          </Form.Item>
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
          <Button
            disabled={selectedRowKeys.length != 1}
            icon={<EditOutlined />}
            shape="round"
            onClick={eidtClick}
          >
            修改
          </Button>
          <Button
            disabled={selectedRowKeys.length != 1}
            danger
            icon={<DeleteOutlined />}
            shape="round"
            onClick={deleteClick}
          >
            删除
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        dataSource={records}
      />
      <Modal
        title="删除确认"
        visible={deleteConfirmVisible}
        onOk={deleteConfirm}
        onCancel={deleteCancle}
        okButtonProps={{ danger: true }}
        okText="删除"
        cancelText="取消"
      >
        是否确认删除{selectedRowKeys.length}条数据？
      </Modal>
    </div>
  );
};

export default Menu;
