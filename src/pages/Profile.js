import React from 'react'
import jwt_decode from 'jwt-decode'
import {Container, Jumbotron} from 'react-bootstrap'
class Profile extends React.Component{
    constructor(){
        super()
        this.state = {
            firtName: '',
            lastName: '',
            email: '',
        }
    }


    componentDidMount(){
        console.log(localStorage)
        const token = localStorage.userToken;
        const decoded = jwt_decode(token);
        this.setState({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,

        })
        
    }

    render(){
        return(
            <Container>
                <Jumbotron>
                    <h1> Profile</h1>
                    <br/>
                    <h3>First Name: {this.state.firstName}</h3>
                    <h3>Last Name: {this.state.lastName}</h3>
                    <h3>Email: {this.state.email}</h3>
                </Jumbotron>
            </Container>
        )
    }
}

export default Profile;