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
  cmsQueryOptionAuth,
} from '@/services/cms';
import Loading from './Loading';

const { Option } = Select;

export declare type IStyle = {
  display?: boolean;
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
  style?: {
    search?: IStyle;
    table?: IStyle;
    add?: IStyle;
    edit?: IStyle;
  };
  select?: IOption[];
  node?: ReactElement;
};

export declare type IFields = IField[];

export declare type IStatus = 'search' | 'add' | 'edit' | 'view';

export declare type IPage = {
  current: number;
  pageSize: number;
  total?: number;
};

const default_pageSize = 5;

let nextStatus: IStatus = 'search';

const Menu: FC<{
  model: string;
  name: string;
  fields: IFields;
  queryEntityApi?: any;
  pageListApi?: any;
  saveEntityApi?: any;
  deleteEntityApi?: any;
  queryOptionAuthApi?: any;
  refresh?: any[];
  extendData?: any;
  extendDataOnClear?: any;
}> = ({
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
}) => {
  if (queryEntityApi == undefined) {
    queryEntityApi = cmsQueryEntity;
  }
  if (pageListApi == undefined) {
    pageListApi = cmsPageList;
  }
  if (saveEntityApi == undefined) {
    saveEntityApi = cmsSaveEntity;
  }
  if (deleteEntityApi == undefined) {
    deleteEntityApi = cmsDeleteEntity;
  }
  if (queryOptionAuthApi == undefined) {
    queryOptionAuthApi = cmsQueryOptionAuth;
  }

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
  const [page, setPage] = useState<IPage>({
    current: 1,
    pageSize: default_pageSize,
    total: 0,
  });
  //查询条件
  const [query, setQuery] = useState<any>({});
  //列表数据
  const [records, setRecords] = useState<any[]>([]);
  //操作权限
  const [optionAuth, setOptionAuth] = useState<any[]>([]);

  // ======useRequest start======
  //新增或保存
  const saveEntiyRequest = useRequest(
    (params) => saveEntityApi(model, params),
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
    (page, query) => pageListApi(model, page, query),
    {
      manual: true,
      onSuccess: (data) => {
        setPage(data.page);
        setRecords(data.records);
      },
    },
  );
  //主键查询
  const queryEntityRequest = useRequest((id) => queryEntityApi(model, id), {
    manual: true,
    onSuccess: (data) => {
      setEntity(data);
      //设置父组件数据
      extendData?.forEach((item: any) => {
        item.setData(data[item.key]);
        item.setDisable(nextStatus == 'view');
      });
      setStatus(nextStatus);
    },
  });
  //主键删除
  const deleteEntityRequest = useRequest((id) => deleteEntityApi(model, id), {
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
  });
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
    pageListRequest.run(page, query);
  }, []);
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
  };
  //新增确认按钮
  const addSubmitClick = (values: any) => {
    //补充父组件数据
    extendData?.forEach((item: any) => {
      values[item.key] = item.data;
    });
    saveEntiyRequest.run(values);
  };
  //新增取消按钮
  const addCancleClick = () => {
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

    let content;

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

    //数字输入
    else if (item.type == 'number') {
      content = <InputNumber style={{ minWidth: 100 }} readOnly={disable} />;
    }
    //默认普通输入框
    else {
      content = <Input readOnly={disable} />;
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
                  return option.node;
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
  if (optionAuth.indexOf('view') > -1) {
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
    addTitle = '详情';
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

  // ======render node end======

  //debug
  console.log(model + ' page render');

  //新增页面
  if (status == 'add' || status == 'edit' || status == 'view') {
    return (
      <div className="cms-main">
        <PageHeader
          ghost={false}
          onBack={addCancleClick}
          title={addTitle}
          subTitle={name + '页面'}
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
        是否确认删除{selectedRowKeys.length}条数据？
      </Modal>
    </div>
  );
};

export default Menu;
