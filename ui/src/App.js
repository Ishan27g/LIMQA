import React, {Component} from 'react';
import axios from 'axios';
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
import Alert from 'react-bootstrap/Alert';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Home from './components/Home/Home.js';
import ManagePage from './components/ManagePage/ManagePage.js';
import AccountView from './components/AccountView/accountView.js';
import logo from './Image/logo.png';
import QRcode from './Image/QRcode.png';

import loginButton from './Image/loginButton.svg';
class App extends Component{
  constructor(props){
    super(props);
    this.handleSignClose = this.handleSignClose.bind(this);
    this.handleSignShow = this.handleSignShow.bind(this);
    this.handleQRShow = this.handleQRShow.bind(this);
    this.handleQRClose = this.handleQRClose.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.Adminlogin = this.Adminlogin.bind(this);

    this.state ={
        loginButton: false,
        login: false,
        QRButton: false,
        Alertemail: false,
        Alertpassword: false,
        email: '',
        password: '',
        AlertLogin: '',
        loginInfo: true
    }
  }

  componentDidMount(){
    const check = 'http://localhost:8080/api/users/check';
    axios.get(check, { withCredentials: true })
      .then(response => {
        if (response.data.logIn){
          this.setState({
            loginButton: false,
            login: true,
            loginInfo: true
          })
        }
    })
  };

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

  onChangeEmail(e){
    this.setState({
      Alertemail: false,
      email: e.target.value
    });
  }

  onChangePassword(e){
    this.setState({
      Alertpassword: false,
      password: e.target.value
    });
  }

  Adminlogin(){
      const obj = {
          email: this.state.email,
          password: this.state.password
      };

      if(!obj.email || !obj.password){
          console.log("missing email or password!");
          if(!obj.email){
              this.setState({Alertemail: true});
          }
          if(!obj.password){
              this.setState({Alertpassword: true});
          }

      }
      else{ 
          const url = 'http://localhost:8080/api/users/login';
          const check = 'http://localhost:8080/api/users/check';
          axios.post(url,obj, { withCredentials: true })
          .then(response => {
              axios.get(check, { withCredentials: true })
              .then(response => {
                console.log(response.data.logIn);
                if (response.data.logIn){
                  this.setState({
                    loginButton: false,
                    login: true
                  })
                }
              })
          })
          // wait backend to implement failure login response
          .catch(function(error) {
              console.log(error);
          })
      }
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
                  {this.state.login ?
                    (
                    <DropdownButton id="manage-dropdown" title="Manage"
                                        variant = "outline-dark" className ="ml-2 mr-2">
                      <Dropdown.Item href="/View">Account</Dropdown.Item>
                      <Dropdown.Item href="/manage">Manage Documents</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="">Log Out</Dropdown.Item>
                    </DropdownButton>
                    )
                  :
                  (<Button inline variant="primary-info" onClick={this.handleSignShow}>
                    <img alt="Login" src = {loginButton}/>
                   </Button>)
                  }
                </Nav>
            </Navbar.Collapse>
          </Navbar>


          <Modal show={this.state.loginButton} onHide={this.handleSignClose}>
            <Modal.Body>
            <form>
              <h3 className ="text-center font-size-15px" style={{ color: 'black' }}>
              Welcome back!</h3>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail} />
              </Form.Group>
              {
                this.state.Alertemail === true ?(
                  <Alert variant={'danger'}>
                    please enter your email!
                  </Alert>                     
                ):
                (
                  <section></section>
                ) 
              }
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword}/>
              </Form.Group>
              {
                this.state.Alertpassword === true ?(
                  <Alert variant={'danger'}>
                    please enter your password!
                  </Alert>                     
                ):
                (
                  <section></section>
                ) 
              }
              {
                this.state.loginInfo === false ?(
                  <Alert variant={'danger'}>
                    incorrect email or password!
                  </Alert>                     
                ):
                (
                  <section></section>
                ) 
              }
            </form>

            </Modal.Body>
            <Modal.Footer>
              <Button size="lg" block variant="primary" onClick={this.Adminlogin}>
                Login
              </Button>
            </Modal.Footer>
          </Modal>
          {<BrowserRouter>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/manage" component={ManagePage}/>
              <Route path="/view" component={AccountView}/>
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
