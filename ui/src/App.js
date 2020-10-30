import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import './Themes.css';

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
import Construct from './components/Constructing/Contruct.js';

import logo from './Image/logo.png';
import loginButton from './Image/loginButton.svg';
import iconFacebook from './Image/Facebook.png';
import iconInstagram from './Image/Instagram.png';
import iconLinkedin from './Image/Linkedin.png';
import iconGithub from './Image/Github.png';
import iconWechat from './Image/Wechat.png';

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
        front: true,
        showQR: false,
        socialLinks: [],
        slinksAlert: true,
      /*Login Values*/
        email: '',
        password: '',
        loading: false,

    }
  }

  componentDidMount(){
    var path = window.location.pathname.split("/")[1];
    if(path!=='' && path!=='register' && path !== 'reset' && path !== 'notfound' && path!== 'forget'){
      this.setState({
        showQR: true,
        front: false,
        userId: window.location.pathname.split("/")[2]
      }, () => {
            axios.get( http+'/api/social/' + this.state.userId)
            .then(response => {
              this.setState({socialLinks: response.data.socials},
                 () =>{this.setState({slinksAlert: false}) })
            })
            .catch(function(error) {
                console.log(error);
            })} )
    }else{
      this.setState({
        front: true,
        showQR: false,
      })
    }

    const check = http+'/api/users/check';
    axios.get(check, { withCredentials: true })
      .then(response => {
        if (response.data.logIn){
          this.setState({
            loginButton: false,
            login: true,
            loginInfo: true,
            userId: response.data.userid
          }, ()=>{this.setState({loading: true})})
        }
    });

  };

  handleSignClose = () => {
    this.setState({ loginButton: false });
  }

  handleSignShow = () => {
    this.setState({ loginButton: true });
  }

  handleQRShow = () => {
    const obj = {
      url: "https://limqa.eastus.cloudapp.azure.com:3000/home/"+ window.location.pathname.split("/")[2]
    }
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
    if(this.state.slinksAlert === false){
    var socials = this.state.socialLinks;

    var Linkedin = socials.filter( social =>
        {return social.name === "Linkedin"}
    )[0].url;
    var Facebook = socials.filter( social =>
        {return social.name === "Facebook"}
    )[0].url;
    var Instagram = socials.filter(social =>
          {return social.name === "Instagram"}
    )[0].url;
    var Github = socials.filter(social =>
          {return social.name === "Github"}
    )[0].url;
    var WeChat = socials.filter(social =>
          {return social.name === "Wechat"}
    )[0].url;
  }
    return (
      <React.Fragment>
        <header>
          {this.state.front && !this.state.login? (
            <Navbar bg = "light" variant = "light" expand = "lg" fixed ="top">
              <Navbar.Brand href="/" className = "header-nav mr-auto">
                <Image alt="Logo" src = {logo} style = {{width: "130px", height: "40px"}}/>
              </Navbar.Brand>
              <Button
                variant="primary-info"
                onClick={this.handleSignShow}
                className="mr-2">
                <img alt="Login" src = {loginButton}/>
              </Button>
              <Button variant ="outline-dark"
                      onClick = {() => {window.location.href = "/register"}}>
                      Register Now!
              </Button>
            </Navbar>
          ):(
              <Navbar bg = "light" variant = "light" expand = "lg" fixed ="top" className = "header-nav">
                <Navbar.Brand href="/">
                  <img alt="Logo" src = {logo} style = {{width: "130px", height: "40px"}}
                    className="d-inline-block align-top"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className ="mr-auto">
                    <Nav.Item className = "nav-item">
                    <Nav.Link href={"/home/"+this.state.userId}>About me</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className = "nav-item">
                      <Nav.Link href={"/Achievements/"+this.state.userId}>Achievements</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className = "nav-item">
                      <Nav.Link href={'/timeline/'+this.state.userId}>Timeline</Nav.Link>
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
                      (<Button variant="primary-info" onClick={this.handleSignShow}>
                        <img alt="Login" src = {loginButton}/>
                      </Button>)
                      }
                    <Form inline>
                      <Button variant="outline-dark" onClick={this.handleSearchPage}>Search</Button>
                    </Form>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
          )}
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/" component ={Landing} exact/>
            <Route path="/register" component={Register}/>
            <Route path="/home/:id" component={Home}/>
            <Route path="/timeline/:id" component={Timeline}/>
            <Route path="/Achievements/:id" component={Achievements}/>
            <Route path="/documents/:id" component={singleDoc}/>
            <Route path="/search/:id" component={Search}/>
            <Route path="/forget" component={forgetPassEmail}/>
            <Route path="/reset/:id" component={forgetPass}/>
            {this.state.login && this.state.loading ? (<Route path="/manage/:id"
                                    component={ManagePage}/>)
              :(<Route path="/manage/:id" component={NotFound}/>)
            }
            {this.state.login && this.state.loading ? (<Route path="/view/:id"
                                      component={AccountView}/>)
              :(<Route path="/view/:id" component={NotFound}/>)}
            {this.state.login && this.state.loading? (<Route path="/updatePass/:id" component={changePassword}/>):(<Route path="/updatePass/:id" component={NotFound}/>)}
            <Route path="/notfound" render = {() => <NotFound link = "/"/> }/>

          </Switch>
        </BrowserRouter>
        <footer>
        {this.state.showQR && (!this.state.slinksAlert)? (
          <Navbar
            bg = "light" variant = "light"
            expand = "lg" fixed ="bottom"
            className = "profile-footer footer-size">

                <Navbar.Brand className = "copyright">
                  <Form>
                    <Form.Text> Product of team LiMQA ©</Form.Text>
                  </Form>
                </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className = "profile-nav">
                      <Nav.Item>
                        <Button className = "qr-button"
                                variant = "outline-dark"
                                onClick={this.handleQRShow}>QR Code</Button>

                      </Nav.Item>
                      <Nav.Item className = "profile-socials">
                        <Image onClick= {event => window.location.href = Facebook}
                                src = {iconFacebook}
                                style = {{width: "30px", height: "30px"}} />
                        <Image onClick= {event => window.location.href = Instagram}
                                src = {iconInstagram}
                                style = {{width: "30px", height: "30px"}} />
                        <Image onClick= {event => window.location.href = Linkedin}
                                src = {iconLinkedin}
                                style = {{width: "30px", height: "30px"}} />
                        <Image onClick= {event => window.location.href = Github}
                                src = {iconGithub}
                                style = {{width: "30px", height: "30px"}} />
                        <Image onClick= {event => window.location.href = WeChat}
                                src = {iconWechat}
                                style = {{width: "30px", height: "30px"}} />
                      </Nav.Item>
                </Nav>
              </Navbar.Collapse>

            </Navbar>
          ):(
            <Navbar
              bg = "light" variant = "light"
              expand = "lg" fixed = "bottom"
              className = "copyright footer-size">
              <Form>
                <Form.Text> Product of team LiMQA ©</Form.Text>
              </Form>
            </Navbar>
          )}
        </footer>

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
                <Form.Group   controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword}/>
                </Form.Group>
                <Form.Group  controlId ="formforgotPassword" style = {{textAlign: "right"}}>
                  <a href = "/forget">Forgot password?</a>
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
            </Modal.Footer>
          </Modal>
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
      </React.Fragment>
    )
  }
}
export default App;
