import React, { FC, useState } from 'react';
import { List, Card, Avatar, Typography } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link, useRequest } from 'umi';
import { pageListQuestionnaire } from '@/services/questionnaire';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const CardList: FC = () => {
  //查询列表
  const [page, setPage] = useState<any>({ current: 1 });

  const [records, setRecords] = useState<any>([]);

  const pageListQuestionnaireRequest = useRequest(
    () => pageListQuestionnaire(page),
    {
      onSuccess: (data) => {
        console.log(data);
        setRecords(data.page.records);
      },
    },
  );

  return (
    <div>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 6,
        }}
        dataSource={records}
        renderItem={(item: any) => (
          <List.Item>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <MessageOutlined key="setting" />,
                <StarOutlined key="edit" />,
                <LikeOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <Link to={'/questionnaire/detail?id=' + item.id}>
                    {item.title}
                  </Link>
                }
                description={
                  <Paragraph
                    ellipsis={{ rows: 3, expandable: false, symbol: '...' }}
                  >
                    {item.shortDesc}
                  </Paragraph>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CardList;
