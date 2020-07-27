import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dashboard from '../elements/Dashboard'
import "../css/index.css";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Container  style={{margin:20}} fluid>
          <Row className='containerLayout'>
            <Col><Dashboard /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
