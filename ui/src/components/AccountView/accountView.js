import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./accountView.css";
import "./accountEdit.css";
import axios from "axios";

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

class AccountView extends Component {
  constructor(props){
    super(props);
    this.state = {
      editVersion: false,
      email: '',
      name: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      officeAddress: '',
      SupplymentaryEmail: '',
      profileImage: '',
      mobile: Number
    }
    this.handleEditingOpen = this.handleEditingOpen.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLinkedin = this.onChangeLinkedin.bind(this);
    this.onChangeInstagram = this.onChangeInstagram.bind(this);
    this.onChangeFacebook = this.onChangeFacebook.bind(this);
    this.onChangeOfficeAddress = this.onChangeOfficeAddress.bind(this);
    this.onChangeSupplymentaryEmail = this.onChangeSupplymentaryEmail.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
  }

  componentDidMount(){
    // wait for back end for routes
  };

  handleEditingOpen = () => {
    this.setState({ editVersion: true });
  }

  updateChanges = () => {

    this.setState({ editVersion: false });
  }

  onChangeEmail(e){
    this.setState({
      email: e.target.value
    });
  }

  onChangeName(e){
    this.setState({
      name: e.target.value
    });
  }

  onChangeInstagram(e){
    this.setState({
      instagram: e.target.value
    });
  }

  onChangeLinkedin(e){
    this.setState({
      linkedin: e.target.value
    });
  }

  onChangeFacebook(e){
    this.setState({
      facebook: e.target.value
    });
  }

  onChangeOfficeAddress(e){
    this.setState({
      officeAddress: e.target.value
    });
  }

  onChangeSupplymentaryEmail(e){
    this.setState({
      SupplymentaryEmail: e.target.value
    });
  }

  onChangeProfileImage(e){
    this.setState({
      profileImage: e.target.value
    });
  }

  onChangeMobile(e){
    this.setState({
      mobile: e.target.value
    });
  }


    render(){
        return(
            <body>
              {this.state.editVersion ? (
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
                            <input type="file" id="BtnBrowseHidden" name="files" />
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
                              aria-describedby="basic-addon1"
                              onChange={this.onChangeName}/>
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
                              aria-describedby="basic-addon1"
                              onChange={this.onChangeEmail}/>
                            <InputGroup.Append>
                              <InputGroup.Text id = "username-success" className = "bg-success"></InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Row>
                      </Col>
  
                      <Col className = "edit-set-save">
                        <Row className = "edit-edit-button">
                          <Button variant="outline-dark" onClick={this.updateChanges}>Save Changes</Button>
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
                                  aria-describedby="basic-addon1"
                                  onChange={this.onChangeLinkedin}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Instagram</h4>
                                  <FormControl
                                    defaultValue={""}
                                    placeHolder = "Instagram URL"
                                    aria-label= "instagram-url"
                                    aria-describedby="basic-addon1"
                                    onChange={this.onChangeInstagram}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Facebook</h4>
                                  <FormControl
                                    defaultValue={""}
                                    placeHolder = "Facebook URL"
                                    aria-label= "facebook-url"
                                    aria-describedby="basic-addon1"
                                    onChange={this.onChangeFacebook}/>
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
                                aria-describedby="basic-addon1"
                                onChange={this.onChangeOfficeAddress}/>
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
                                placeHolder = "mobile number"
                                aria-label= "linkedin-url"
                                aria-describedby="basic-addon1"
                                onChange={this.onChangeMobile}/>
                            </InputGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Supplymentary E-mail</h4>
                              <InputGroup>
                                <FormControl
                                  defaultValue={""}
                                  placeHolder = "xyz@abc.com"
                                  aria-label="email"
                                  aria-describedby="basic-addon1"
                                  onChange={this.onChangeSupplymentaryEmail}/>
                                <InputGroup.Append>
                                  <InputGroup.Text id = "username-success" className = "bg-success"></InputGroup.Text>
                                </InputGroup.Append>
                              </InputGroup>
                        </ListGroup.Item>
                        </ListGroup>
                    </Row>
                  </Container>
                </div>
              ):(
              <div className = "acc-set">
                <Container>

                  <Row className = "acc-header">
                    <h1>ACCOUNT SETTINGS</h1>
                  </Row>

                  <Row className = "acc-info justify-content-md-center">

                    <Col className = "acc-image">
                      <Image src={profile} roundedCircle/>
                    </Col>

                    <Col className = "acc-basic-info">
                      <Row md="auto" className = "acc-username">
                        <label>Username</label>
                      </Row>
                      <Row md="auto" className = "acc-email">
                        <label>email@email.com </label>
                      </Row>
                    </Col>

                    <Col className = "acc-set-edit">
                      <Row className = "acc-edit-button">
                        <Button variant="outline-dark" onClick={this.handleEditingOpen}>Edit</Button>
                      </Row>
                      <Row className = "acc-update-password">
                        <label>Update Password</label>
                      </Row>
                    </Col>

                  </Row>
                    <Row className = "acc-social-header">
                      <h2> Social Media Profiles</h2>
                        <FontAwesomeIcon icon={['fab', 'google']} color="green"/>
                    </Row>
                    <Row className = "acc-social justify-content-left-center">
                        <ListGroup  className = "acc-social-list">
                          <ListGroup.Item>
                              <h4>Linkedin</h4>
                              <p>&nbsp;&nbsp;URL: <span><label>(ADD LINK)</label></span></p>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <h4>Instagram</h4>
                              <p>&nbsp;&nbsp;URL: <span><label>(ADD LINK)</label></span></p>
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <h4>Facebook</h4>
                              <p>&nbsp;&nbsp;URL: <span><label>(ADD LINK)</label></span></p>
                          </ListGroup.Item>
                        </ListGroup>
                    </Row>
                  <Row className = "acc-contact-header">
                    <h2>Contact Information</h2>
                  </Row>
                  <Row className = "acc-contact justify-content-left-center">
                      <ListGroup className = "acc-contact-list">
                        <ListGroup.Item>
                          <h4>Office Address</h4>
                          <p>&nbsp;&nbsp;<span><label>(ADD ADDRESS)</label></span></p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h4>MObile</h4>
                          <p>&nbsp;&nbsp;<span><label>(ADD NO. with country code)</label></span></p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                          <h4>Supplymentary E-mail</h4>
                          <p>&nbsp;&nbsp;<span><label>(ADD E-MAIL)</label></span></p>
                      </ListGroup.Item>
                      </ListGroup>
                  </Row>
                </Container>
              </div>
              )}
            </body>
        )
    }
}
export default AccountView;
