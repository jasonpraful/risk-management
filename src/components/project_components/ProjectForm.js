import React from "react";
import { Form, Col, Button, Modal } from "react-bootstrap";
import { createProject } from "../UserFunctions";
import jwt_decode from 'jwt-decode'




class ProjectForm extends React.Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectID: "",
      pmEmail: "",
      additionalInfo: "",
      modalVal: false,
      success: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }




  handleClose(){
    this.setState({modalVal: false})

  }
  handleShow(){
    this.setState({modalVal: true})

  }
 



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    //check if project exists
    e.preventDefault();
    const token = localStorage.userToken;
    const decoded = jwt_decode(token)
    const project = {
      projectName: this.state.projectName,
      projectID: this.state.projectID,
      pmEmail: this.state.pmEmail,
      additionalInfo: this.state.additionalInfo,
      createdBy : decoded.email,
    };
    createProject(project).then((res) => {
      console.log(res)
      if (res !== 409) {
        this.props.updateSelected(this.state.projectID, true);
        this.setState({success: true})
        this.handleShow();

      }else{
        this.setState({success: false})
        this.handleShow();

      }
    });
    // if not post and select this project
  }

  render() {

    const createSuccess = ( <>

      <Modal show={this.state.modalVal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Project {this.state.projectName} has been created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal></>
      )
    const createFailed = ( <>

      <Modal show={this.state.modalVal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project already exists</Modal.Title>
        </Modal.Header>
        <Modal.Body>Project ID {this.state.projectID} already exists! Please select from the "Select Project" tab</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal></>
      )
  

    return (<>
    {this.state.success ? createSuccess: createFailed}
      <Form onSubmit={this.onSubmit}>
        <Form.Row>
          <Col>
            <Form.Group as={Col} controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                onChange={this.onChange}
                placeholder="Enter Project Name"
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formProjectId">
              <Form.Label>Project ID</Form.Label>
              <Form.Control
                type="text"
                name="projectID"
                onChange={this.onChange}
                placeholder="Enter Project ID"
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group as={Col} controlId="formPM">
              <Form.Label>Project Manager</Form.Label>
              <Form.Control
                type="email"
                name="pmEmail"
                onChange={this.onChange}
                placeholder="Enter PM Email"
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formAddInfo">
              <Form.Label>Additional Info</Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                placeholder="Enter Risk Effect"
                name="additionalInfo"
                onChange={this.onChange}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Button variant="danger" type="submit">
          Create Project
        </Button>
      </Form>
      </>
    );
  }
}

export default ProjectForm;
