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

class forgetPassEmail extends Component{
  constructor(props){
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state ={
        /*User Values to Post*/
        Email: '',
        alertEmail: false,
        alertValid: false,
        userEmail: [],
        emailSend: false,
    }
  }

  componentDidMount(){
    axios.get(http + '/api/users')
    .then(response => {
      var tempUser = [];
      var i;
      for(i=0; i< response.data.users.length; i++){
        tempUser.push(response.data.users[i].email)
      }
      this.setState({userEmail: tempUser}, ()=>{console.log(this.state.userEmail)})
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onChangeEmail(e){
    this.setState({
        Email: e.target.value,
        alertEmail: false,
        alertValid: false
    });
  }

  handleUpdate () {
    var regex_email = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    const check_email = regex_email.test(this.state.Email);
    const valid = this.state.userEmail.includes(this.state.Email);

    if (check_email && valid){
        const sendEmail = http+'/api/users/forgot';
        const detail = {
          email: this.state.Email,
        };
        axios.post(sendEmail,detail)
        .then(response => {
          this.setState({emailSend: true})
        })
        .catch(function(error) {
            console.log(error);
        })
    } else {
        this.setState({
            alertEmail: (!check_email),
            alertValid: (!valid),
        });
    }
  }


  render(){
    return(
        <body style={{marginTop: "100px"}}>
        {this.state.emailSend? (
            <div className ="page-fill">
            <Container className = "register">

                <Form className = "register-form">
                    <h4>An email has send to your email addres</h4>
                    <p>please follow attached link to reset your password!</p>

                    <Button href='/' variant="dark" block>return to home page</Button>

                </Form>
            </Container>
            </div>
        ):(
            <div className ="page-fill">
            <Container className = "register">
                <Col>
                <Form className = "register-form">
                    <h4>Password Recovery</h4>
                    <Form.Group controlId="formBasicUsername">
                    <Col sm = "3">
                    <Form.Label>Email</Form.Label>
                    </Col>
                    <Col sm = "10">
                    <Form.Control type="email" placeholder="Enter your email address" onChange={this.onChangeEmail} />
                    </Col>
                    </Form.Group>
                    {this.state.alertEmail || this.state.alertValid?
                    (<Collapse>
                    <Row>
                        <Col sm = {{span: 8, offset: 3}}>
                            <Alert variant={'danger'}>
                            Enter a Valid Email
                            </Alert>
                        </Col>
                    </Row>
                    </Collapse>):(
                    <div></div>
                    )
                    }
                    <Row>
                    <Button block variant = "outline-dark" onClick = {this.handleUpdate}> Next </Button>
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
export default forgetPassEmail;
