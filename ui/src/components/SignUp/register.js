import React, {Component} from 'react';
import axios from 'axios';
import './register.css'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Register extends Component{


  constructor(props){
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this. onChangeRePassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.state ={
        username: '',
        email: '',
        password: '',
        repassword: '',
        alertPassword: false,
        checkregister: false,

    }
  }
  onChangeUsername(e){
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e){
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    });
  }

  onChangeRePassword(e){
    this.setState({
      repassword: e.target.value,
      alertPassword: false
    });
  }
  /*Change true Condition to pass Ahead After Check 1*/
  handleRegister () {
    if (this.state.repassword == this.state.password ){
        const signurl = http+'/api/users/signup';
        const user = {
          name: this.state.username,
          email: this.state.email,
          password: this.state.password

        };
        axios.post(signurl,user, { withCredentials: true })
        .then(response => {
          console.log(response)
        })
        // wait backend to implement failure login response

    } else {
      this.setState({alertPassword: true});
    }
  }
  render(){
    return(
      <Container className = "register">
        <Col>
          <Form className = "register-form">
            <h3>Register to LiMQA E-portfolio</h3>
            <Form.Group controlId="formBasicUsername">
              <Col sm = "2">
              <Form.Label>Username</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control placeholder="Enter Username" onChange={this.onChangeUsername} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Col sm = "2">
              <Form.Label>Email</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Col sm = "2">
              <Form.Label>Password</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="password" placeholder="Enter Password" onChange={this.onChangePassword}/>
              </Col>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Col sm = "2">
              <Form.Label>Re-enter Password</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="password" placeholder="Re-Enter Password" onChange={this.onChangeRePassword}/>
              </Col>
            </Form.Group>
            <Row>
              <Col sm = {{span: 10, offset: 4}}>

                { this.state.alertPassword ?
                  (<Alert variant={'danger'}>
                  passwords don't match!
                  </Alert>):
                  (<div></div>)
                }
              </Col>
            </Row>
            <Row>
            <Button block variant = "outline-dark" onClick = {this.handleRegister}> Register </Button>
            </Row>
          </Form>
        </Col>
      </Container>
    )
  }
}
export default Register;
