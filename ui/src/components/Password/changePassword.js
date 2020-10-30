import React, {Component} from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class changePassword extends Component{


  constructor(props){
    super(props);
    this.onChangeOldPass = this.onChangeOldPass.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state ={
        /*User Values to Post*/
        oldPassword: '',
        password: '',
        repassword: '',

        /*Alerts to Prevent Posting*/
        alertPassword: false,
        alertRePassword: false,
        alertOldPassword: false,

        userId: this.props.match.params.id,
    }
  }
  onChangeOldPass(e){
    this.setState({
        oldPassword: e.target.value
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

  handleUpdate () {
    var regex_password = /^(?=.*[0-9]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{6,}$/;

    const check_pass_match = (this.state.repassword === this.state.password);
    const check_password = regex_password.test(this.state.password);
    var password_match = false;
    const oldPass = {
        password: this.state.oldPassword
    };

    axios.post(http+'/api/users/checkPassword', oldPass, { withCredentials: true })
    .then(res => {
        console.log(res.data.match)
        if(res.data.match){
            password_match = true
        };
        if (check_pass_match && check_password && password_match){
            const changePass = http+'/api/users/updatePassword/'+this.state.userId;
            const password = {
              password: this.state.password,
            };
            axios.put(changePass,password, { withCredentials: true })
            .then(response => {
              console.log(response)

              window.location.href='/view/'+this.state.userId;
            })
            .catch(function(error) {
                console.log(error);
            })
        } else {
          this.setState(
            {
              alertRePassword: (!check_pass_match),
              alertPassword: (!check_password),
              alertOldPassword: (!password_match),
            });
        }
    })
    .catch(function(error) {
        console.log(error);
    });
  }


  render(){
    return(
      <div className ="page-fill">
      <Container className = "register">
        <Col>
          <Form className = "register-form">
            <h4>Change your password</h4>
            <Form.Group controlId="formBasicUsername">
              <Col sm = "3">
              <Form.Label>Old Password</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="password" placeholder="Enter your current password" onChange={this.onChangeOldPass} />
              </Col>
            </Form.Group>
            {this.state.alertOldPassword?
            (<Collapse>
              <Row>
                <Col sm = {{span: 8, offset: 3}}>
                    <Alert variant={'danger'}>
                      Please enter your password correctly!
                    </Alert>
                </Col>
              </Row>
            </Collapse>):(
              <div></div>
            )
            }

            <Form.Group controlId="formBasicPassword">
              <Col sm = "3">
              <Form.Label>New Password</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="password" placeholder="Requirements length 6 with a capital letter & number" onChange={this.onChangePassword}/>
              </Col>
            </Form.Group>
            {this.state.alertPassword?
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
            <Form.Group controlId="formBasicRePassword">
              <Col sm = "3">
              <Form.Label>Re-enter New Password</Form.Label>
              </Col>
              <Col sm = "10">
              <Form.Control type="password" placeholder="Re-Enter Password" onChange={this.onChangeRePassword}/>
              </Col>
            </Form.Group>
            {this.state.alertRePassword?
            (<Collapse>
              <Row>
                <Col sm = {{span: 8}}>
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
            <Button block variant = "dark" onClick = {this.handleUpdate}> Change </Button>
            </Row>
            <Row className = "edit-update-password">
              <label onClick={()=>window.location.href = '/forget'} style={{margin: "auto"}}>forget your password?</label>
            </Row>
          </Form>
        </Col>
      </Container>
    </div>
    )
  }
}
export default changePassword;
