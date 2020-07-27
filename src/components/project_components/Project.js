import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import SelectProject from "./SelectProject";

class Project extends React.Component {
  render() {
    return (
      <div>
        <Tabs  defaultActiveKey="create" id="uncontrolled-tab-example">
          <Tab eventKey="create" title="Create Project">
            <ProjectForm updateSelected = {this.props.updateSelected}/>
          </Tab>
          <Tab eventKey="select" title="Select Project">
            <SelectProject updateSelected = {this.props.updateSelected}/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Project;
