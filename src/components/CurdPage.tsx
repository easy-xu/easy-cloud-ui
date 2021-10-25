import { FC, ReactElement, useEffect, useState } from 'react';
import {
  InputNumber,
  Form,
  Input,
  Button,
  PageHeader,
  Select,
  Table,
  Space,
  Card,
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
  baseSaveEntity,
  baseDeleteEntity,
  baseQueryEntity,
  baseList,
} from '@/services/base';
import Loading from './Loading';
import { cmsQueryOptionAuth } from '@/services/cms';
import Markdown from './Markdown';

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
  name?: string;
  code?: string;
  type?: string;
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
  node?: ReactElement;
};

export declare type IFields = IField[];

export declare type IStatus = 'search' | 'add' | 'edit' | 'view' | string;
export declare type IAddStatus = 'base' | 'property';

export declare type IPage = {
  current: number;
  pageSize: number;
  total?: number;
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

const default_pageSize = 5;

let nextStatus: IStatus = 'search';

const CurdPage: FC<{
  namespace: string;
  model: string;
  name: string;
  fields: IFields;
  queryEntityApi?: any;
  pageListApi?: any;
  saveEntityApi?: any;
  deleteEntityApi?: any;
  queryOptionAuthApi?: any;
  refresh?: any[];
  extendData?: any[];
  extendOption?: any[];
  extendOptionPage?: any;
}> = ({
  namespace,
  model,
  name,
  fields,
  queryEntityApi,
  pageListApi,
  saveEntityApi,
  deleteEntityApi,
  queryOptionAuthApi,
  refresh,
  extendData,
  extendOption,
  extendOptionPage,
}) => {
  if (queryEntityApi == undefined) {
    queryEntityApi = baseQueryEntity;
  }
  if (pageListApi == undefined) {
    pageListApi = basePageList;
  }
  if (saveEntityApi == undefined) {
    saveEntityApi = baseSaveEntity;
  }
  if (deleteEntityApi == undefined) {
    deleteEntityApi = baseDeleteEntity;
  }
  if (queryOptionAuthApi == undefined) {
    queryOptionAuthApi = cmsQueryOptionAuth;
  }

  const initPata = {
    current: 1,
    pageSize: default_pageSize,
    total: 0,
  };

  //页面状态
  const [status, setStatus] = useState<IStatus>('search');
  //新增页面状态
  const [addStatus, setAddStatus] = useState<IAddStatus>('base');
  //列表选择
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  //删除确认弹窗
  const [deleteConfirmVisible, setDeleteConfirmVisible] =
    useState<boolean>(false);
  //新增-修改对象
  const [entity, setEntity] = useState<any>({});
  //分页信息
  const [page, setPage] = useState<IPage>(initPata);
  //查询条件
  const [query, setQuery] = useState<any>({});
  //列表数据
  const [records, setRecords] = useState<any[]>([]);
  //操作权限
  const [optionAuth, setOptionAuth] = useState<any[]>([]);
  //分组数据
  const [groupData, setGroupData] = useState<any[]>([]);

  //数据分组权限字段
  const propertyFields = [
    {
      name: '分组',
      code: 'groupId',
      type: 'select',
      select: groupData,
      style: {
        search: { display: false },
      },
    },
    {
      name: '所有者权限',
      code: 'ownMode',
      type: 'select',
      select: [
        { code: '-', name: '无权限', color: 'gray' },
        { code: 'r', name: '可读权限', color: 'yellow' },
        { code: 'w', name: '可写权限', color: 'green' },
      ],
      style: {
        search: { display: false },
      },
    },
    {
      name: '同分组权限',
      code: 'groupMode',
      type: 'select',
      select: [
        { code: '-', name: '无权限', color: 'gray' },
        { code: 'r', name: '可读权限', color: 'yellow' },
        { code: 'w', name: '可写权限', color: 'green' },
      ],
      style: {
        search: { display: false },
      },
    },
    {
      name: '其他组权限',
      code: 'otherMode',
      type: 'select',
      select: [
        { code: '-', name: '无权限', color: 'gray' },
        { code: 'r', name: '可读权限', color: 'yellow' },
        { code: 'w', name: '可写权限', color: 'green' },
      ],
      style: {
        search: { display: false },
      },
    },
    {
      name: '创建人员编号',
      code: 'createBy',
      type: 'string',
      style: {
        search: { display: false },
        add: { display: false },
        edit: { disable: true },
      },
    },
    {
      name: '创建人员昵称',
      code: 'createByNickname',
      type: 'string',
      style: {
        search: { display: false },
        add: { display: false },
        edit: { disable: true },
      },
    },
    {
      name: '创建时间',
      code: 'createTime',
      type: 'string',
      style: {
        search: { display: false },
        add: { display: false },
        edit: { disable: true },
      },
    },
    {
      name: '修改人员编号',
      code: 'updateBy',
      type: 'string',
      style: {
        search: { display: false },
        add: { display: false },
        edit: { display: false },
      },
    },
    {
      name: '修改人员昵称',
      code: 'updateByNickname',
      type: 'string',
      style: {
        search: { display: false },
        add: { display: false },
        edit: { display: false },
      },
    },
    {
      name: '修改时间',
      code: 'updateTime',
      type: 'string',
      style: {
        search: { display: false },
        add: { display: false },
        edit: { display: false },
      },
    },
  ];

  // ======useRequest start======
  //分页查询
  const groupDataRequest = useRequest(() => baseList('cms', 'group', {}), {
    manual: true,
    onSuccess: (data) => {
      let groups = data.map((item: any) => {
        return { code: item.id, name: item.name };
      });
      setGroupData(groups);
    },
  });
  //新增或保存
  const saveEntiyRequest = useRequest(
    (params) => saveEntityApi(namespace, model, params),
    {
      manual: true,
      onSuccess: (data) => {
        setEntity({});
        setSelectedRowKeys([]);
        //清除父组件数据
        extendData?.forEach((item: any) => {
          item.clear();
        });
        setStatus('search');
        pageListRequest.run(page, query);
        //需要刷新的api
        refresh?.forEach((item: any) => {
          item.run();
        });
      },
    },
  );
  //分页查询
  const pageListRequest = useRequest(
    (page, query) => pageListApi(namespace, model, page, query),
    {
      manual: true,
      onSuccess: (data) => {
        setPage(data.page);
        setRecords(data.records);
      },
    },
  );
  //主键查询
  const queryEntityRequest = useRequest(
    (id) => queryEntityApi(namespace, model, id),
    {
      manual: true,
      onSuccess: (data) => {
        setEntity(data);
        //设置父组件数据
        extendData?.forEach((item: any) => {
          item.setData(data[item.key]);
          item.setDisable(nextStatus == 'view');
        });
        setStatus(nextStatus);
        setAddStatus('base');
      },
    },
  );
  //主键删除
  const deleteEntityRequest = useRequest(
    (id) => deleteEntityApi(namespace, model, id),
    {
      manual: true,
      onSuccess: (data) => {
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
  const optionAuthRequest = useRequest(() => queryOptionAuthApi(model), {
    manual: true,
    onSuccess: (data) => {
      setOptionAuth(data);
    },
  });
  // ======useRequest end======

  // ======useEffect end======
  useEffect(() => {
    optionAuthRequest.run();
    groupDataRequest.run();
    pageListRequest.run(page, query);
  }, []);

  useEffect(() => {
    if (extendOptionPage == undefined && status != 'search') {
      setStatus('search');
      pageListRequest.run(page, query);
    }
    if (extendOptionPage != undefined && extendOptionPage.key != status) {
      setStatus(extendOptionPage.key);
    }
  }, [extendOptionPage]);
  // ======useEffect end======

  // ======click function start======
  //查询条件更新
  const queryChange = (changedValues: any, allValues: any) => {
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
    setEntity({});
    //清除父组件数据
    extendData?.forEach((item: any) => {
      item.clear();
      item.setDisable(false);
    });
    setStatus('add');
    setAddStatus('base');
  };
  //新增确认按钮
  const addSubmitClick = (values: any) => {
    //补充父组件数据
    extendData?.forEach((item: any) => {
      values[item.key] = item.data;
    });
    saveEntiyRequest.run(values);
  };
  //显示条件分页界面
  const openFirstPage = () => {
    setStatus('search');
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
    if (status == 'search' && item.style && item.style.search) {
      style = item.style.search;
    }
    if (status == 'add' && item.style && item.style.add) {
      style = item.style.add;
    }
    if (status == 'edit' && item.style && item.style.edit) {
      style = item.style.edit;
    }
    if (status == 'view' && item.style && item.style.view) {
      style = item.style.view;
    }
    return style;
  };

  const formItem = (
    item: IField,
    style?: IStyle,
    displayAddStatus?: IAddStatus,
  ) => {
    //判断是否需要render
    if (style != undefined && style.display == false) {
      return;
    }
    //判断在那个页面显示
    let hidden = displayAddStatus ? displayAddStatus != addStatus : false;
    if (style != undefined && style.hidden == true) {
      hidden = true;
    }
    let disable = false;
    if (style != undefined && style.disable == true) {
      disable = true;
    }
    if (status == 'view') {
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
          style={{ minWidth: style?.width ? style.width : 100 }}
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
    else if (item.type == 'radio' && item.select != undefined) {
      content = (
        <Radio.Group name={item.name}>
          {item.select.map((option: IOption) => {
            return (
              <Radio key={option.code} value={option.code}>
                {' '}
                {option.node ? option.node : option.name}
              </Radio>
            );
          })}
        </Radio.Group>
      );
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
    //默认普通输入框
    else {
      content = <Input readOnly={disable} />;
    }

    const formItemNode = (
      <Form.Item
        label={item.name}
        name={item.code}
        key={item.code}
        hidden={hidden}
        rules={status == 'search' ? [] : item.rules}
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
        <Form.Item key={item.code} noStyle shouldUpdate={shouldUpdate}>
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

  //新增页面字段
  const addFieldNodes = fields.map((item: IField) => {
    return formItem(item, getStyle(item), 'base');
  });

  const addPropertyFieldNodes = propertyFields.map((item: IField) => {
    //未声明或者指定显示
    return formItem(item, getStyle(item), 'property');
  });

  //新增页面按钮
  let addOptionNodes = (
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
  let addTitle = '新增';

  if (status == 'edit') {
    addTitle = '修改';
  }
  if (status == 'view') {
    addTitle = '详情';
    addOptionNodes = (
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
      <Button
        type="primary"
        icon={<SearchOutlined />}
        shape="round"
        onClick={queryClick}
      >
        查询
      </Button>
    ) : (
      ''
    );

  //新增按钮
  const addButtion =
    optionAuth.indexOf('add') > -1 ? (
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
    optionAuth.indexOf('edit') > -1 ? (
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
    optionAuth.indexOf('delete') > -1 ? (
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
  const extendOptionButton = extendOption?.map((item) => {
    return optionAuth.indexOf(item.requireAuth) > -1 ? (
      <Button
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
  console.log(namespace + '-' + model + ' page render');
  console.log('entity', entity);

  //新增页面
  if (status == 'add' || status == 'edit' || status == 'view') {
    return (
      <div className="cms-main">
        <PageHeader
          ghost={false}
          onBack={openFirstPage}
          title={addTitle}
          subTitle={name + '页面'}
          extra={[
            <Button
              key="1"
              type={addStatus == 'base' ? 'primary' : 'default'}
              icon={<ProfileOutlined />}
              onClick={() => {
                setAddStatus('base');
              }}
              shape="round"
            >
              基础
            </Button>,
            <Button
              key="2"
              type={addStatus == 'property' ? 'primary' : 'default'}
              icon={<ControlOutlined />}
              onClick={() => {
                setAddStatus('property');
              }}
              shape="round"
            >
              属性
            </Button>,
          ]}
        >
          <Form
            initialValues={entity}
            name={status + '_' + addStatus}
            {...formLayout}
            onFinish={addSubmitClick}
            autoComplete="off"
          >
            {addFieldNodes}
            {addPropertyFieldNodes}
            {addOptionNodes}
          </Form>
        </PageHeader>
      </div>
    );
  }

  if (status == 'search') {
    return (
      <div className="cms-main">
        <div className="cms-query">
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
            pageSizeOptions: ['5', '10', '20', '50'],
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
        subTitle={name + '页面'}
      >
        {extendOptionPage?.node}
      </PageHeader>
    </div>
  );
};

export default CurdPage;
