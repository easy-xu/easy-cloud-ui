import React, { FC, useState } from 'react';
import { List, Card, Avatar, Typography, Image } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link, useRequest } from 'umi';
import { pageListQuestionnaire } from '@/services/questionnaire';
import FixRow from '@/components/FixRow';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const QuestionnaireList: FC = () => {
  //查询列表
  const [page, setPage] = useState<any>({ current: 1 });

  const [records, setRecords] = useState<any>([]);

  const pageListQuestionnaireRequest = useRequest(
    () => pageListQuestionnaire(page),
    {
      onSuccess: (data) => {
        console.log(data);
        setRecords(data.records);
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
          xxl: 5,
        }}
        dataSource={records}
        renderItem={(item: any) => (
          <List.Item>
            <Card
              style={{ width: '280px', margin: 'auto' }}
              cover={
                <div
                  style={{ width: '280px', height: '280px', margin: 'auto' }}
                >
                  <Image
                    preview={false}
                    width="100%"
                    height="100%"
                    alt={item.title}
                    src={item.showImage}
                  />
                </div>
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
//@ts-ignore
QuestionnaireList.title = '问卷列表';
export default QuestionnaireList;
