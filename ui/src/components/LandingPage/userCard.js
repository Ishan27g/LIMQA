import React, {Component} from 'react';
import './landingPage.css';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import profile from '../../Image/profile.png';
import iconFacebook from '../../Image/Facebook.png';
import iconInstagram from '../../Image/Instagram.png';
import iconLinkedin from '../../Image/Linkedin.png';
import iconGithub from '../../Image/Github.png';
import iconWechat from '../../Image/Wechat.png';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class UserCard extends Component{

    render(){
        var socials = this.props.social;

        var Linkedin = socials.filter( social =>
            {return social.name === "Linkedin"}
        )[0].url;
        var Facebook = socials.filter( social =>
            {return social.name === "Facebook"}
        )[0].url;
        var Instagram = socials.filter(social =>
              {return social.name === "Instagram"}
        )[0].url;
        var Github = socials.filter(social =>
              {return social.name === "Github"}
        )[0].url;
        var WeChat = socials.filter(social =>
              {return social.name === "Wechat"}
        )[0].url;

        return (
                <Card className = "user-card"
                  style={{ 
                        backgroundColor: "rgba(0,0,0,0)",
                        color: "white",
                        textAlign: "center",
                        fontSize: "2em",
                        fontfamily: "Roboto, sans-serif",
                        fontWeight: "bolder",
                        height: "auto"}}
                  bg = "light">

                  <Image variant="top" src={http+'/api/users/profilePhoto/'+this.props.id}
                            onError={(e)=>{e.target.onerror = null; e.target.src=profile}}
                            style = {{width: "10vmax", height: "10vmax", alignSelf: "center"}}
                            roundedCircle/>

                  <Card.Title style = {{fontSize: "1.25em", color: "black"}}
                              onClick = {event =>  window.location.href = '/home/'+this.props.id }>
                              {this.props.name}

                              <Card.Text style = {{fontSize: "0.5em", color: "grey"}}>
                                  {this.props.email}
                                </Card.Text>
                  </Card.Title>
                  <Card.Body style={{
                          backgroundColor: "rgba(180,180,180,0.5)",
                          height: "7rem"
                          }}>
                  <Card.Text style = {{fontSize: "0.6em", color: "black", margin:"0 auto", border:"red"}}>
                      {this.props.bioinfo}
                  </Card.Text>
                  </Card.Body>
                  <Card.Footer style = {{display: "flex", justifyContent: "space-between"}}>
                    <Image onClick= {event => window.location.href = Facebook}
                            src = {iconFacebook}
                            style = {{width: "2vmax", height: "2vmax"}} />
                    <Image onClick= {event => window.location.href = Instagram}
                            src = {iconInstagram}
                            style = {{width: "2vmax", height: "2vmax"}} />
                    <Image onClick= {event => window.location.href = Linkedin}
                            src = {iconLinkedin}
                            style = {{width: "2vmax", height: "2vmax"}} />
                    <Image onClick= {event => window.location.href = Github}
                            src = {iconGithub}
                            style = {{width: "2vmax", height: "2vmax"}} />
                    <Image onClick= {event => window.location.href = WeChat}
                            src = {iconWechat}
                            style = {{width: "2vmax", height: "2vmax"}} />
                  </Card.Footer>
                </Card>
        )
    }
}

export default UserCard;
