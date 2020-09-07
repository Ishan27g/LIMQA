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
import NavDropdown from 'react-bootstrap/NavDropdown';

import Home from './components/Home/Home.js';
import ManagePage from './components/ManagePage/ManagePage.js';
import logo from './Image/logo.png'

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
        <Navbar bg = "light" variant = "light" expand = "lg" fixed ="top">
          <Navbar.Brand href="/">
            <img alt="Logo" src = {logo} width="100" height="30" className="d-inline-block align-top"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className ="mr-auto">
                <Nav.Item class = "nav-item">
                <Nav.Link href="/">About me</Nav.Link>
                </Nav.Item>
                <Nav.Item class = "nav-item">
                <Nav.Link href="/">Experience</Nav.Link>
                </Nav.Item>
                <Nav.Item class = "nav-item">
                  <Nav.Link href="link">Achievements</Nav.Link>
                </Nav.Item>
                <Nav.Item class = "nav-item">
                  <Nav.Link href="link">Timeline</Nav.Link>
                </Nav.Item>
                <NavDropdown title="More" id="collasible-nav-dropdown">
                  <Nav.Item class = "nav-item">
                    <Nav.Link href="link">Contact me</Nav.Link>
                  </Nav.Item>
                </NavDropdown>
                </Nav>
                <Nav>
                {this.state.login ? (<Button variant="outline-info" href="/manage">Manage</Button>)
                :
                (<Button variant="primary-info" onClick={this.handleSignShow}>
                <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                    <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                </svg></Button>)}
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-dark">Search</Button>
                </Form>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>

        <Modal show={this.state.loginButton} onHide={this.handleSignClose}>
          <Modal.Body>
          <form>
            <h3 className ="text-center font-size-15px">Sign In</h3>

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
              Login
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
