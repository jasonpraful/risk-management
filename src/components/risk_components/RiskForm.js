import React from "react";
import { Form, Col, Button, Modal } from "react-bootstrap";
import {createRisk} from '../UserFunctions'
import jwt_decode from 'jwt-decode'


class RiskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      riskName: "",
      riskCategory: "",
      riskDefinition: "",
      riskEffect: "",
      modalVal: false,
      success: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose() {
    this.setState({ modalVal: false });
  }
  handleShow() {
    this.setState({ modalVal: true });
  }

  onChange(e) {
    console.log([e.target.name] +":"+ e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    //check if risk exists
    e.preventDefault();
    const token = localStorage.userToken;
    const decoded = jwt_decode(token);
    const risk = {
      riskName: this.state.riskName,
      riskCategory: this.state.riskCategory,
      riskDefinition: this.state.riskDefinition,
      riskEffect: this.state.riskEffect,
      createdBy: decoded.email,
    };
    createRisk(risk).then((res) => {
      console.log(res);
      if (res !== 409) {
        //this.props.updateSelected(this.state.riskName, true);
        this.setState({ success: true });
        this.handleShow();
      } else {
        this.setState({ success: false });
        this.handleShow();
      }
    });
  }

  render() {
    const createSuccess = (
      <>
        <Modal show={this.state.modalVal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Risk Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Risk {this.state.riskName} has been created successfully!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
    const createFailed = (
      <>
        <Modal show={this.state.modalVal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Risk already exists</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Risk Name {this.state.riskName} already exists! Please select from
            the "Select Risk" tab
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

    /* <Form.Row>
            <Form.Group as={Col} controlId="formUploadDoc">
              <Form.File id="custom-file" label="Reference Documents" />
              <Form.File id="custom-file" label="Linked Documents" />
            </Form.Group>
          </Form.Row> */

    return (
      <>
        {this.state.success ? createSuccess : createFailed}
        <Form>
          <Form.Row>
            <Form.Row>
              <Col>
                <Form.Group as={Col} controlId="formRiskName">
                  <Form.Label>Risk Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="riskName"
                    onChange={this.onChange}
                    placeholder="Enter Risk Name"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formRiskCategory">
                  <Form.Label>Risk Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="riskCategory"
                    onChange={this.onChange}
                  >
                    <option>Contractual</option>
                    <option>Commercial</option>
                    <option>Strategic</option>
                    <option>Presales</option>
                    <option>Health and Safety</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formRiskCategory">
                  <Form.Label>Gate Identification</Form.Label>
                  <Form.Control
                    as="select"
                    name="riskGate"
                    onChange={this.onChange}
                  >
                    <option>Gate 1</option>
                    <option>Gate 2</option>
                    <option>Gate 3</option>
                    <option>Gate 4</option>
                    <option>Gate 5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group as={Col} controlId="formRiskDescription">
              <Form.Label>Risk Definition</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Enter Risk Definition"
                name="riskDefinition"
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formRiskEffect">
              <Form.Label>Risk Effect</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Enter Risk Effect"
                name="riskEffect"
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="danger" type="submit">
            Add Risk
          </Button>
        </Form>
      </>
    );
  }
}

export default RiskForm;
