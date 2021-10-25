import React, { FC, useEffect, useState } from 'react';
import { IRouteComponentProps, useRequest } from 'umi';

import { Button, List, Typography } from 'antd';
import FixRow from '@/components/FixRow';

import Markdown from '@/components/Markdown';
import { baseQueryEntity } from '@/services/base';
import { Redirect } from 'umi';
import { knowledgeNodeWordCloud } from '@/services/knowledge';
import FixedWordCloud from '@/components/FixedWordCloud';
import Loading from '@/components/Loading';
const { Title, Paragraph, Text, Link } = Typography;

const Knowledge: FC<IRouteComponentProps> = ({
  children,
  location,
  route,
  history,
  match,
}) => {
  const dataId = location.query.id;
  //@ts-ignore
  if (dataId == undefined || dataId == '' || isNaN(dataId)) {
    return <Redirect to="/knowledge"></Redirect>;
  }

  const [status, setStatus] = useState('');

  const [markdown, setMarkdown] = useState<string>('');
  const knowledgeDataRequest = useRequest(
    //@ts-ignore
    () => baseQueryEntity('knowledge', 'node', Number.parseInt(dataId)),
    {
      manual: true,
      onSuccess: (data) => {
        if (data.markdown == undefined) {
          setStatus('wordcloud');
          WordCloudDataRequest.run(data.id);
        } else {
          setStatus('markdown');
          setMarkdown(data.markdown);
        }
      },
    },
  );

  const [data, setData] = useState([]);
  const WordCloudDataRequest = useRequest(
    (parentId) => knowledgeNodeWordCloud({ parentId: parentId }),
    {
      manual: true,
      onSuccess: (data) => {
        setData(data);
      },
    },
  );

  useEffect(() => {
    setData([]);
    setMarkdown('');
    setStatus('');
    knowledgeDataRequest.run();
  }, [dataId]);

  return (
    <FixRow>
      {status == 'markdown' ? (
        <Markdown disable={true} value={markdown} />
      ) : status == 'wordcloud' ? (
        <FixedWordCloud
          data={data}
          onClick={(item: any) => {
            history.push('/knowledge/detail?id=' + item.id);
          }}
        />
      ) : (
        <Loading />
      )}
    </FixRow>
  );
};
//@ts-ignore
Knowledge.title = '知识图谱';
export default Knowledge;
