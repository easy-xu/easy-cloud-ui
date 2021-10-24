import React, { FC, useEffect, useState } from 'react';
import { RadialTreeGraph, WordCloud } from '@ant-design/charts';
import { IRouteComponentProps, useRequest } from 'umi';
import {
  knowledgeNodeTree,
  knowledgeNodeWordCloud,
} from '@/services/knowledge';

const Knowledage: FC<IRouteComponentProps> = ({
  children,
  location,
  route,
  history,
  match,
}) => {
  const [data, setData] = useState([]);
  const WordCloudDataRequest = useRequest(() => knowledgeNodeWordCloud({}), {
    onSuccess: (data) => {
      setData(data);
    },
  });

  var config = {
    data: data,
    wordField: 'value',
    weightField: 'childCount',
    color: '#122c6a',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [24, 80],
      rotation: 0,
    },
    random: function random() {
      return 0.5;
    },
    interactions: [{ type: 'element-active' }],
    state: { active: { style: { lineWidth: 3 } } },
  };

  return (
    //@ts-ignore
    <WordCloud
      {...config}
      onReady={(plot) => {
        plot.on('plot:click', (evt: any) => {
          const { x, y } = evt;
          const { wordField } = plot.options;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
          if (tooltipData.length == 1) {
            history.push(
              '/knowledge/detail?id=' + tooltipData[0].data.datum.id,
            );
          }
        });
      }}
    />
  );
};

export default Knowledage;
