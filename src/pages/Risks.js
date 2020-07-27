import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CreateRisk from "../components/risk_components/createRisk";
import RiskAssesment from "../components/risk_components/RiskAssesment";
import Project from '../components/project_components/Project'
import "../css/risk.css";


class Risks extends React.Component {
    constructor(){
      super()
      this.state = {
        projectID: '',
        projectSelected: false
      }
      this.updateProjectID = this.updateProjectID.bind(this)
    }

    updateProjectID(id){
      this.setState({projectID: id, projectSelected: true})
    }


  render() {
    return (
      <div>
        <Container className="containerLayout" fluid>
          <Row style={{margin:10}}>
          <Col>
            {this.state.projectSelected ? <div><h1>ProjectID: {this.state.projectID} has been selected</h1></div> : <Project updateSelected = {this.updateProjectID} />}
          </Col>
          </Row>
            {this.state.projectSelected ? <>
              <Row style={{margin:10}}>
              <Col>
              <CreateRisk />
            </Col>
          </Row>
          <Row style={{margin:10}}>
          <Col>
              <RiskAssesment />
            </Col>
          </Row> </>: <></>}
        </Container>
      </div>
    );
  }
}

export default Risks;
