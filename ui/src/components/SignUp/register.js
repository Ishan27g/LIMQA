import React, {Component} from 'react';
import axios from 'axios';
import './register.css';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import Collapse from 'react-bootstrap/Collapse';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Register extends Component{


  constructor(props){
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.state ={
        /*User Values to Post*/
        username: '',
        email: '',
        password: '',
        repassword: '',

        /*Alerts to Prevent Posting*/
        alertPassword: false,
        alertRePassword: false,
        alertUsername: false,
        alertEmail: false,

        /*Signup steps to check progress in SignUp*/
        step: 1
    }
  }
  onChangeUsername(e){
    this.setState({
      username: e.target.value,
      alertUsername: false
    });
  }
  onChangeEmail(e){
    this.setState({
      email: e.target.value,
      alertEmail: false
    });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value,
      alertPassword: false
    });
  }

  onChangeRePassword(e){
    this.setState({
      repassword: e.target.value,
      alertRePassword: false
    });
  }

  /*Change true Condition to pass Ahead After Check 1*/
  handleRegister () {
    var regex_password = /^(?=.*[0-9]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{6,}$/;
    var regex_email = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    const check_pass_match = (this.state.repassword === this.state.password);
    const check_empty_username = !(this.state.username === "");
    const check_password = regex_password.test(this.state.password);
    const check_email = regex_email.test(this.state.email);

    if (check_pass_match && check_empty_username && check_password && check_email){


        const signurl = http+'/api/users/signup';
        const user = {
          name: this.state.username,
          email: this.state.email,
          password: this.state.password,
        };
        axios.post(signurl,user, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.setState({stepRegister: true});
          window.location.href='/';
        })
        // wait backend to implement failure login response
        .catch(function(error) {
            console.log(error);
        })

    } else {
      this.setState(
        {
          alertRePassword: (!check_pass_match),
          alertPassword: (!check_password),
          alertEmail: (!check_email),
          alertUsername: (!check_empty_username),
        });
    }
  }

  render(){
    return(
      <Container fluid className = "register">
        <Col>
          <Form className = "register-form">
            <h4>Register to LiMQA E-portfolio</h4>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter Username" onChange={this.onChangeUsername} />
            </Form.Group>
            {this.state.alertUsername?
            (<Collapse>
                <Alert  block variant={'danger'}>
                  Invalid Username!
                </Alert>
            </Collapse>):(
              <div></div>
            )
            }
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail} />
            </Form.Group>
            {this.state.alertEmail?
            (<Collapse>
                <Alert variant={'danger'}>
                  Invalid Email!
                </Alert>
            </Collapse>):(
              <div></div>
            )
            }
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control type="password" placeholder="Requirements " onChange={this.onChangePassword}/>
                <InputGroup.Append>
                  <OverlayTrigger placement="top"
                                  delay={{ hide: 400 }}
                                  overlay={
                                    <Popover id="popover-basic">
                                      <Popover.Title as="h6">Password Requirements </Popover.Title>
                                      <Popover.Content>
                                        Password should be atleast
                                        <strong> 6 characters</strong> long<br/>
                                        Should contain a <strong>capital </strong>
                                        letter and a <strong>number</strong>
                                        <br/> No special characters accepted
                                      </Popover.Content>
                                    </Popover>
                                  }>
                    <Button variant = "light">?</Button>
                  </OverlayTrigger>
                </InputGroup.Append>
              </InputGroup>

            </Form.Group>

            {this.state.alertPassword?
            (<Collapse>
                <Alert variant={'danger'}>
                  Enter a Valid Password
                </Alert>
            </Collapse>):(
              <div></div>
            )
            }
            <Form.Group controlId="formBasicRePassword">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control type="password" placeholder="Re-Enter Password" onChange={this.onChangeRePassword}/>
            </Form.Group>
            {this.state.alertRePassword?
            (<Collapse>
              <Alert variant={'danger'}>
                Passwords don't match!
              </Alert>
            </Collapse>):(
              <div></div>
            )
            }
            <Row>
            <Button block variant = "dark" onClick = {this.handleRegister}> Register </Button>
            </Row>
          </Form>
        </Col>
      </Container>
    )
  }
}
export default Register;
