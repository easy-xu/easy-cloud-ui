import React, { FC, useEffect, useState } from 'react';
import { IRouteComponentProps, useRequest } from 'umi';
import { knowledgeNodeWordCloud } from '@/services/knowledge';
import FixedWordCloud from '@/components/FixedWordCloud';

const Knowledge: FC<IRouteComponentProps> = ({
  children,
  location,
  route,
  history,
  match,
}) => {
  const [data, setData] = useState([]);
  const WordCloudDataRequest = useRequest(() => knowledgeNodeWordCloud({}), {
    manual: true,
    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    WordCloudDataRequest.run();
  }, []);

  return (
    <FixedWordCloud
      data={data}
      onClick={(item: any) => {
        history.push('/knowledge/detail?id=' + item.id);
      }}
    />
  );
};

//@ts-ignore
Knowledge.title = '知识图谱';
export default Knowledge;
