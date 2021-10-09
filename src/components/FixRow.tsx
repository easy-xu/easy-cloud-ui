import { Row, Col } from 'antd';

const FixRow: React.FC<{ children?: any; size?: string }> = ({
  children,
  size,
}) => {
  if (size == 'large') {
    return (
      <Row>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 22, offset: 1 }}
          lg={{ span: 22, offset: 1 }}
          xl={{ span: 20, offset: 2 }}
        >
          {children}
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 20, offset: 2 }}
        lg={{ span: 20, offset: 2 }}
        xl={{ span: 18, offset: 3 }}
      >
        {children}
      </Col>
    </Row>
  );
};

export default FixRow;
