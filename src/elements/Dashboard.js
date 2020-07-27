import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import jwt_decode from 'jwt-decode'
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: ""
    };
  }


  componentDidMount(){
    const token = localStorage.userToken;
    const decodedData = jwt_decode(token);
    this.setState({
      email: decodedData.email,
      firstName: decodedData.firstName
    })
  }
  getData = async (name) => {
    const response = await fetch(`/api/articles/${name}`);
    const email = await response.json();
    this.setState(
      { _id: email._id, comments: email.comments, upvotes: email.upvotes },
      () => console.log(this.state)
    );
  };
  render() {
    return (
      <div>
        <h1> Hi {this.state.firstName}, Welcome back!</h1>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Home">
            <h1>Tab 1</h1>
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <h1>Tab 2</h1>
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            <h1>Tab 3</h1>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
