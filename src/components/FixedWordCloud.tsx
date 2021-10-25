import { WordCloud } from '@ant-design/charts';
import { FC } from 'react';

const FixedWordCloud: FC<{ data: any[]; onClick: (item: any) => void }> = ({
  data,
  onClick,
}) => {
  var config = {
    data: data,
    wordField: 'name',
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
      onReady={(plot: any) => {
        plot.on('plot:click', (evt: any) => {
          const { x, y } = evt;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
          if (tooltipData.length == 1) {
            onClick(tooltipData[0].data.datum);
          }
        });
      }}
    />
  );
};

export default FixedWordCloud;
