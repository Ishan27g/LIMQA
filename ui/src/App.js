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
import Image from 'react-bootstrap/Image';

import Home from './components/Home/Home.js';
import ManagePage from './components/ManagePage/ManagePage.js';
import logo from './Image/logo.png';
import QRcode from './Image/QRcode.png';

import loginButton from './Image/loginButton.svg';
class App extends Component{
  constructor(props){
    super(props);
    this.state ={
        loginButton: false,
        login: false,
        QRButton: false,
    }
}
  handleSignClose = () => {
    this.setState({ loginButton: false });
  }
  handleSignClose = () => {
      this.setState({ loginButton: false });
  }

  handleSignShow = () => {
    this.setState({ loginButton: true });
  }

  handleQRShow = () => {
    this.setState({ QRButton: true });
  }

  handleQRClose = () => {
    this.setState({ QRButton: false });
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
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-dark">Search</Button>
                  </Form>
                  {this.state.login ? (<Button variant="outline-dark" className = "p-5" >Manage</Button>)
                  :
                  (<Button inline variant="primary-info" onClick={this.handleSignShow}>
                  <img alt="Login" src = {loginButton}/>
                  </Button>)}
                </Nav>
            </Navbar.Collapse>
          </Navbar>


          <Modal show={this.state.loginButton} onHide={this.handleSignClose}>
            <Modal.Body>
            <form>
              <h3 className ="text-center font-size-15px" style={{ color: 'black' }}>
              Welcome back!</h3>

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
              <Button size="lg" block variant="primary" onClick={this.handleSignin} href="/manage">
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

        </header>

        <footer>
          <Button size="lg" block variant="outline-dark" onClick={this.handleQRShow} style = {{float: "right", verticalAlign:"bottom"}}>
                QR code
          </Button>
          <Modal show={this.state.QRButton} onHide={this.handleQRClose}>
            <Modal.Body>
              <Image src={QRcode} rounded  />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="outline-dark" onClick={this.handleQRClose}>
              Close
            </Button>
            </Modal.Footer>
          </Modal>
        </footer>
      </div>
    );
  }
}

export default App;
