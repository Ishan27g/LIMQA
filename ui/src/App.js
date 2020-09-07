import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import Home from './components/Home/Home.js';
import ManagePage from './components/ManagePage/ManagePage.js';

class App extends Component{
  constructor(props){
    super(props);
    this.state ={
        loginButton: false,
        login: false
    }
}

  handleSignClose = () => {
      this.setState({ loginButton: false });
  }

  handleSignShow = () => {
    this.setState({ loginButton: true });
  }

  handleSignin = () => {
    this.setState({ login: true });
    this.setState({ loginButton: false });
  }
  
  render(){
    return (
      <div>
        <header>
          <Navbar bg="light" expand="lg" fixed="top" >
            <Navbar.Brand href="/">Home icon</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">About me</Nav.Link>
                <Nav.Link href="/">Experience</Nav.Link>
                <Nav.Link href="/">Achievements</Nav.Link>
                <Nav.Link href="/">Timeline</Nav.Link>
                <Nav.Link href="/">Contact me</Nav.Link>
              </Nav>
              <Form inline>
                {this.state.login ? (<Button variant="outline-info" href="/manage">Manage</Button>)
                :
                (<Button variant="outline-info" onClick={this.handleSignShow}>Log in</Button>)}
                
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </header>
        
        <Modal 
          show={this.state.loginButton}
          onHide={this.state.loginButton}
          backdrop="static"
          keyboard={false}>
          <Modal.Body> 
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
            </div>
          </form>

          </Modal.Body>
          <Modal.Footer>              
            <Button size="lg" block variant="primary" onClick={this.handleSignin}>
              Log in
            </Button>
            <Button size="lg" block variant="secondary" onClick={this.handleSignClose}>
              Cancel
            </Button>

          </Modal.Footer>
        </Modal>
        {<BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/manage" component={ManagePage}/>
          </Switch>
        </BrowserRouter>}
      </div>
    );
  }
}

export default App;
