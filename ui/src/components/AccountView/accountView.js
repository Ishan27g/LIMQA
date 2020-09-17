import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./accountView.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import profile from '../../Image/profile.png';

class AccountView extends Component {

    render(){
        return(
            <body>
              <div className = "acc-set">
                <Container>

                  <Row className = "acc-header">
                    <h1>ACCOUNT SETTINGS</h1>
                  </Row>

                  <Row className = "acc-info justify-content-md-center">

                    <Col className = "acc-image">
                      <Image src={profile} roundedCircle
                              style = {{height: "10vmax", width: "10vmax"}}/>
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
                        <Button variant="outline-dark">Edit</Button>
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
            </body>
        )
    }
}
export default AccountView;
