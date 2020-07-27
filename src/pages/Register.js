import React from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { register } from "../components/UserFunctions";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      failed: false,
      exists: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }


  handleClose(){
    this.setState({failed: false})

  }
  handleSuccess(){
    this.props.history.push("/login")
    this.setState({failed: false})

  }
  handleShow(){
    this.setState({failed: true})

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email.toLowerCase(),
      password: this.state.password,
    };
    register(user).then((res) => {
      if (res.status === 200) {
        this.setState({failed: true, exists: false})
        
      }else{
          console.log("Unauthorised")
          this.setState({failed: true, exists: true})
      }
    });
  }
  render() {
    const createSuccess = ( <>

<Modal show={this.state.failed} onHide={this.handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Success</Modal.Title>
  </Modal.Header>
  <Modal.Body>Account has been created successfully</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={this.handleSuccess}>
      Continue
    </Button>
  </Modal.Footer>
</Modal></>
)
const userExists = ( <>

<Modal show={this.state.failed} onHide={this.handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Failed</Modal.Title>
  </Modal.Header>
  <Modal.Body>User already exists</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={this.handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal></>
)


    return (
      <Container>
        {this.state.exists ? userExists : createSuccess}
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.onChange}
              value={this.state.firstName}
              name="firstName" 
              placeholder="Enter First Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.onChange}
              value={this.state.lastName}
              name="lastName" 
              placeholder="Enter Last Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={this.onChange}
              value={this.state.email}
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.onChange}
              value={this.state.password}
              name="password" 
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Register;
