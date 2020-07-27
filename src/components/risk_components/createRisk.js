import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import RiskForm from "./RiskForm";
import UpdateRisk from "./UpdateRisk";

class CreateRisk extends React.Component {


  render() {
    return (
      <div>
        <Tabs  defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Create Risk">
            <RiskForm />
          </Tab>
          <Tab eventKey="update" title="Update Risk/Assesment">
            <UpdateRisk />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default CreateRisk;
