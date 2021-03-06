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

//??????????????????
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

  //????????????
  const [pageStatus, setPageStatus] = useState<IStatus>('search');
  //???????????????
  const [subPageStatus, setSubPageStatus] = useState<ISubPageStatus>('base');
  //????????????
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  //??????????????????
  const [deleteConfirmVisible, setDeleteConfirmVisible] =
    useState<boolean>(false);
  //??????-????????????
  const [entityData, setEntityData] = useState<any>({});
  //????????????
  const [page, setPage] = useState<IPage>(initPata);
  //????????????
  const [query, setQuery] = useState<any>({});
  const [queryForm] = Form.useForm();

  //????????????
  const [records, setRecords] = useState<any[]>([]);
  //????????????
  const [optionAuth, setOptionAuth] = useState<any[]>([]);

  // ======useRequest start======
  //??????????????????
  const doReSearch = () => {
    setEntityData({});
    setSelectedRowKeys([]);
    //?????????????????????
    extendData?.forEach((item: any) => {
      item.clear();
    });
    setPageStatus('search');
    pageListRequest.run(page, query);
    //???????????????api
    refresh?.forEach((item: any) => {
      item.run();
    });
  };
  //???????????????
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
  //????????????
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
  //????????????
  const queryEntityRequest = useRequest(
    (id: number) => queryEntityApi(model, entity, id),
    {
      manual: true,
      onSuccess: (data: any) => {
        setEntityData(data);
        //?????????????????????
        extendData?.forEach((item: any) => {
          item.setData(data[item.key]);
          item.setDisable(nextStatus == 'view');
        });
        setPageStatus(nextStatus);
        setSubPageStatus('base');
      },
    },
  );
  //????????????
  const deleteEntityRequest = useRequest(
    (id: number) => deleteEntityApi(model, entity, id),
    {
      manual: true,
      onSuccess: (data: any) => {
        setSelectedRowKeys([]);
        setDeleteConfirmVisible(false);
        pageListRequest.run(page, query);
        //???????????????api
        refresh?.forEach((item: any) => {
          item.run();
        });
      },
    },
  );
  //??????????????????
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
  //??????????????????
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
  //????????????
  const pageChage = (current?: number, pageSize?: number) => {
    console.log(current, pageSize);
    let newPage: IPage = {
      current: current ? current : 1,
      pageSize: pageSize ? pageSize : default_pageSize,
    };
    pageListRequest.run(newPage, query);
  };
  //????????????
  const queryClick = () => {
    pageListRequest.run(page, query);
  };
  //????????????
  const addClick = () => {
    setEntityData({});
    //?????????????????????
    extendData?.forEach((item: any) => {
      item.clear();
      item.setDisable(false);
    });
    setPageStatus('add');
    setSubPageStatus('base');
  };
  //???????????????????????????
  const pageSubmitClick = (values: any) => {
    //?????????????????????
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
  //????????????????????????
  const openFirstPage = () => {
    setPageStatus('search');
  };
  //????????????
  const eidtClick = () => {
    nextStatus = 'edit';
    queryEntityRequest.run(selectedRowKeys[0]);
  };
  //??????????????????
  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  //????????????
  const deleteClick = () => {
    setDeleteConfirmVisible(true);
  };
  //????????????
  const deleteConfirm = () => {
    deleteEntityRequest.run(selectedRowKeys[0]);
  };
  //????????????
  const deleteCancle = () => {
    setDeleteConfirmVisible(false);
  };
  //????????????
  const viewClick = (id: number) => {
    nextStatus = 'view';
    queryEntityRequest.run(id);
  };
  // ======click function end======

  // ======render node start======
  //????????????style
  const getStyle = (item: IField) => {
    //???????????????????????????
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
    //??????????????????render
    if (style != undefined && style.display == false) {
      return;
    }
    //??????????????????????????????
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
    //??????????????????????????????
    if (pageStatus == 'view') {
      disable = true;
    }

    let content: any;

    //???????????????
    if (item.node) {
      content = item.node;
    }
    //???????????????
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

    //?????????
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
    //?????????
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
    //???
    else if (item.type == 'tree' && item.tree != undefined) {
      content = <FormTree disabled={disable} treeData={item.tree} />;
    }

    //markdown
    else if (item.type == 'markdown') {
      content = <Markdown />;
    }

    //????????????
    else if (item.type == 'number') {
      content = <InputNumber style={{ minWidth: 200 }} readOnly={disable} />;
    }
    //??????
    else if (item.type == 'password') {
      content = <Input.Password readOnly={disable} />;
    }
    //?????????
    else if (item.type == 'textarea') {
      content = <Input.TextArea rows={3} readOnly={disable} />;
    }
    //?????????????????????
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

    //????????????
    if (style != undefined && style.displayCondition != undefined) {
      const condition = style.displayCondition;
      //??????????????????
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

  //????????????
  let seachNodes = fields.map((item: IField) => {
    //???????????????????????????
    return formItem(item, getStyle(item));
  });

  //????????????
  let columns: any = new Array();
  let columnCount = 0;
  fields.forEach((item: IField) => {
    //???????????????????????????
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
        //????????????
        ellipsis: true,
        responsive: responsive,
        render: (text: any, record: any) => {
          //??????????????????
          if (item && item.select) {
            return item.select.map((option) => {
              if (option.code == text) {
                //????????????
                if (option.node) {
                  return <div key={record.id}> {option.node} </div>;
                }
                //????????????
                else if (option.color) {
                  return (
                    <Tag key={record.id} color={option.color}>
                      {option.name}
                    </Tag>
                  );
                }
                //???????????????
                else {
                  return option.name;
                }
              }
            });
          } else {
            //???????????????
            return text;
          }
        },
      });
    }
  });
  //??????????????????
  if (optionAuth.indexOf('query') > -1) {
    columns.push({
      title: '??????',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            size="small"
            shape="round"
            onClick={() => viewClick(record.id)}
          >
            ??????
          </Button>
        </Space>
      ),
    });
  }

  //????????????
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    defaultSelectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };

  //???????????????
  const fieldNodes = fields.map((item: IField) => {
    return formItem(item, getStyle(item));
  });

  //???????????????
  let subOptionNodes = (
    <Form.Item>
      <div className="cms-add-options">
        <FixRow>
          <Space>
            <Button key="2" shape="round" onClick={openFirstPage}>
              ??????
            </Button>
            <Button key="1" type="primary" htmlType="submit" shape="round">
              ??????
            </Button>
          </Space>
        </FixRow>
      </div>
    </Form.Item>
  );

  //??????
  let subTitle = '??????';

  if (pageStatus == 'edit') {
    subTitle = '??????';
  }
  if (pageStatus == 'view') {
    subTitle = '??????';
    subOptionNodes = (
      <Form.Item>
        <div className="cms-add-options">
          <FixRow>
            <Space>
              <Button key="1" shape="round" onClick={openFirstPage}>
                ??????
              </Button>
            </Space>
          </FixRow>
        </div>
      </Form.Item>
    );
  }

  //????????????
  const queryButton =
    optionAuth.indexOf('query') > -1 ? (
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          shape="round"
          onClick={queryClick}
        >
          ??????
        </Button>
        <Button
          shape="round"
          onClick={() => {
            setQuery({});
            setPage({ current: 1, pageSize: default_pageSize });
          }}
        >
          ??????
        </Button>
      </Space>
    ) : (
      ''
    );

  //????????????
  const addButtion =
    optionAuth.indexOf('add') > -1 && option.indexOf('add') > -1 ? (
      <Button
        type="primary"
        icon={<PlusOutlined />}
        shape="round"
        onClick={addClick}
      >
        ??????
      </Button>
    ) : (
      ''
    );

  //????????????
  const editButtion =
    optionAuth.indexOf('edit') > -1 && option.indexOf('edit') > -1 ? (
      <Button
        disabled={selectedRowKeys.length != 1}
        icon={<EditOutlined />}
        shape="round"
        onClick={eidtClick}
      >
        ??????
      </Button>
    ) : (
      ''
    );

  //????????????
  const deleteButtion =
    optionAuth.indexOf('delete') > -1 && option.indexOf('delete') > -1 ? (
      <Button
        disabled={selectedRowKeys.length != 1}
        danger
        icon={<DeleteOutlined />}
        shape="round"
        onClick={deleteClick}
      >
        ??????
      </Button>
    ) : (
      ''
    );

  //???????????????
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

  //?????????
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
              ??????
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
              ??????
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
          title="????????????"
          visible={deleteConfirmVisible}
          onOk={deleteConfirm}
          onCancel={deleteCancle}
          okButtonProps={{ danger: true }}
          okText="??????"
          cancelText="??????"
        >
          <Paragraph>
            <Text strong>??????????????????????????????</Text>
          </Paragraph>
          <Paragraph>
            ????????????
            <Text strong type="danger">
              ??????
            </Text>
            {selectedRowKeys.length}????????????
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
