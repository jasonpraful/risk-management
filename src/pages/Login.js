import React from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { login } from "../components/UserFunctions";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors:{},
      failed: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }



  handleClose(){
    this.setState({failed: false})

  }
  handleShow(){
    this.setState({failed: true})

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault()
    const user = {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
    };
    login(user).then((res) => {
      if (res !== 403) {
        this.props.history.push("/");
        window.location.reload();
      }else{
          console.log("Unauthorised")
          this.setState({failed: true})
      }
    });
  }
  render() {
    const loginFailed = ( <>

<Modal show={this.state.failed} onHide={this.handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Login Failed</Modal.Title>
  </Modal.Header>
  <Modal.Body>Login Failed<br/> Kindly recheck your credentials!</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={this.handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal></>
)
    return (
      <Container>
      {loginFailed}
        <Form onSubmit = {this.onSubmit}>
          <Form.Group noValidate controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" onChange = {this.onChange} value={this.state.email} placeholder="Enter email" required/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" onChange = {this.onChange} value={this.state.password} placeholder="Password" required/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}


export default Login;
