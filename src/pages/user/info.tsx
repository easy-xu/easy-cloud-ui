import { FC, useState } from 'react';
import { useRequest, history, useModel } from 'umi';

import {
  Card,
  Statistic,
  Row,
  Col,
  Collapse,
  Descriptions,
  Divider,
  Typography,
} from 'antd';
const { Panel } = Collapse;
const { Item } = Descriptions;
const { Title, Paragraph, Text, Link } = Typography;

import FixRow from '@/components/FixRow';
import Loading from '@/components/Loading';

let i = 1;

const UserInfo: FC = (props: any) => {
  const { user, logout } = useModel('user', (model) => ({
    user: model.user,
    logout: model.logout,
  }));

  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      <Card>
        <div className="div-head">
          <h1>{user.nickname}</h1>
        </div>
        <div className="div-result">
          <FixRow>
            <div>
              {' '}
              <Descriptions title="User Info">
                {Object.keys(user).map((key, index: number) => {
                  console.log(key, Object.values(user)[index]);
                  return (
                    <Descriptions.Item key={index} label={key}>
                      <Paragraph copyable>
                        {Object.values(user)[index] + ''}
                      </Paragraph>
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </div>
          </FixRow>
        </div>
      </Card>
    </div>
  );
};

export default UserInfo;
