import React, { FC, useState } from 'react';
import { List, Card, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link, useRequest } from 'umi';
const { Meta } = Card;

import './list.less';
import { pageListQuestionnaire } from '@/services/questionnaire';

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
                  <Link to="/questionnaire/detail?id=1">{item.title}</Link>
                }
                description="This is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the description"
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CardList;
