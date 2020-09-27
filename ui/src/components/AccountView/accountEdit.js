import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./accountEdit.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


import profile from '../../Image/profile.png';

class AccountEdit extends Component {

    render(){
        return(
            <body>
              <div className = "edit-set">
                <Container>

                  <Row className = "edit-header">
                    <h1>ACCOUNT SETTINGS</h1>
                  </Row>

                  <Row className = "edit-info justify-content-md-center">

                    <Col className = "edit-image">
                      <Container>
                        <Row className = "edit-image-display">
                        <Image src={profile} roundedCircle/>
                        </Row>
                        <Row className = "edit-image-label">
                          <input type="file" id="BtnBrowseHidden" name="files"/>
                          <label htmlFor="BtnBrowseHidden" >
                            Edit Image
                          </label>
                        </Row>
                      </Container>
                    </Col>
                    <Col className = "edit-basic-info">
                      <Row md="auto" className = "edit-username">
                        <InputGroup size ="lg">
                          <FormControl
                            defaultValue={"Abhilash"}
                            placeHolder = "Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"/>
                          <InputGroup.Append>
                            <InputGroup.Text id = "username-success" className = "bg-success"></InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Row>
                      <Row md="auto" className = "edit-email">
                        <InputGroup size ="lg">
                          <FormControl
                            defaultValue={"email@email.com"}
                            placeHolder = "xyz@abc.com"
                            aria-label="email"
                            aria-describedby="basic-addon1"/>
                          <InputGroup.Append>
                            <InputGroup.Text id = "username-success" className = "bg-success"></InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Row>
                    </Col>

                    <Col className = "edit-set-save">
                      <Row className = "edit-edit-button">
                        <Button variant="outline-dark">Save Changes</Button>
                      </Row>
                      <Row className = "edit-update-password">
                        <label>Update Password</label>
                      </Row>
                    </Col>

                  </Row>
                    <Row className = "edit-social-header">
                      <h2> Social Media Profiles</h2>
                        <FontAwesomeIcon icon={['fab', 'google']} color="green"/>
                    </Row>
                    <Row className = "edit-social justify-content-left-center">
                        <ListGroup  className = "edit-social-list">
                          <ListGroup.Item>
                              <h4>Linkedin</h4>
                              <FormControl
                                defaultValue={""}
                                placeHolder = "Linkedin URL"
                                aria-label= "linkedin-url"
                                aria-describedby="basic-addon1"/>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <h4>Instagram</h4>
                                <FormControl
                                  defaultValue={""}
                                  placeHolder = "Instagram URL"
                                  aria-label= "instagram-url"
                                  aria-describedby="basic-addon1"/>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <h4>Facebook</h4>
                                <FormControl
                                  defaultValue={""}
                                  placeHolder = "Facebook URL"
                                  aria-label= "facebook-url"
                                  aria-describedby="basic-addon1"/>
                          </ListGroup.Item>
                        </ListGroup>
                    </Row>
                  <Row className = "edit-contact-header">
                    <h2>Contact Information</h2>
                  </Row>
                  <Row className = "edit-contact justify-content-left-center">
                      <ListGroup className = "edit-contact-list">
                        <ListGroup.Item>
                          <h4>Office Address</h4>
                            <FormControl
                              defaultValue={""}
                              placeHolder = "Adress"
                              aria-label= "off-address"
                              aria-describedby="basic-addon1"/>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h4>Mobile</h4>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <FormControl as="select" id ="country-code">
                                <option>+1</option>
                                <option>+2</option>
                                <option>+3</option>
                                <option>+4</option>
                                <option>+5</option>
                              </FormControl>
                            </InputGroup.Prepend>
                            <FormControl
                              defaultValue={""}
                              placeHolder = "Linkedin URL"
                              aria-label= "linkedin-url"
                              aria-describedby="basic-addon1"/>
                          </InputGroup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h4>Supplymentary E-mail</h4>
                            <InputGroup>
                              <FormControl
                                defaultValue={""}
                                placeHolder = "xyz@abc.com"
                                aria-label="email"
                                aria-describedby="basic-addon1"/>
                              <InputGroup.Append>
                                <InputGroup.Text id = "username-success" className = "bg-success"></InputGroup.Text>
                              </InputGroup.Append>
                            </InputGroup>
                      </ListGroup.Item>
                      </ListGroup>
                  </Row>
                </Container>
              </div>
            </body>
        )
    }
}
export default AccountEdit;
