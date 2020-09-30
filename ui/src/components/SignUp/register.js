import React, {Component} from 'react';
import axios from 'axios';
import './register.css'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
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
        alertRePassword: false,
        alertUsername: "",
        alertEmail: "",
        checkregister: false,

    }
  }
  onChangeUsername(e){
    this.setState({
      username: e.target.value,
    });
  }
  onChangeEmail(e){
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value,

    });
  }

  onChangeRePassword(e){
    this.setState({
      repassword: e.target.value,
    });
  }

  /*Change true Condition to pass Ahead After Check 1*/
  handleRegister () {
    const check_pass_match = (this.state.repassword == this.state.password);
    const check_empty_username = (this.state.Username == "");
    const check_email = (this.state.Email)
    if (check_pass_match){
        this.setState({alertPassword: false});
        const signurl = http+'/api/users/signup';
        const user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        };
        axios.post(signurl,user, { withCredentials: true })
        .then(response => {
          console.log(response)

        })
        // wait backend to implement failure login response
        .catch(function(error) {
            console.log(error);
        })
    } else {
      this.setState({alertRePassword: true});
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
            {this.state.alertRePassword?
            (<Collapse>
              <Row>
                <Col sm = {{span: 8, offset: 3}}>
                    <Alert variant={'danger'}>
                      {this.state.alertUsername}
                    </Alert>
                </Col>
              </Row>
            </Collapse>):(
              <div></div>
            )
            }
            <Form.Group controlId="formBasicEmail">
              <Col sm = "2">
              <Form.Label>Email</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail} />
              </Col>
            </Form.Group>
            {this.state.alertRePassword?
            (<Collapse>
              <Row>
                <Col sm = {{span: 8, offset: 3}}>
                    <Alert variant={'danger'}>
                      {this.state.alertEmail}
                    </Alert>
                </Col>
              </Row>
            </Collapse>):(
              <div></div>
            )
            }
            <Form.Group controlId="formBasicPassword">
              <Col sm = "2">
              <Form.Label>Password</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="password" placeholder="Requirements length 6 with a capital letter & number" onChange={this.onChangePassword}/>
              </Col>
            </Form.Group>
            {this.state.alertRePassword?
            (<Collapse>
              <Row>
                <Col sm = {{span: 8, offset: 3}}>
                    <Alert variant={'danger'}>
                      Enter a Valid Password
                    </Alert>
                </Col>
              </Row>
            </Collapse>):(
              <div></div>
            )
            }
            <Form.Group controlId="formBasicPassword">
              <Col sm = "2">
              <Form.Label>Re-enter Password</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="password" placeholder="Re-Enter Password" onChange={this.onChangeRePassword}/>
              </Col>
            </Form.Group>
            {this.state.alertRePassword?
            (<Collapse>
              <Row>
                <Col sm = {{span: 8, offset: 3}}>
                    <Alert variant={'danger'}>
                      Passwords don't match!
                    </Alert>
                </Col>
              </Row>
            </Collapse>):(
              <div></div>
            )
            }
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
