import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class HomePage extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    this.props.history.push("/login");
  }

  render() {
    const loginRegLink = (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">RiskManagement</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar>
    )
    const loggedIn = (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">RiskManagement</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/risks">Risks</Nav.Link>
          <Nav.Link href="/tasks">Tasks</Nav.Link>
          <Nav.Link href="/reports">Reports</Nav.Link>
          <Nav.Link href="/documents">Documents</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
          <Button variant="outline-info">
            <Nav.Link href="" onClick={this.logout}>
              logout
            </Nav.Link>
          </Button>
        </Form>
      </Navbar>
    )
    return <>{localStorage.userToken ? loggedIn : loginRegLink}</>;
  }
}

export default withRouter(HomePage);
