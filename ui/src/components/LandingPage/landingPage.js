import React, {Component} from 'react';
import axios from 'axios';
import './landingPage.css';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Fade from 'react-bootstrap/Fade';
import ListGroup from 'react-bootstrap/ListGroup';
import CardColumns from 'react-bootstrap/CardColumns';
import Carousel from 'react-bootstrap/Carousel';

import Home from '../Home/Home.js';
import UserList from './userList.js';
import UserCard from './userCard.js';


import logo from '../../Image/logo.png';
import loginButton from '../../Image/loginButton.svg';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Landing extends Component{
  constructor(props){
    super(props);
    this.handleSignClose = this.handleSignClose.bind(this);
    this.handleSignShow = this.handleSignShow.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.Adminlogin = this.Adminlogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getUsers = this.getUsers.bind(this);

    this.state = {
      /*App states*/
      loginButton: false,
      login: false,
      loginInfo: false,
      alertEmail: false,
      alertPassword: false,
      searching: false,

      /*User Search*/
      users: [],
      search: "",

      /*Login Values*/
      email: "",
      password: ""

    }
  }
  componentDidMount(){
    this.getUsers();
    const check = http+'/api/users/check';
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

  handleSignin = () => {
    this.setState({ login: true });
    this.setState({ loginButton: false });
  }

  Adminlogin(){
      const obj = {
          email: this.state.email,
          password: this.state.password
      };

      if(!obj.email || !obj.password){
          console.log("missing email or password!");
          if(!obj.email){
              this.setState({alertEmail: true});
          }
          if(!obj.password){
              this.setState({alertPassword: true});
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
                  console.log( "/manage".concat("/", response.data.userid));
                  if (response.data.logIn){
                    this.setState({
                      loginButton: false,
                      login: true
                    })
                    /*window.location.href = "/".concat(response.data.userid,"/manage")*/
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
      alertEmail: false,
      email: e.target.value
    });
  }

  onChangePassword(e){
    this.setState({
      alertPassword: false,
      password: e.target.value
    });
  }

  onChangeSearch(e){

    if (e.target.value === ""){
      this.setState({
        search: e.target.value,
        searching: false
      });
    } else {
      this.setState({
        search: e.target.value,
        searching: true
      });
    }


  }
  getUsers(){
    axios.get(http + '/api/users',  { withCredentials: true })
    .then(response => {
      this.setState({users: response.data.users});
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render(){

    var searchUsers = this.state.users.filter(user => {
        if (this.state.search === "") {

            return("")

        } else {

          var name = user.name;
          const pattern = this.state.search.split("").map(letter => {
                    if(!("\\+*()?.,".includes(letter))) {
                      return `(?=.*${letter})`
                    } else {
                      return ""
                    }
                  }).join("");

          const regex = new RegExp(`${pattern}`, "g");

          return (name.toLowerCase().includes(this.state.search.toLowerCase())
                  || name.match(regex))

        }
      }).sort((a,b)=> b["name"] - a["name"]).slice(0,7);

    let showUsers = searchUsers.map( searchedUser => {
      return (
        <UserList
          name = {searchedUser.name}
          email = {searchedUser.email}
          id = {searchedUser.id}/>
      )
    });

    let allUsers = this.state.users.map( cardUser =>{
      return (
        <UserCard
          name = {cardUser.name}
          email = {cardUser.email}
          id = {cardUser.id}
          bioinfo = {cardUser.bioinfo}
          social = {cardUser.social}/>
      )
    });

    var setUsers =[];
    for(var i= 0; i < allUsers.length; i=i+3){
      setUsers.push(
          <CardColumns variant = "flush">{allUsers.slice(i,i+3)}</CardColumns>
      )
    }

    let diplaySetUsers = setUsers.map(userDeck => {
      return(<Carousel.Item>{userDeck}</Carousel.Item>)
    });

    return (

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

        <body>
          <Container className = "app-body">
            <Row className = "landing-header">
                Discover New Talents
            </Row>
            <Row className = "user-search">
              <FormControl type="text" size = "lg"
                            onChange = {this.onChangeSearch}
                            placeholder="Search Users"/>
            </Row>
            <Row className = "search-field">
            <Collapse in = {this.state.searching}>
              <ListGroup variant = "flush">{showUsers}</ListGroup>
            </Collapse>
            </Row>
            <Row className = "user-cards">
            <Fade in = {!(this.state.searching)}>
              <Carousel interval = {10000}>{diplaySetUsers}</Carousel>
            </Fade>
            </Row>
          </Container>
        </body>

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
export default Landing;
