import React, {Component} from 'react';
import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';

import ManagePage from './components/ManagePage/ManagePage.js';
import Register from './components/SignUp/register.js';
import Landing from './components/LandingPage/landingPage.js';
import NotFound from './components/NotFound.js';

import logo from './Image/logo.png';
import loginButton from './Image/loginButton.svg';

import {pathForRequest} from './components/http.js';
let http = pathForRequest();

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
    this.handleLogout = this.handleLogout.bind(this);

    this.state ={
        loginButton: false,
        login: false,
        QRButton: false,
        Alertemail: false,
        Alertpassword: false,
        email: '',
        password: '',
        AlertLogin: '',
        loginInfo: true,
        userId: '',
        frontPage: true
    }
  }

  componentDidMount(){
    const check = http+'/api/users/check';
    axios.get(check, { withCredentials: true })
      .then(response => {
        if (response.data.logIn){
          this.setState({
            loginButton: false,
            login: true,
            loginInfo: true,
            userId: response.data.userid
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

  handleLogout(){
    axios.get(http+'/api/users/logout', { withCredentials: true })
    .then(res=>{
      window.location.href='/';
      console.log(res);
      this.setState({
        login: false,
      });
    })
    .catch(function(error) {
      console.log(error);
    });
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
          const url = http+'/api/users/login';
          const check = http+'/api/users/check';
          axios.post(url,obj, { withCredentials: true })
          .then(response => {
              if (response.data.success){
                axios.get(check, { withCredentials: true })
                .then(response => {
                  console.log(response.data.logIn);
                  if (response.data.logIn){
                    this.setState({
                      loginButton: false,
                      login: true,
                      userId: response.data.userid
                    })
                  }
                })
              } else {
                this.setState({
                  loginInfo: false
                })
              }
          })
          .catch(function(error) {
              console.log(error);
          })
      }
  }

  handlesignup(){
    const signurl = http+'/api/users/signup';
    const user = {
      email: 'test@test.com'
    };
    axios.post(signurl,user, { withCredentials: true })
    .then(response => {
      console.log("signup success");
    })
    .catch(function(error) {
        console.log(error);
    })
  }

  handleSignin = () => {
    this.setState({ login: true });
    this.setState({ loginButton: false });
  }

  render(){
    var front = true;
    if(window.location.pathname !== '/' && window.location.pathname !== '/notfound'){
      front = false;
    }else{
      front = true;
    }
    return (
      <div>
          {front ? (
            <header>
            <Navbar bg = "light" variant = "light" expand = "lg" fixed ="top">
            <Navbar.Brand href="/" className = "mr-auto">
              <Image alt="Logo" src = {logo} style = {{width: "9vmax", height: "2.5vmax"}}/>
            </Navbar.Brand>
              <Button
                variant="primary-info"
                onClick={this.handleSignShow}
                className="mr-2">
                <img alt="Login" src = {loginButton}/>
              </Button>
              <Modal show={this.state.loginButton} onHide={this.handleSignClose} >
                <Modal.Body >
                  <form>
                    <h3 className ="text-center font-size-15px" style={{ color: 'black' }}>
                    Welcome back!
                    </h3>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail} />
                    </Form.Group>
                    {
                      this.state.alertEmail ?(
                        <Alert variant={'danger'}>
                          Please enter a valid email!
                        </Alert>
                      ) : (<section></section>)
                    }
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword}/>
                    </Form.Group>
                    {
                      (this.state.loginInfo === false) ||
                          (this.state.alertPassword === true) ?
                          (
                        <Alert variant={'danger'}>
                          incorrect email or password!
                        </Alert>
                      ) : (<section></section>)
                    }
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button size="lg" block variant="primary" onClick={this.Adminlogin}>
                    Login
                  </Button>
                  <Button size="lg" block variant="primary" onClick={event =>  window.location.href='/register'}>
                    Register
                  </Button>
                </Modal.Footer>
              </Modal>
            </Navbar>
            </header>
          ):(
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
                      {this.state.login ?
                        (
                        <DropdownButton id="manage-dropdown" title="Manage"
                        variant = "outline-dark"
                        className =" mr-2">
                          <Dropdown.Item href="/View">Account</Dropdown.Item>
                          <Dropdown.Item href="/manage">Manage Documents</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={this.handleLogout}>Log Out</Dropdown.Item>
                        </DropdownButton>
                        )
                      :
                      (<Button inline variant="primary-info" onClick={this.handleSignShow}>
                        <img alt="Login" src = {loginButton}/>
                      </Button>)
                      }
                      <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-dark">Search</Button>
                      </Form>

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
                  <Button size="lg" block variant="primary" onClick={event =>  window.location.href='/register'}>
                    Register
                  </Button>
                </Modal.Footer>
              </Modal>
            </header>
          )}

        {<BrowserRouter>
          <Switch>
            <Route path="/" component ={Landing} exact/>
            <Route path="/register" component={Register}/>
            <Route path="/manage/:id" component={ManagePage}/>
            <Route path="/notfound" render = {() => <NotFound link = "/"/> }/>
            <Route render={() => <Redirect to={{pathname: "/notfound"}} />} />
          </Switch>
        </BrowserRouter>}

        <footer>
        <Navbar
          bg = "light" variant = "light"
          expand = "lg" fixed ="bottom"
          className = "copyright">
          <Form>
            <Form.Text> Product of team LiMQA ©</Form.Text>
          </Form>
        </Navbar>
        </footer>
        </div>
    )
  }
}
export default App;
