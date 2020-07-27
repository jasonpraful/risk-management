import React from "react";
import { Tabs, Tab, Toast } from "react-bootstrap";
import RiskAssesmentForm from "./RiskAssesmentForm";
import Table from "../../elements/Table";

class RiskAssesment extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      existingRisks: [{
          date : "28/05/2020",
          rname : "abc",
          likelihood : "High",
          consequence: "Medium",
          controlstrategy : "",
          fincon: 0,
          cstratDate : "22/05/2020",
          tblval: "",
      }],
    };
    this.setShow = this.setShow.bind(this);
    this.addRiskAssesmentForm = this.addRiskAssesmentForm.bind(this);
  }
  setShow(key, show) {
    if (key === "addAssesment") {
      this.setState({ show: show });
    }
  }

  addRiskAssesmentForm(date, rname, likelihood, consequence,controlstrategy, fincon,cstratDate, tblval ){
    console.log("works")
    this.setState({existingRisks:[...this.state.existingRisks,{date,rname,likelihood,consequence, controlstrategy, fincon, cstratDate, tblval }]})
  }
  render() {
    const columns = [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Risk Name",
        accessor: "rname",
      },
      {
        Header: "Likelihood",
        accessor: "likelihood",
      },
      {
        Header: "Consequence",
        accessor: "consequence",
      },
      {
        Header: "Control Strategy",
        accessor: "controlstrategy",
      },
      {
        Header: "Financial Consequence",
        accessor: "fincon",
      },
    ];
    return (
      <div>
        <Toast
          onClose={() => this.setShow("addAssesment",false)}
          show={this.state.show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Notification</strong>

          </Toast.Header>
          <Toast.Body>You have added a new assesment to this risk!</Toast.Body>
        </Toast>
        <Tabs
          defaultActiveKey="rform"
          id="uncontrolled-tab-example"
          onSelect={(k) => this.setShow(k, true)}
        >
          <Tab eventKey="rform" title="Create Risk Assesment">
            <RiskAssesmentForm  addRiskAssesment = {this.addRiskAssesmentForm}  />
            
          </Tab>
          <Tab eventKey="associateRisk" title="Associate Risk">
            <RiskAssesmentForm />

          </Tab>
          
        </Tabs>
        <Tabs
          defaultActiveKey="riskhist"
          activeKey="riskhist"
          id="uncontrolled-tab-example"
          onSelect={(k) => this.setShow(k, true)}
        >
          <Tab eventKey="riskhist" title="Risk Assesment History">
            <Table data={this.state.existingRisks}  columns = {columns}/>
          </Tab>
        </Tabs>
        
      </div>
    );
  }
}

export default RiskAssesment;
