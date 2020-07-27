import React from "react";
import Navbar from './elements/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Documents from './pages/Documents'
import Risks from './pages/Risks'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'



class App extends React.Component {
  
  render(){
    const LoggedInUrl = (
    <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/documents" component={Documents} exact />
            <Route path="/risks" component={Risks} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/profile" component={Profile} exact />
            <Route component={NotFoundPage} />
          </Switch>
  )
  const loggedOut = (
    <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route component={Login} />
        </Switch>
  )
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div id="page-body">
          {localStorage.userToken ? LoggedInUrl : loggedOut}
        </div>
      </div>
    </Router>
  );
}
}



export default App;
