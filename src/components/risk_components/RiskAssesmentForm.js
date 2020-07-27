import React from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import "../../css/riskassesment.css";
import Moment from 'moment'

const PrettoSlider = withStyles({
  root: {
    color: "blue",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

class RiskAssesmentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      riskName: "",
      likelihood: "Rare",
      consequence: "Very Low",
      col:"",
      formValidated: false
    };
    this.valuetext = this.valuetext.bind(this);
    this.updateLikelihood = this.updateLikelihood.bind(this);
    this.updateConsequence = this.updateConsequence.bind(this);
    this.updateGridCol = this.updateGridCol.bind(this);
    this.formEvent = this.formEvent.bind(this);
  }

  valuetext(value) {
    if (value > 0 && value < 20) {
      return `Rare ${value}`;
    } else if (value > 20 && value <= 40) {
      return `Unlikely ${value}`;
    } else if (value > 40 && value <= 60) {
      return `Possible ${value}`;
    } else if (value > 60 && value <= 80) {
      return `Probable ${value}`;
    } else if (value > 80 && value <= 1000) {
      return `Highly Probable ${value}`;
    }
  }

  updateLikelihood(value) {
    if (value > 0 && value < 20) {
      this.setState({ likelihood: "Rare" });
      this.updateGridCol();

    } else if (value > 20 && value <= 40) {
      this.setState({ likelihood: "Unlikely" });
      this.updateGridCol();

    } else if (value > 40 && value <= 60) {
      this.setState({ likelihood: "Possible" });
      this.updateGridCol();
    } else if (value > 60 && value <= 80) {
      this.setState({ likelihood: "Probable" });
      this.updateGridCol();
    } else if (value > 80 && value <= 1000) {
      this.setState({ likelihood: "Highly Probable" });
      this.updateGridCol();

    }
  }
  updateConsequence(value) {
    if (value > 0 && value < 20) {
      this.setState({ consequence: "Very Low" });
      this.updateGridCol();
    } else if (value > 20 && value <= 40) {
      this.setState({ consequence: "Low" });
      this.updateGridCol();
    } else if (value > 40 && value <= 60) {
      this.setState({ consequence: "Medium" });
      this.updateGridCol();
    } else if (value > 60 && value <= 80) {
      this.setState({ consequence: "High" });
      this.updateGridCol();
    } else if (value > 80 && value <= 100) {
      this.setState({ consequence: "Very High" });
      this.updateGridCol();
    }
  }
  updateGridCol(){
      let col = "";
      switch(this.state.likelihood){
        case 'Rare':
            col = col+'r';
            break;
        case 'Unlikely':
            col = col+'u'
            break;
        case 'Possible':
            col = col+'po'
            break;
        case 'Probable':
            col = col+'p'
            break;
        case 'Highly Probable':
            col = col+'h'
            break;
        default:
            col = col+''
      }
        switch(this.state.consequence){
        case 'Very Low':
            col = col+'vl';
            break;
        case 'Low':
            col = col+'l'
            break;
        case 'Medium':
            col = col+'m'
            break;
        case 'High':
            col = col+'h'
            break;
        case 'Very High':
            col = col+'vh'
            break;
        default:
            col = col+''
        }
        console.log("COlor: "+col);
      this.setState({col: col});
      }
     

    formEvent(event, riskAssesment){
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        console.log(event);

        event.preventDefault();
        event.stopPropagation();
        }else{
            let now = Moment();
        now = now.format("L");
        console.log(now,this.state.riskName,this.state.likelihood,this.state.consequence,
            event.target.cstrategy.value, event.target.fincon.value,event.target.cstratdate.value,this.state.col);
        this.props.addRiskAssesment(now,this.state.riskName,this.state.likelihood,this.state.consequence,
            event.target.cstrategy.value, event.target.fincon.value,event.target.cstratdate.value,this.state.col);
        this.setState({formValidated: true});
        event.preventDefault();
        }
        


    }
    //addRiskAssesment(date, rname, likelihood, consequence,controlstrategy, fincon,cstratDate, tblval ){
//


      //Adding to table & pushing to sql

//return this.props.addRiskAssesment(now,this.state.riskName,this.state.likelihood,this.state.consequence,"asd", 12,"2020-20'12","uvl")}}

  render() {

    return (
        <div>
      <Form noValidate validated={this.state.formValidated} onSubmit={(e) => {this.formEvent(e)}}>
      
        <Form.Row>
          <Col>
            <Form.Group as={Col} controlId="formRiskDescription">
              <Form.Label>Control Strategy</Form.Label>
              <Form.Control
              required
                as="textarea"
                name="cstrategy"
                rows="5"
                placeholder="Enter Risk Control Strategy"
              />
              <Form.Control.Feedback type="invalid">
              Please enter a control strategy.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formRiskDescription">
              <Form.Label>Estimated Date of Completion</Form.Label>
              <Form.Control
                type="date"
                name="cstratdate"
                placeholder="Enter Risk Control Strategy"
                required
              />
              <Form.Control.Feedback type="invalid">
              Please select a control strategy date.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="formRiskEffect">
              <Form.Label>Estimated Financial Consequence</Form.Label>
              <Form.Control name="fincon" type="number" placeholder="Enter Risk Effect"  required />
              <Form.Control.Feedback type="invalid">
              Please enter financial consequence.
            </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Container className="riskAssesmentContainder" fluid="lg">
            <Row className="rowLayout" md={10}>
                <Col className="gridTitle">Highly Probable</Col>
                <Col className="columnLayout" style={ this.state.col==="hvl"? {backgroundColor:"yellow" }:{}}>5<br />Moderate</Col>
                <Col className="columnLayout" style={ this.state.col==="hl"? {backgroundColor:"orange" }:{}} >10<br />Major</Col>
                <Col className="columnLayout" style={ this.state.col==="hm"? {backgroundColor:"orange" }:{}}>15<br />Major</Col>
                <Col className="columnLayout" style={ this.state.col==="hh"? {backgroundColor:"red" }:{}}>20<br />Severe</Col>
                <Col className="columnLayout" style={ this.state.col==="hvh"? {backgroundColor:"red" }:{}}>25<br />Severe</Col>
              </Row>
              <Row className="rowLayout" md={10}>
                <Col className="gridTitle">Probable</Col>
                <Col className="columnLayout" style={ this.state.col==="pvl"? {backgroundColor:"yellow" }:{}} > 4<br /> Moderate</Col>
                <Col className="columnLayout" style={ this.state.col==="pl"? {backgroundColor:"yellow" }:{}} >8<br />Moderate</Col>
                <Col className="columnLayout" style={ this.state.col==="pm"? {backgroundColor:"orange" }:{}} >12 <br /> Major</Col>
                <Col className="columnLayout" style={ this.state.col==="ph"? {backgroundColor:"orange" }:{}} >16<br />Major</Col>
                <Col className="columnLayout" style={ this.state.col==="pvh"? {backgroundColor:"red" }:{}} > 20<br />Severe</Col>
              </Row>
              <Row className="rowLayout" md={10}>
                <Col className="gridTitle">Possible</Col>
                <Col className="columnLayout" style={ this.state.col==="povl"? {backgroundColor:"green" }:{}}>3<br /> Minor</Col>
                <Col className="columnLayout" style={ this.state.col==="pol"? {backgroundColor:"yellow" }:{}}>6<br /> Moderate </Col>
                <Col className="columnLayout" style={ this.state.col==="pom"? {backgroundColor:"yellow" }:{}}> 9<br />Moderate</Col>
                <Col className="columnLayout" style={ this.state.col==="poh"? {backgroundColor:"orange" }:{}}>12 <br />Major</Col>
                <Col className="columnLayout" style={ this.state.col==="povh"? {backgroundColor:"orange" }:{}}>15 <br />Major</Col>
              </Row>
              <Row className="rowLayout" md={10}>
                <Col className="gridTitle">Unlikely</Col>
                <Col className="columnLayout" style={ this.state.col==="uvl"? {backgroundColor:"green" }:{}}> 2<br />Minor</Col>
                <Col className="columnLayout" style={ this.state.col==="ul"? {backgroundColor:"yellow" }:{}}>4<br />Moderate</Col>
                <Col className="columnLayout" style={ this.state.col==="um"? {backgroundColor:"yellow" }:{}}> 6<br /> Moderate </Col>
                <Col className="columnLayout" style={ this.state.col==="uh"? {backgroundColor:"yellow" }:{}}> 8<br />Moderate</Col>
                <Col className="columnLayout" style={ this.state.col==="uvh"? {backgroundColor:"orange" }:{}}>10<br /> Major </Col>
              </Row>
              <Row className="rowLayout" md={10}>
                <Col className="gridTitle">Rare</Col>
                <Col className="columnLayout" style={ this.state.col==="rvl"? {backgroundColor:"green" }:{}}>1<br />Minor</Col>
                <Col className="columnLayout" style={ this.state.col==="rl"? {backgroundColor:"green" }:{}}> 2<br /> Minor</Col>
                <Col className="columnLayout" style={ this.state.col==="rm"? {backgroundColor:"green" }:{}}>3<br />Minor </Col>
                <Col className="columnLayout" style={ this.state.col==="rh"? {backgroundColor:"yellow" }:{}}>4<br />Moderate</Col>
                <Col className="columnLayout" style={ this.state.col==="rvh"? {backgroundColor:"yellow" }:{}}>5<br />Moderate</Col>
              </Row>
              <Row className="rowLayout" md={10}>
                <Col></Col>
                <Col className="gridTitle">Very Low</Col>
                <Col className="gridTitle">Low</Col>
                <Col className="gridTitle">Medium</Col>
                <Col className="gridTitle">High</Col>
                <Col className="gridTitle">Very High</Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <Form.Group as={Col} controlId="formRiskEffect">
              <Form.Label>Likelihood</Form.Label>
              <PrettoSlider
                defaultValue={0}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="on"
                onChange={(e, v) => {
                  this.updateLikelihood(v);
                }}
              />
              <p className="labelAlign">{this.state.likelihood}</p>
            </Form.Group>
            <Form.Group as={Col} controlId="formRiskEffect">
              <Form.Label>Consequence</Form.Label>
              <PrettoSlider
                defaultValue={0}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="on"
                onChange={(e, v) => {
                  this.updateConsequence(v);
                }}
              />
              <p className="labelAlign">{this.state.consequence}</p>
            </Form.Group>
            <Button variant="success"  type = "submit" size="lg" block>
                Add Risk Assesment
            </Button>
          </Col>
        </Form.Row>
      </Form>
      </div>
    );
  }
}

export default RiskAssesmentForm;
