import { FC, ReactElement, SetStateAction, useEffect, useState } from 'react';
import {
  InputNumber,
  Form,
  Input,
  Button,
  PageHeader,
  Select,
  Table,
  Space,
  Checkbox,
  Tree,
  Tag,
  Modal,
  Tabs,
  Radio,
  Typography,
} from 'antd';
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
  ControlOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useRequest } from 'umi';
import FixRow from '@/components/FixRow';
import {
  basePageList,
  baseEditEntity,
  baseAddEntity,
  baseDeleteEntity,
  baseQueryEntity,
  baseList,
  baseGetEntity,
} from '@/services/base';
import Loading from './Loading';
import { cmsQueryOptionAuth } from '@/services/cms';
import Markdown from './Markdown';
import FormTree, { ITree } from './FormTree';

const { Option } = Select;
const { TabPane } = Tabs;
const { Text, Link, Paragraph } = Typography;

export declare type IStyle = {
  display?: boolean;
  displayCondition?: any;
  hidden?: boolean;
  disable?: boolean;
  width?: number;
};

export declare type IOption = {
  code: string;
  name?: string;
  color?: string;
  node?: ReactElement;
};

// {
//   xs: '480px',
//   sm: '576px',
//   md: '768px',
//   lg: '992px',
//   xl: '1200px',
//   xxl: '1600px',
// }
export declare type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export declare type IField = {
  subPage?: string;
  name: string;
  code: string | string[];
  type?: string;
  initial?: any;
  responsive?: Breakpoint[];
  rules?: any[];
  style?: {
    search?: IStyle;
    table?: IStyle;
    add?: IStyle;
    edit?: IStyle;
    view?: IStyle;
  };
  select?: IOption[];
  checks?: IOption[];
  radio?: IOption[];
  tree?: ITree[];
  node?: ReactElement;
};

export declare type IFields = IField[];

export declare type IStatus = 'search' | 'add' | 'edit' | 'view' | string;
export declare type ISubPageStatus = 'base' | 'property';

export declare type IPage = {
  current: number;
  pageSize: number;
  total?: number;
};

export declare type ICurdPage = {
  model: string;
  entity: string;
  pageTitle: string;
  fields: IFields;
  queryEntityApi?: any;
  pageListApi?: any;
  addEntityApi?: any;
  editEntityApi?: any;
  deleteEntityApi?: any;
  queryOptionAuthApi?: any;
  refresh?: any[];
  option?: string[];
  extendData?: any[];
  extendOption?: any[];
  extendOptionPage?: any;
  queryVersion?: string;
};

//表单布局样式
export const formLayout = {
  labelCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 6, offset: 0 },
    md: { span: 4, offset: 1 },
    lg: { span: 3, offset: 2 },
    xl: { span: 2, offset: 2 },
  },
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 0 },
    md: { span: 14, offset: 0 },
    lg: { span: 12, offset: 0 },
    xl: { span: 10, offset: 0 },
  },
};

const default_pageSize = 8;

let nextStatus: IStatus = 'search';

const CurdPage: FC<ICurdPage> = ({
  model,
  entity,
  pageTitle,
  fields = [],
  queryEntityApi = baseGetEntity,
  pageListApi = basePageList,
  addEntityApi = baseAddEntity,
  editEntityApi = baseEditEntity,
  deleteEntityApi = baseDeleteEntity,
  queryOptionAuthApi = cmsQueryOptionAuth,
  refresh,
  option = ['add', 'edit', 'delete'],
  extendData = [],
  extendOption = [],
  extendOptionPage,
  queryVersion,
}) => {
  const initPata = {
    current: 1,
    pageSize: default_pageSize,
    total: 0,
  };

  //页面状态
  const [pageStatus, setPageStatus] = useState<IStatus>('search');
  //子页面状态
  const [subPageStatus, setSubPageStatus] = useState<ISubPageStatus>('base');
  //列表选择
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  //删除确认弹窗
  const [deleteConfirmVisible, setDeleteConfirmVisible] =
    useState<boolean>(false);
  //新增-修改对象
  const [entityData, setEntityData] = useState<any>({});
  //分页信息
  const [page, setPage] = useState<IPage>(initPata);
  //查询条件
  const [query, setQuery] = useState<any>({});
  const [queryForm] = Form.useForm();

  //列表数据
  const [records, setRecords] = useState<any[]>([]);
  //操作权限
  const [optionAuth, setOptionAuth] = useState<any[]>([]);

  // ======useRequest start======
  //查询页面刷新
  const doReSearch = () => {
    setEntityData({});
    setSelectedRowKeys([]);
    //清除父组件数据
    extendData?.forEach((item: any) => {
      item.clear();
    });
    setPageStatus('search');
    pageListRequest.run(page, query);
    //需要刷新的api
    refresh?.forEach((item: any) => {
      item.run();
    });
  };
  //新增或保存
  const addEntiyRequest = useRequest(
    (params: any) => addEntityApi(model, entity, params),
    {
      manual: true,
      onSuccess: (data: any) => {
        doReSearch();
      },
    },
  );
  const editEntiyRequest = useRequest(
    (params: any) => editEntityApi(model, entity, params),
    {
      manual: true,
      onSuccess: (data: any) => {
        doReSearch();
      },
    },
  );
  //分页查询
  const pageListRequest = useRequest(
    (page: IPage, query: any) => pageListApi(model, entity, page, query),
    {
      manual: true,
      onSuccess: (data: any) => {
        setPage(data.page);
        setRecords(data.records);
      },
    },
  );
  //主键查询
  const queryEntityRequest = useRequest(
    (id: number) => queryEntityApi(model, entity, id),
    {
      manual: true,
      onSuccess: (data: any) => {
        setEntityData(data);
        //设置父组件数据
        extendData?.forEach((item: any) => {
          item.setData(data[item.key]);
          item.setDisable(nextStatus == 'view');
        });
        setPageStatus(nextStatus);
        setSubPageStatus('base');
      },
    },
  );
  //主键删除
  const deleteEntityRequest = useRequest(
    (id: number) => deleteEntityApi(model, entity, id),
    {
      manual: true,
      onSuccess: (data: any) => {
        setSelectedRowKeys([]);
        setDeleteConfirmVisible(false);
        pageListRequest.run(page, query);
        //需要刷新的api
        refresh?.forEach((item: any) => {
          item.run();
        });
      },
    },
  );
  //查询操作权限
  const optionAuthRequest = useRequest(() => queryOptionAuthApi(entity), {
    manual: true,
    onSuccess: (data: any) => {
      setOptionAuth(data);
    },
  });
  // ======useRequest end======

  // ======useEffect start======
  useEffect(() => {
    optionAuthRequest.run();
    pageListRequest.run(page, query);
  }, [queryVersion]);

  useEffect(() => {
    if (!query || Object.keys(query).length == 0) {
      queryForm.resetFields();
    }
  }, [query]);

  useEffect(() => {
    if (extendOptionPage == undefined && pageStatus != 'search') {
      setPageStatus('search');
      pageListRequest.run(page, query);
    }
    if (extendOptionPage != undefined && extendOptionPage.key != pageStatus) {
      setPageStatus(extendOptionPage.key);
    }
  }, [extendOptionPage]);
  // ======useEffect end======

  // ======click function start======
  //查询条件更新
  const queryChange = (changedValues: any, allValues: any) => {
    if (allValues) {
      for (let key of Object.keys(allValues)) {
        if (allValues[key] === '') {
          allValues[key] = undefined;
        }
      }
    }
    setQuery(allValues);
  };
  //分页更新
  const pageChage = (current?: number, pageSize?: number) => {
    console.log(current, pageSize);
    let newPage: IPage = {
      current: current ? current : 1,
      pageSize: pageSize ? pageSize : default_pageSize,
    };
    pageListRequest.run(newPage, query);
  };
  //查询按钮
  const queryClick = () => {
    pageListRequest.run(page, query);
  };
  //新增按钮
  const addClick = () => {
    setEntityData({});
    //清除父组件数据
    extendData?.forEach((item: any) => {
      item.clear();
      item.setDisable(false);
    });
    setPageStatus('add');
    setSubPageStatus('base');
  };
  //新增或修改确认按钮
  const pageSubmitClick = (values: any) => {
    //补充父组件数据
    extendData?.forEach((item: any) => {
      values[item.key] = item.data;
    });
    if (pageStatus == 'add') {
      addEntiyRequest.run(values);
    }
    if (pageStatus == 'edit') {
      editEntiyRequest.run(values);
    }
  };
  //显示条件分页界面
  const openFirstPage = () => {
    setPageStatus('search');
  };
  //修改按钮
  const eidtClick = () => {
    nextStatus = 'edit';
    queryEntityRequest.run(selectedRowKeys[0]);
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
    nextStatus = 'view';
    queryEntityRequest.run(id);
  };
  // ======click function end======

  // ======render node start======
  //获取指定style
  const getStyle = (item: IField) => {
    //未声明或者指定显示
    let style = undefined;
    if (pageStatus == 'search' && item.style && item.style.search) {
      style = item.style.search;
    }
    if (pageStatus == 'add' && item.style && item.style.add) {
      style = item.style.add;
    }
    if (pageStatus == 'edit' && item.style && item.style.edit) {
      style = item.style.edit;
    }
    if (pageStatus == 'view' && item.style && item.style.view) {
      style = item.style.view;
    }
    return style;
  };

  const formItem = (item: IField, style?: IStyle) => {
    //判断是否需要render
    if (style != undefined && style.display == false) {
      return;
    }
    //判断在那个子页面显示
    if (!item.subPage) {
      item.subPage = 'base';
    }
    let hidden = pageStatus == 'search' ? false : subPageStatus != item.subPage;

    if (style != undefined && style.hidden == true) {
      hidden = true;
    }

    let disable = false;
    if (style != undefined && style.disable == true) {
      disable = true;
    }
    //详情页面全部不可修改
    if (pageStatus == 'view') {
      disable = true;
    }

    let content: any;

    //自定义节点
    if (item.node) {
      content = item.node;
    }
    //下拉选择框
    else if (item.type == 'select' && item.select != undefined) {
      content = (
        <Select
          style={{ minWidth: style?.width ? style.width : 150 }}
          disabled={disable}
          allowClear
        >
          {item.select.map((option: IOption) => {
            return (
              <Option key={option.code} value={option.code}>
                {option.node ? option.node : option.name}
              </Option>
            );
          })}
        </Select>
      );
    }

    //单选框
    else if (item.type == 'radio' && item.radio != undefined) {
      content = (
        <Radio.Group name={item.name} disabled={disable}>
          {item.radio.map((option: IOption) => {
            return (
              <Radio key={option.code} value={option.code}>
                {option.node ? option.node : option.name}
              </Radio>
            );
          })}
        </Radio.Group>
      );
    }
    //多选框
    else if (item.type == 'checks' && item.checks != undefined) {
      content = (
        <Checkbox.Group name={item.name} disabled={disable}>
          {item.checks.map((option: IOption) => {
            return (
              <Checkbox key={option.code} value={option.code}>
                {option.node ? option.node : option.name}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      );
    }
    //树
    else if (item.type == 'tree' && item.tree != undefined) {
      content = <FormTree disabled={disable} treeData={item.tree} />;
    }

    //markdown
    else if (item.type == 'markdown') {
      content = <Markdown />;
    }

    //数字输入
    else if (item.type == 'number') {
      content = <InputNumber style={{ minWidth: 200 }} readOnly={disable} />;
    }
    //密码
    else if (item.type == 'password') {
      content = <Input.Password readOnly={disable} />;
    }
    //文本域
    else if (item.type == 'textarea') {
      content = <Input.TextArea rows={3} readOnly={disable} />;
    }
    //默认普通输入框
    else {
      content = <Input readOnly={disable} />;
    }

    const key = item.code.toString();

    const formItemNode = (
      <Form.Item
        label={item.name}
        name={item.code}
        key={key}
        hidden={hidden}
        initialValue={pageStatus == 'add' ? item.initial : undefined}
        rules={pageStatus == 'search' ? [] : item.rules}
      >
        {content}
      </Form.Item>
    );

    //动态节点
    if (style != undefined && style.displayCondition != undefined) {
      const condition = style.displayCondition;
      //是否更新条件
      const shouldUpdate = (prevValues: any, currentValues: any) => {
        for (const key in condition) {
          if (prevValues[key] !== currentValues[key]) {
            return true;
          }
        }
        return false;
      };
      return (
        <Form.Item key={key} noStyle shouldUpdate={shouldUpdate}>
          {({ getFieldValue }) => {
            for (const key in condition) {
              if (condition[key].indexOf(getFieldValue(key)) == -1) {
                return null;
              }
            }
            return formItemNode;
          }}
        </Form.Item>
      );
    }

    return formItemNode;
  };

  //查询选项
  let seachNodes = fields.map((item: IField) => {
    //未声明或者指定显示
    return formItem(item, getStyle(item));
  });

  //列表数据
  let columns: any = new Array();
  let columnCount = 0;
  fields.forEach((item: IField) => {
    //未声明或者指定显示
    if (
      item.style == undefined ||
      item.style.table == undefined ||
      item.style.table.display == undefined ||
      item.style.table.display
    ) {
      columnCount++;
      let responsive = ['xxl'];
      switch (columnCount) {
        case 1:
        case 2:
          responsive = ['xs', 'sm'];
          break;
        case 3:
        case 4:
          responsive = ['md'];
          break;
        case 6:
        case 5:
          responsive = ['lg'];
          break;
        case 8:
        case 7:
          responsive = ['xl'];
          break;
        default:
          responsive = ['xxl'];
      }

      columns.push({
        title: item.name,
        dataIndex: item.code,
        key: item.code,
        //自动省略
        ellipsis: true,
        responsive: responsive,
        render: (text: any, record: any) => {
          //选择类型回显
          if (item && item.select) {
            return item.select.map((option) => {
              if (option.code == text) {
                //指定节点
                if (option.node) {
                  return <div key={record.id}> {option.node} </div>;
                }
                //指定颜色
                else if (option.color) {
                  return (
                    <Tag key={record.id} color={option.color}>
                      {option.name}
                    </Tag>
                  );
                }
                //选项纯文本
                else {
                  return option.name;
                }
              }
            });
          } else {
            //默认纯文本
            return text;
          }
        },
      });
    }
  });
  //详情查看按钮
  if (optionAuth.indexOf('query') > -1) {
    columns.push({
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            size="small"
            shape="round"
            onClick={() => viewClick(record.id)}
          >
            详情
          </Button>
        </Space>
      ),
    });
  }

  //表格选择
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    defaultSelectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };

  //子页面字段
  const fieldNodes = fields.map((item: IField) => {
    return formItem(item, getStyle(item));
  });

  //子页面按钮
  let subOptionNodes = (
    <Form.Item>
      <div className="cms-add-options">
        <FixRow>
          <Space>
            <Button key="2" shape="round" onClick={openFirstPage}>
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
  let subTitle = '新增';

  if (pageStatus == 'edit') {
    subTitle = '修改';
  }
  if (pageStatus == 'view') {
    subTitle = '详情';
    subOptionNodes = (
      <Form.Item>
        <div className="cms-add-options">
          <FixRow>
            <Space>
              <Button key="1" shape="round" onClick={openFirstPage}>
                返回
              </Button>
            </Space>
          </FixRow>
        </div>
      </Form.Item>
    );
  }

  //查询按钮
  const queryButton =
    optionAuth.indexOf('query') > -1 ? (
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          shape="round"
          onClick={queryClick}
        >
          查询
        </Button>
        <Button
          shape="round"
          onClick={() => {
            setQuery({});
            setPage({ current: 1, pageSize: default_pageSize });
          }}
        >
          重置
        </Button>
      </Space>
    ) : (
      ''
    );

  //新增按钮
  const addButtion =
    optionAuth.indexOf('add') > -1 && option.indexOf('add') > -1 ? (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        shape="round"
        onClick={addClick}
      >
        新增
      </Button>
    ) : (
      ''
    );

  //修改按钮
  const editButtion =
    optionAuth.indexOf('edit') > -1 && option.indexOf('edit') > -1 ? (
      <Button
        disabled={selectedRowKeys.length != 1}
        icon={<EditOutlined />}
        shape="round"
        onClick={eidtClick}
      >
        修改
      </Button>
    ) : (
      ''
    );

  //删除按钮
  const deleteButtion =
    optionAuth.indexOf('delete') > -1 && option.indexOf('delete') > -1 ? (
      <Button
        disabled={selectedRowKeys.length != 1}
        danger
        icon={<DeleteOutlined />}
        shape="round"
        onClick={deleteClick}
      >
        删除
      </Button>
    ) : (
      ''
    );

  //额外的按钮
  const extendOptionButton = extendOption.map((item) => {
    return optionAuth.indexOf(item.requireAuth) > -1 ? (
      <Button
        {...item.props}
        key={item.key}
        disabled={selectedRowKeys.length != 1}
        shape="round"
        onClick={() => {
          item.onClick(records[selectedRowKeys[0] - 1]);
        }}
      >
        {item.name}
      </Button>
    ) : (
      ''
    );
  });

  // ======render node end======

  //debug
  console.log('page render', model + '-' + entity);
  console.log('entity', entityData);
  console.log('query', query);
  console.log('fields', fields);

  //子页面
  if (pageStatus == 'add' || pageStatus == 'edit' || pageStatus == 'view') {
    return (
      <div className="cms-main">
        <PageHeader
          ghost={false}
          onBack={openFirstPage}
          title={subTitle}
          subTitle={pageTitle}
          extra={[
            <Button
              key="1"
              type={subPageStatus == 'base' ? 'primary' : 'default'}
              icon={<ProfileOutlined />}
              onClick={() => {
                setSubPageStatus('base');
              }}
              shape="round"
            >
              基础
            </Button>,
            <Button
              key="2"
              type={subPageStatus == 'property' ? 'primary' : 'default'}
              icon={<ControlOutlined />}
              onClick={() => {
                setSubPageStatus('property');
              }}
              shape="round"
            >
              属性
            </Button>,
          ]}
        >
          <Form
            initialValues={entityData}
            name={pageStatus + '_' + subPageStatus}
            {...formLayout}
            onFinish={pageSubmitClick}
            autoComplete="off"
          >
            {fieldNodes}
            {subOptionNodes}
          </Form>
        </PageHeader>
      </div>
    );
  }

  if (pageStatus == 'search') {
    return (
      <div className="cms-main">
        <div className="cms-query">
          <Form
            form={queryForm}
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
              <Space>{queryButton}</Space>
            </Form.Item>
          </Form>
        </div>
        <div className="cms-options">
          <Space>
            {addButtion}
            {editButtion}
            {deleteButtion}
            {extendOptionButton}
          </Space>
        </div>

        <Table
          columns={columns}
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          dataSource={records}
          pagination={{
            showSizeChanger: true,
            onShowSizeChange: pageChage,
            onChange: pageChage,
            current: page.current,
            total: page.total,
            pageSize: page.pageSize,
            pageSizeOptions: ['5', '8', '10', '20'],
          }}
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
          <Paragraph>
            <Text strong>数据删除后不可恢复！</Text>
          </Paragraph>
          <Paragraph>
            是否确认
            <Text strong type="danger">
              删除
            </Text>
            {selectedRowKeys.length}条数据？
          </Paragraph>
        </Modal>
      </div>
    );
  }

  return (
    <div className="cms-main">
      <PageHeader
        ghost={false}
        onBack={openFirstPage}
        title={extendOptionPage?.name}
        subTitle={pageTitle}
      >
        {extendOptionPage?.node}
      </PageHeader>
    </div>
  );
};

export default CurdPage;
