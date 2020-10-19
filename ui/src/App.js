import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

import AccountView from './components/AccountView/accountView.js';
import Landing from './components/LandingPage/landingPage.js';
import ManagePage from './components/ManagePage/ManagePage.js';
import Timeline from './components/Timeline/Timeline.js';
import NotFound from './components/NotFound.js';
import Register from './components/SignUp/register.js';
import singleDoc from './components/documentViewer/singleDoc.js';
import Search from './components/Search/Search.js';
import changePassword from './components/Password/changePassword.js';
import forgetPassEmail from './components/Password/forgetPassEmail.js';
import forgetPass from './components/Password/forgetPass.js';

import logo from './Image/logo.png';
import loginButton from './Image/loginButton.svg';

import {pathForRequest} from './components/http.js';
import Home from './components/Home/Home';
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
    this.handleSearchPage = this.handleSearchPage.bind(this);

    this.state ={
        /*App states*/
        loginButton: false,
        login: false,
        QRButton: false,
        Alertemail: false,
        Alertpassword: false,
        AlertLogin: '',
        loginInfo: true,
        userId: '',
        QRcode: null,
        front: false,
        showQR: false,
      /*Login Values*/
        email: '',
        password: '',

    }
  }

  componentWillUnmount(){
    if(window.location.pathname !== '/' && window.location.pathname !== '/notfound' && window.location.pathname !== '/forget'){
      this.setState({
        front: false
      })
    }else{
      this.setState({
        front: true,
        userId: window.location.pathname.split("/")[2]
      })
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

    var path = window.location.pathname.split("/")[1];
    console.log(path)
    if(path==='home' || path==='manage' || path === 'view'){
      this.setState({
        showQR: true
      })
    }else{
      this.setState({
        showQR: false
      })
    }
  };

  handleSignClose = () => {
    this.setState({ loginButton: false });
  }

  handleSignShow = () => {
    this.setState({ loginButton: true });
  }

  handleQRShow = () => {
    const obj = {
      url: http+"/home/"+ window.location.pathname.split("/")[2]
    }
    console.log(obj);
    const url = http + '/api/users/QRCode';
    axios.post(url, obj)
    .then(res =>{
      this.setState({
        QRcode: res.data
      },()=>{
        this.setState({ QRButton: true });
      })
    })
    .catch(function(error){
      console.log(error)
    })
    
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
                    },()=>{
                      window.location.href='/manage/'+this.state.userId;
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

  handleSignin = () => {
    this.setState({ login: true });
    this.setState({ loginButton: false });
  }

  handleSearchPage(){
    window.location.href='/search/'+ this.state.userId;
  }

  render(){
    return (
      <div>
          {this.state.front && !this.state.login ? (
            <div>
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
                </Navbar>
              </header>
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
          ):(
            <header>
              <Navbar bg = "light" variant = "light" expand = "lg" fixed ="top">
              <Navbar.Brand href="/">
                <img alt="Logo" src = {logo} style = {{width: "9vmax", height: "2.5vmax"}}
                  className="d-inline-block align-top"/>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className ="mr-auto">
                    <Nav.Item class = "nav-item">
                    <Nav.Link href={"/home/"+this.state.userId}>About me</Nav.Link>
                    </Nav.Item>
                    <Nav.Item class = "nav-item">
                    <Nav.Link href="/">Experience</Nav.Link>
                    </Nav.Item>
                    <Nav.Item class = "nav-item">
                      <Nav.Link href="/">Achievements</Nav.Link>
                    </Nav.Item>
                    <Nav.Item class = "nav-item">
                      <Nav.Link href={'/timeline/'+this.state.userId}>Timeline</Nav.Link>
                    </Nav.Item>
                    <Nav.Item class = "nav-item">
                      <Nav.Link href="/">Contact me</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    <Nav>
                      {this.state.login ?
                        (
                        <DropdownButton id="manage-dropdown" title="Manage"
                        variant = "outline-dark"
                        className =" mr-2">
                          <Dropdown.Item href={"/view/"+this.state.userId}>Account</Dropdown.Item>
                          <Dropdown.Item href={"/manage/"+this.state.userId}>Manage Documents</Dropdown.Item>
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
                        <Button variant="outline-dark" onClick={this.handleSearchPage}>Search</Button>
                      </Form>
                    </Nav>
                </Navbar.Collapse>
              </Navbar>
            </header>
          )}
        {<BrowserRouter>
          <Switch>
            <Route path="/" component ={Landing} exact/>
            <Route path="/register" component={Register}/>
            <Route path="/home/:id" component={Home}/>
            <Route path="/timeline/:id" component={Timeline}/>
            <Route path="/documents/:id" component={singleDoc}/>
            <Route path="/search/:id" component={Search}/>
            <Route path="/forget" component={forgetPassEmail}/>
            <Route path="/reset/:id" component={forgetPass}/>
            {this.state.login? (<Route path="/manage/:id"
                                    component={ManagePage}/>)
              :(<Route path="/manage/:id" component={NotFound}/>)
            }
            {this.state.login? (<Route path="/view/:id"
                                      component={AccountView}/>)
              :(<Route path="/view/:id" component={NotFound}/>)}
            {this.state.login? (<Route path="/updatePass/:id" component={changePassword}/>):(<Route path="/updatePass/:id" component={NotFound}/>)}
            <Route path="/notfound" render = {() => <NotFound link = "/"/> }/>

          </Switch>
        </BrowserRouter>}

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
                this.state.Alertemail ?(
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
                ((this.state.loginInfo === false) ||
                    (this.state.Alertpassword === true)) ?
                    (
                  <Alert variant={'danger'}>
                    Incorrect email or password!
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

        {this.state.showQR ? (
            <footer>
              <Navbar
                bg = "light" variant = "light"
                expand = "lg" fixed ="bottom"
                className = "copyright">
                <Button onClick={this.handleQRShow}>QR Code</Button>
                <Form>
                  <Form.Text> Product of team LiMQA © QR</Form.Text>
                </Form>
              </Navbar>
              <Modal show={this.state.QRButton} onHide={this.handleQRClose}>
                <Modal.Body className ="qr-code">
                  <Image src={this.state.QRcode} rounded style ={{width: "15vmax", height: "15vmax"}} />
                </Modal.Body>
                <Modal.Footer>
                <Button block variant="outline-dark" onClick={this.handleQRClose}>
                  Close
                </Button>
                </Modal.Footer>
              </Modal>
            </footer>
          ):(
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
          )}
      </div>
    )
  }
}
export default App;
