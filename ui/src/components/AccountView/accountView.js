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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import profile from '../../Image/profile.png';
import iconFacebook from '../../Image/Facebook.png';
import iconInstagram from '../../Image/Instagram.png';
import iconLinkedin from '../../Image/Linkedin.png';
import iconGithub from '../../Image/Github.png';
import iconWechat from '../../Image/Wechat.png';
import iconOA from '../../Image/officeAddress.png';
import iconMobile from '../../Image/mobile.png';
import iconEmail from '../../Image/email.png';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class AccountView extends Component {
  constructor(props){
    super(props);
    this.state = {
      editVersion: false,

      // user details
      profileImage: http+'/api/users/profilePhoto/'+this.props.match.params.id,
      email: '',
      name: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      github: '',
      wechat: '',
      officeAddress: '',
      SupplymentaryEmail: '',
      mobile: '',
      media: [],

      // updates information
      updateEmail: '',
      updateName: '',
      UpdateLinkedin: '',
      UpdateInstagram: '',
      UpdateFacebook: '',
      UpdateGithub: '',
      UpdateWechat: '',
      UpdateOfficeAddress: '',
      UpdataSupplymentaryEmail: '',
      updataMobile: '',

      /*Alerts*/
      alertUsername: false,
      alertEmail: false,
      alertSEmail: false,
      alertInstagram: false,
      alertFacebook: false,
      alertLinkedin: false,
      alertGithub: false,
      alertWechat: false,

      userid: this.props.match.params.id
    }
    this.handleEditingOpen = this.handleEditingOpen.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLinkedin = this.onChangeLinkedin.bind(this);
    this.onChangeInstagram = this.onChangeInstagram.bind(this);
    this.onChangeFacebook = this.onChangeFacebook.bind(this);
    this.onChangeGithub = this.onChangeGithub.bind(this);
    this.onChangeWechat = this.onChangeWechat.bind(this);
    this.onChangeOfficeAddress = this.onChangeOfficeAddress.bind(this);
    this.onChangeSupplymentaryEmail = this.onChangeSupplymentaryEmail.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.changePass = this.changePass.bind(this);
  }

  componentDidMount(){

    const accurl = http+'/api/accSetting/'+ this.state.userid;
    axios.get(accurl)
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
      console.log(this.state.media);
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
        if (this.state.media[i].name === 'Github'){
          this.setState({
            github: this.state.media[i].url,
            UpdateGithub: this.state.media[i].url
          })
        }
        if (this.state.media[i].name === 'Wechat'){
          this.setState({
            wechat: this.state.media[i].url,
            UpdateWechat: this.state.media[i].url
          })
        }
      }
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
    form.append('GithubName', 'Github');
    form.append('Githuburl', this.state.UpdateGithub);
    form.append('WechatName', 'Wechat');
    form.append('Wechaturl', this.state.UpdateWechat);
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
      var tempinstagram =this.state.UpdateInstagram;
      var tempfacebook = this.state.UpdateFacebook;
      var tempgithub = this.state.UpdateGithub;
      var tempwechat =this.state.UpdateWechat;

      this.setState({
        email: tempemail,
        SupplymentaryEmail: tempSupplymentaryEmail,
        mobile: tempmobile,
        officeAddress: tempofficeAddress,
        name: tempname,
        linkedin: templinkedin,
        instagram:tempinstagram,
        facebook: tempfacebook,
        github: tempgithub,
        wechat: tempwechat,
        alertUsername: false,
        alertEmail: false,
        alertSEmail: false,
        alertInstagram: false,
        alertFacebook: false,
        alertLinkedin: false,
        alertGithub: false,
        alertWechat: false
      })
    })
    .catch(function(error) {
      console.log(error);
    })
    this.setState({ editVersion: false });
  }

  onChangeEmail(e){
    var regex_email = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (regex_email.test(e.target.value)){
      this.setState({
        updateEmail: e.target.value,
        alertEmail: false
      });
    }else{
      var email = this.state.email;
      this.setState({
        updateEmail: email,
        alertEmail: true
      });
    }
  }

  onChangeName(e){
    if (e.target.value.length > 0){
      this.setState({
        updateName: e.target.value,
        alertUsername: false
      });
    }else{
      var name = this.state.name;
      this.setState({
        updateName: name,
        alertUsername: true
      });
    }
  }

  onChangeInstagram(e){
    var regex_url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;

    if (regex_url.test(e.target.value)){
      this.setState({
        UpdateInstagram: e.target.value,
        alertInstagram: false
      });
    }else{
      var ins = this.state.instagram;
      this.setState({
        UpdateInstagram: ins,
        alertInstagram: true
      });
    }
  }

  onChangeLinkedin(e){
    var regex_url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;
    console.log(e.target.value);
    if (regex_url.test(e.target.value)){
      this.setState({
        UpdateLinkedin: e.target.value,
        alertLinkedin: false
      });
    }else{
      var lin = this.state.linkedin;
      this.setState({
        UpdateLinkedin: lin,
        alertLinkedin: true
      });
    }
  }

  onChangeFacebook(e){
    var regex_url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;
    if (regex_url.test(e.target.value)){
      this.setState({
        UpdateFacebook: e.target.value,
        alertFacebook: false
      });
    }else{
      var face = this.state.facebook;
      this.setState({
        UpdateFacebook: face,
        alertFacebook: true
      });
    }
  }
  onChangeGithub(e){
    var regex_url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;
    if (regex_url.test(e.target.value)){
      this.setState({
        UpdateGithub: e.target.value,
        alertGithub: false
      });
    }else{
      var git = this.state.facebook;
      this.setState({
        UpdateGithub: git,
        alertGithub: true
      });
    }
  }

  onChangeWechat(e){
    var regex_url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;
    if (regex_url.test(e.target.value)){
      this.setState({
        UpdateWechat: e.target.value,
        alertWechat: false
      });
    }else{
      var we = this.state.facebook;
      this.setState({
        UpdateWechat: we,
        alertWechat: true
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
    var regex_email = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (regex_email.test(e.target.value)){
      this.setState({
        UpdataSupplymentaryEmail: e.target.value,
        alertSEmail: false
      });
    }else{
      var smail = this.state.SupplymentaryEmail;
      this.setState({
        UpdataSupplymentaryEmail: smail,
        alertSEmail: true
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

  changePass(){
    window.location.href = '/updatePass/'+this.state.userid;
  }

    render(){
        var socials = [{name: "Linkedin",url: this.state.linkedin,
                        alert: this.state.alertLinkedin, onChange: this.onChangeLinkedin,
                        imgsrc: iconLinkedin},
                       {name: "Instagram",url: this.state.instagram,
                        alert: this.state.alertInstagram, onChange: this.onChangeInstagram,
                        imgsrc: iconInstagram},
                       {name: "Facebook",url: this.state.facebook,
                        alert: this.state.alertFacebook, onChange: this.onChangeFacebook,
                        imgsrc: iconFacebook},
                       {name: "GitHub",url: this.state.GitHub,
                        alert: this.state.alertGithub, onChange: this.onChangeGithub,
                        imgsrc: iconGithub},
                       {name: "WeChat",url: this.state.WeChat,
                        alert: this.state.alertWechat, onChange: this.onChangeWechat,
                        imgsrc: iconWechat}
                      ];

        var editSocials = socials.map(social =>{
          return(
            <ListGroup.Item>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>{social.name}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    size = "lg"
                    placeholder = "URL"
                    defaultValue = {social.url}
                    aria-label= {social.name + '-url'}
                    aria-describedby="basic-addon1"
                    onChange={social.onChange}/ >
                    <InputGroup.Append>
                      <OverlayTrigger placement="top"
                                      delay={{ hide: 100 }}
                                      overlay={
                                        <Tooltip>Redirect</Tooltip>
                                      }>
                        <Button variant = "light">
                          <img src = {social.imgsrc}
                               alt = {'icon ' + social.name}
                               style ={{width: "25px", height:"25px"}}
                               onClick = { () => {window.location.href = social.url}}
                               />
                        </Button>
                      </OverlayTrigger>
                      { social.alert? (
                        <InputGroup.Text className = "bg-danger"></InputGroup.Text>
                      ):(<InputGroup.Text className = "bg-success"></InputGroup.Text>)
                    }
                    </InputGroup.Append>
                </InputGroup>
            </ListGroup.Item>
          )
        });
        var displaySocials = socials.map(social =>{
          return(
            <ListGroup.Item>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>{social.name}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    size = "lg"
                    defaultValue = {social.url}
                    aria-describedby="basic-addon1"
                    disabled
                    / >
                  <InputGroup.Append>
                    <OverlayTrigger placement="top"
                                    delay={{ hide: 50 }}
                                    overlay={
                                      <Tooltip>Redirect</Tooltip>
                                    }>
                      <Button variant = "light">
                        <img src = {social.imgsrc}
                             alt = {'icon ' + social.name}
                             style ={{width: "25px", height:"25px"}}
                             onClick = { () => {window.location.href = social.url}}
                             />
                      </Button>
                    </OverlayTrigger>
                  </InputGroup.Append>
                </InputGroup>
            </ListGroup.Item>
          )
        });

        return(
            <body className ="app-background">
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
                          <Image src={this.state.profileImage} onError={(e)=>{e.target.onerror = null; e.target.src=profile}} roundedCircle style = {{height: "10vmax", width: "10vmax"}}/>

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
                              { this.state.alertUsername ? (
                                <InputGroup.Text className = "bg-danger"></InputGroup.Text>
                              ):(<InputGroup.Text className = "bg-success"></InputGroup.Text>)
                            }
                            </InputGroup.Append>
                          </InputGroup>
                        </Row>
                        <Row md="auto" className = "edit-email">
                          <InputGroup size ="lg">
                            <FormControl
                              placeholder ="email"
                              defaultValue = {this.state.email}
                              aria-label="email"
                              aria-describedby="basic-addon1"
                              onChange={this.onChangeEmail}/>
                            <InputGroup.Append>
                              { this.state.alertEmail ? (
                                <InputGroup.Text className = "bg-danger"></InputGroup.Text>
                              ):(<InputGroup.Text className = "bg-success"></InputGroup.Text>)
                            }                            </InputGroup.Append>
                          </InputGroup>
                        </Row>
                      </Col>

                      <Col className = "edit-set-save">
                        <Row className = "edit-edit-button">
                          <Button variant="outline-dark" onClick={this.updateChanges}>Save Changes</Button>
                        </Row>
                        <Row className = "edit-update-password">
                          <label onClick={this.changePass}>Update Password</label>
                        </Row>
                      </Col>

                    </Row>
                      <Row className = "edit-social-header">
                        <h2 > Social Media Profiles</h2>
                      </Row>
                      <Row className = "edit-social justify-content-left-center">
                          <ListGroup  className = "edit-social-list">
                            {editSocials}
                          </ListGroup>
                      </Row>
                    <Row className = "edit-contact-header">
                      <h2>Contact Information</h2>
                    </Row>
                    <Row className = "edit-contact justify-content-left-center">
                      <ListGroup className = "edit-contact-list">
                        <ListGroup.Item>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Office Adress</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              size = "lg"
                              placeholder = "Unit, Street, Suburb, City"
                              defaultValue = {this.state.officeAddress}
                              onChange={this.onChangeOfficeAddress}
                              aria-describedby="basic-addon1"
                              />
                            <InputGroup.Append>
                              <Button variant = "outline-light">
                              <img src = {iconOA}
                                   alt = "officeAddress"
                                   style = {{width: "25px", height:"25px"}}
                                   />
                               </Button>
                            </InputGroup.Append>
                          </InputGroup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Mobile Number</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            size = "lg"
                            defaultValue = {this.state.mobile}
                            placeholder = "+61 (420) 111111"
                            aria-describedby="basic-addon1"
                            onChange={this.onChangeMobile}

                            />
                          <InputGroup.Append>
                            <Button variant = "outline-light">
                              <img src = {iconMobile}
                                   alt = "Mobile"
                                   style = {{width: "25px", height:"25px"}}
                                   />
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Alternate Email</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            size = "lg"
                            defaultValue = {this.state.SupplymentaryEmail}
                            aria-describedby="basic-addon1"
                            placeholder = "email"
                            onChange={this.onChangeSupplymentaryEmail}
                            />
                          <InputGroup.Append>
                            <Button variant = "outline-light">
                              <img src = {iconEmail}
                                 alt = "A-Email"
                                 style = {{width: "25px", height:"25px"}}
                                 />
                             </Button>
                             { this.state.alertSEmail ? (
                               <InputGroup.Text className = "bg-danger"></InputGroup.Text>
                             ):(<InputGroup.Text className = "bg-success"></InputGroup.Text>)
                           }
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
                     <Image src={this.state.profileImage} onError={(e)=>{e.target.onerror = null; e.target.src=profile}} roundedCircle style = {{height: "10vmax", width: "10vmax"}}/>

                    </Col>

                    <Col className = "acc-basic-info">
                      <Row md="auto" className = "acc-username">
                        <label>{this.state.name}</label>
                      </Row>
                      <Row md="auto" className = "acc-email">
                      <label>{this.state.email}</label>
                      </Row>
                    </Col>

                    <Col className = "acc-set-edit">
                      <Row className = "acc-edit-button">
                        <Button variant="outline-dark" onClick={this.handleEditingOpen}>Edit</Button>
                      </Row>
                      <Row className = "acc-update-password">
                        <label onClick={this.changePass}>Update Password</label>
                      </Row>
                    </Col>

                  </Row>
                    <Row className = "acc-social-header">
                      <h2> Social Media Profiles</h2>
                        <FontAwesomeIcon icon={['fab', 'google']} color="green"/>
                    </Row>
                    <Row className = "acc-social justify-content-left-center">
                        <ListGroup  className = "acc-social-list">
                          {displaySocials}
                        </ListGroup>
                    </Row>
                  <Row className = "acc-contact-header">
                    <h2>Contact Information</h2>
                  </Row>
                  <Row className = "acc-contact justify-content-left-center">

                      <ListGroup className = "acc-contact-list">
                        <ListGroup.Item>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Office Adress</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              size = "lg"
                              defaultValue = {this.state.officeAddress}
                              aria-describedby="basic-addon1"
                              disabled
                              />
                            <InputGroup.Append>
                              <Button variant = "outline-light">
                              <img src = {iconOA}
                                   alt = "officeAddress"
                                   style = {{width: "25px", height:"25px"}}
                                   />
                               </Button>
                            </InputGroup.Append>
                          </InputGroup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Mobile Number</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            size = "lg"
                            defaultValue = {this.state.mobile}
                            aria-describedby="basic-addon1"
                            disabled
                            />
                          <InputGroup.Append>
                            <Button variant = "outline-light">
                              <img src = {iconMobile}
                                   alt = "Mobile"
                                   style = {{width: "25px", height:"25px"}}
                                   />
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Alternate Email</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            size = "lg"
                            defaultValue = {this.state.SupplymentaryEmail}
                            aria-describedby="basic-addon1"
                            disabled
                            />
                          <InputGroup.Append>
                            <Button variant = "outline-light">
                              <img src = {iconEmail}
                                 alt = "A-Email"
                                 style = {{width: "25px", height:"25px"}}
                                 />
                             </Button>

                          </InputGroup.Append>
                        </InputGroup>
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
