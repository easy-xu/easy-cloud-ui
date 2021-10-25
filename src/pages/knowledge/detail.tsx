import React, { FC, useEffect, useState } from 'react';
import { IRouteComponentProps, useRequest } from 'umi';

import { Button, List, Typography } from 'antd';
import FixRow from '@/components/FixRow';

import Markdown from '@/components/Markdown';
import { baseQueryEntity } from '@/services/base';
import { Redirect } from 'umi';
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

  const [markdown, setMarkdown] = useState<string>('');
  const knowledgeDataRequest = useRequest(
    //@ts-ignore
    () => baseQueryEntity('knowledge', 'node', Number.parseInt(dataId)),
    {
      manual: true,
      onSuccess: (data) => {
        setMarkdown(data.markdown);
      },
    },
  );

  useEffect(() => {
    knowledgeDataRequest.run();
  }, [dataId]);

  return (
    <FixRow>
      <Markdown disable={true} value={markdown} />
    </FixRow>
  );
};

export default Knowledge;
