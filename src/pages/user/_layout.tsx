import React, { FC } from 'react';
import { IRouteComponentProps, useModel } from 'umi';
import { Layout } from 'antd';

const { Header } = Layout;
import FixRow from '@/components/FixRow';
import CustHeader from '@/components/CustHeader';
import Loading from '@/components/Loading';

const PageLayout: FC<IRouteComponentProps> = ({
  children,
  location,
  route,
  history,
  match,
}) => {
  return (
    <Layout className="layout">
      <Header>
        <CustHeader />
      </Header>
      <Layout>
        <div className="div-main">
          <FixRow>{children}</FixRow>;
        </div>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
