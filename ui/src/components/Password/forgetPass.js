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

class forgetPass extends Component{


  constructor(props){
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state ={
        /*User Values to Post*/
        password: '',
        repassword: '',

        /*Alerts to Prevent Posting*/
        alertPassword: false,
        alertRePassword: false,

        updateStatus: false,
    }
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

    if (check_pass_match && check_password){
        const changePass = http+'/api/users/resetPassword/'+this.props.match.params.id;
        const password = {
          password: this.state.password,
        };
        axios.post(changePass,password)
        .then(response => {
          this.setState({
              updateStatus: true
          })
          
          //window.location.href='/';
        })
        .catch(function(error) {
            console.log(error);
        })
    } else {
      this.setState(
        {
          alertRePassword: (!check_pass_match),
          alertPassword: (!check_password),
        });
    }
  }


  render(){
    return(
        <body style={{marginTop: "100px"}}>
        {this.state.updateStatus?(
            <div className ="page-fill">
                <Container className = "register">
                    <Form className = "register-form">
                        <h4>Your password has been updated</h4>
                        <p>You can use your new password to log in!</p>
                        <Button href='/' variant="dark" block>return to home page</Button>
                    </Form>
                </Container>
            </div>
        ):(
            <div className ="page-fill">
                <Container className = "register">
                    <Col>
                    <Form className = "register-form">
                        <h4>Reset your password</h4>

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
                        <Button block variant = "outline-dark" onClick = {this.handleUpdate}> Reset </Button>
                        </Row>
                    </Form>
                    </Col>
                </Container>
            </div>
        )}
        </body>
    )
  }
}
export default forgetPass;