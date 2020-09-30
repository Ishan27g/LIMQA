import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./accountEdit.css";
import axios from "axios";

import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';

import profile from '../../Image/profile.png';
import smLinks from '../../Image/AccSettings_Social media Links.png';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class AccountEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      editVersion: false,
      profileImage: '',
      email: '',
      name: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      officeAddress: '',
      SupplymentaryEmail: '',
      mobile: '',
      userid: '',
      media: [],
      updateEmail: '',
      updateName: '',
      UpdateLinkedin: '',
      UpdateInstagram: '',
      UpdateFacebook: '',
      UpdateOfficeAddress: '',
      UpdataSupplymentaryEmail: '',
      updataMobile: '',

      interactive: false

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
    const check = http+'/api/users/check';
    axios.get(check, { withCredentials: true })
    .then(response => {
      console.log(response.data.userid)
      this.setState({
        userid: response.data.userid
      })
      const accurl = http+'/api/accSetting/'+ this.state.userid;
      axios.get(accurl, { withCredentials: true })
      .then(res => {
        this.setState({
          email: res.data.user.email,
          updateEmail: res.data.user.email,
          SupplymentaryEmail: res.data.user.semail,
          UpdataSupplymentaryEmail: res.data.user.semail,
          mobile: res.data.user.mobile,
          updateMobile: res.data.user.mobile,
          officeAddress: res.data.user.officeAddress,
          UpdateOfficeAddress: res.data.user.officeAddress,
          name: res.data.user.name,
          updateName: res.data.user.name,
          media: res.data.user.social
        })
        var i
        for(i=0; i<this.state.media.length; i++){
          if (this.state.media[i].name === 'Facebook'){
            this.setState({
              facebook: this.state.media[i].url,
              UpdateFacebook: this.state.media[i].url
            })
          }
          if (this.state.media[i].name === 'Instagram'){
            this.setState({
              instagram: this.state.media[i].url,
              UpdateInstagram: this.state.media[i].url
            })
          }
          if (this.state.media[i].name === 'Linkedin'){
            this.setState({
              linkedin: this.state.media[i].url,
              UpdateLinkedin: this.state.media[i].url
            })
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      })
    })
    .catch(function(error) {
      console.log(error);
    })

  };

  handleEditingOpen = () => {
    this.setState({ editVersion: true });
  }

  updateChanges = () => {
    console.log(this.state.linkedin);
    console.log(this.state.UpdateLinkedin);
    var form = new FormData();
    form.append('Email', this.state.updateEmail);
    form.append('Mobile', this.state.updateMobile);
    form.append('Semail', this.state.UpdataSupplymentaryEmail);
    form.append('Address', this.state.UpdateOfficeAddress);
    form.append('LinkedinName', 'Linkedin');
    form.append('Linkedinurl', this.state.UpdateLinkedin);
    form.append('FacebookName', 'Facebook');
    form.append('Facebookurl', this.state.UpdateFacebook);
    form.append('InstagramName', 'Instagram');
    form.append('Instagramurl', this.state.UpdateInstagram);
    form.append('Username', this.state.updateName);
    const updateUrl = http+'/api/accSetting/'+ this.state.userid;
    axios.put(updateUrl, form, { withCredentials: true })
    .then(res => {
      console.log("update successfully", res.data);
      var tempemail= this.state.updateEmail;
      var tempSupplymentaryEmail= this.state.UpdataSupplymentaryEmail;
      var tempmobile= this.state.updateMobile;
      var tempofficeAddress= this.state.UpdateOfficeAddress;
      var tempname= this.state.updateName;
      var templinkedin = this.state.UpdateLinkedin;
      console.log(templinkedin);
      var tempinstagram =this.state.UpdateInstagram;
      var tempfacebook = this.state.UpdateFacebook;

      this.setState({
        email: tempemail,
        SupplymentaryEmail: tempSupplymentaryEmail,
        mobile: tempmobile,
        officeAddress: tempofficeAddress,
        name: tempname,
        linkedin: templinkedin,
        instagram:tempinstagram,
        facebook: tempfacebook,
      }, ()=>{
        console.log(this.state.linkedin)
      })
    })
    .catch(function(error) {
      console.log(error);
    })
    this.setState({ editVersion: false });
  }

  onChangeEmail(e){
    if (e.target.value.length > 0){
      this.setState({
        updateEmail: e.target.value
      });
    }else{
      var email = this.state.email;
      this.setState({
        updateEmail: email
      });
    }
  }

  onChangeName(e){
    if (e.target.value.length > 0){
      this.setState({
        updateName: e.target.value
      });
    }else{
      var name = this.state.name;
      this.setState({
        updateName: name
      });
    }
  }

  onChangeInstagram(e){
    if (e.target.value.length > 0){
      this.setState({
        UpdateInstagram: e.target.value
      });
    }else{
      var ins = this.state.instagram;
      this.setState({
        UpdateInstagram: ins
      });
    }
  }

  onChangeLinkedin(e){
    console.log(e.target.value);
    if (e.target.value.length > 0){
      console.log("up to line 208");
      this.setState({
        UpdateLinkedin: e.target.value
      });
    }else{
      console.log("up to line 213");
      var lin = this.state.linkedin;
      this.setState({
        UpdateLinkedin: lin
      });
    }
  }

  onChangeFacebook(e){
    if (e.target.value.length > 0){
      this.setState({
        UpdateFacebook: e.target.value
      });
    }else{
      var face = this.state.facebook;
      this.setState({
        UpdateFacebook: face
      });
    }
  }

  onChangeOfficeAddress(e){
    if (e.target.value.length > 0){
      this.setState({
        UpdateOfficeAddress: e.target.value
      });
    }else{
      var add = this.state.officeAddress;
      this.setState({
        UpdateOfficeAddress: add
      });
    }
  }

  onChangeSupplymentaryEmail(e){
    if (e.target.value.length > 0){
      this.setState({
        UpdataSupplymentaryEmail: e.target.value
      });
    }else{
      var smail = this.state.SupplymentaryEmail;
      this.setState({
        UpdataSupplymentaryEmail: smail
      });
    }
  }

  onChangeMobile(e){
    console.log(e.target.value);
    if (e.target.value.length > 0){
      this.setState({
        updateMobile: e.target.value
      });
    }else{
      var phone = this.state.mobile;
      this.setState({
        updateMobile: phone
      });
    }
  }

  onChangeProfileImage(e){
    this.setState({
      profileImage: e.target.value
    });
  }


  render(){
      return(
        <div className = "edit-set">
          <Container>

            <Row className = "edit-header">
              <h1>ACCOUNT SETTINGS</h1>
            </Row>

            <Row className = "edit-info justify-content-md-center">

              <Col className = "edit-image">
                <Container>
                  <Row className = "edit-image-display">
                  <Image src={profile} roundedCircle
                          style = {{height: "10vmax", width: "10vmax"}}/>
                  </Row>
                  <Row className = "edit-image-label">
                    <input type="file" id="BtnBrowseHidden" name="files" style={{display: "none"}} />
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
                      placeholder = "Username"
                      defaultValue = {this.state.name}
                      aria-label= "username"
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
                      placeholder = "Email"
                      defaultValue = {this.state.email}
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
                  <Col>
                    <h2>Social Media Profiles</h2>
                  </Col>
                  <Col>
                    <Image src = {smLinks} style = {{zIndex: 1, width: "15vmax"}}/>
                  </Col>
              </Row>

              <Row className = "edit-social justify-content-left-center">
                  <ListGroup  className = "edit-social-list">
                    <ListGroup.Item>
                        <h4>Linkedin</h4>
                        <FormControl

                          placeholder = "URL"
                          defaultValue = {this.state.linkedin}
                          aria-label= "linkedin-url"
                          aria-describedby="basic-addon1"
                          onChange={this.onChangeLinkedin}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Instagram</h4>
                          <FormControl
                            placeholder = "URL"
                            defaultValue = {this.state.instagram}
                            aria-label= "instagram-url"
                            aria-describedby="basic-addon1"
                            onChange={this.onChangeInstagram}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Facebook</h4>
                          <FormControl
                            placeholder = "URL"
                            defaultValue = {this.state.facebook}
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
                        placeholder = "Unit, Street, Suburb, City"
                        defaultValue = {this.state.officeAddress}
                        aria-label= "off-address"
                        aria-describedby="basic-addon1"
                        onChange={this.onChangeOfficeAddress}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h4>Mobile</h4>
                      <FormControl
                        placeholder = "+61 (420) 111111"
                        defaultValue = {this.state.mobile}
                        aria-label= "linkedin-url"
                        aria-describedby="basic-addon1"
                        onChange={this.onChangeMobile}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h4>Supplymentary E-mail</h4>
                      <InputGroup>
                        <FormControl
                          placeholder = "email"
                          defaultValue = {this.state.SupplymentaryEmail}
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
      )
  }
}
export default AccountEdit;
