import React, { FC, useEffect, useState } from 'react';
import { RadialTreeGraph, WordCloud } from '@ant-design/charts';
import { IRouteComponentProps, useRequest } from 'umi';
import {
  knowledgeNodeSave,
  knowledgeNodeTree,
  knowledgeNodeWordCloud,
} from '@/services/knowledge';
import { Button, List, Typography } from 'antd';
import FixRow from '@/components/FixRow';
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
  ControlOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
//import '../../assets/github.css'
import '../reset.less';

const Knowledge: FC<IRouteComponentProps> = ({
  children,
  location,
  route,
  history,
  match,
}) => {
  const dataId = location.query.id;

  const [data, setData] = useState([]);
  const knowledgeDataRequest = useRequest(
    () => knowledgeNodeWordCloud({ parentId: dataId }),
    {
      manual: true,
      onSuccess: (data) => {
        setData(data);
      },
    },
  );

  const saveKnowledgeRequest = useRequest(
    (params) => knowledgeNodeSave(params),
    {
      manual: true,
      onSuccess: (data) => {
        knowledgeDataRequest.run();
      },
    },
  );

  useEffect(() => {
    knowledgeDataRequest.run();
  }, []);

  const setEditableStr = (id: any, value: string) => {
    console.log(id, value);
    saveKnowledgeRequest.run({ id: id, value: value });
  };

  const getNode = (item: any) => {
    console.log(item);
    return item.type == 'T' ? (
      <Title
        key={item.id}
        level={5}
        editable={{ onChange: (value) => setEditableStr(item.id, value) }}
      >
        {item.value}
      </Title>
    ) : (
      <Paragraph
        key={item.id}
        editable={{ onChange: (valeu) => setEditableStr(item.id, valeu) }}
      >
        {item.value}
      </Paragraph>
    );
  };

  const nodes = (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item extra={<DeleteOutlined></DeleteOutlined>}>
          {getNode(item)}
        </List.Item>
      )}
    />
  );

  const markdown = `

# 一级标题
## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

> 区块



| 表头1    |   表头2   |     表头3 |
| :------- | :-------: | --------: |
| muggledy | celestezj | 2021.9.25 |
|          |           |           |
|          |           |           |
|          |           |           |`;

  return (
    <div className="div-mk">
      <FixRow>
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
      </FixRow>
    </div>
  );
};

export default Knowledge;
