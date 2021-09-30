import { Row, Col } from 'antd';

const FixRow: React.FC<{ children?: any }> = ({ children }) => {
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
