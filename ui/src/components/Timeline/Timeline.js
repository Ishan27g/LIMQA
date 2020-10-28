import React, { Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Timeline.css';

import { ActivityTimeline } from 'react-rainbow-components';
import CustomMarker from './TimelineMarker.js';
import Image from 'react-bootstrap/Image';
import Tag from '../Tags/Tag.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from  'react-bootstrap/Col';
import Spinner from  'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import docIcon from '../../Image/documents.png';
import photoIcon from '../../Image/imageIcon.png';
import tagIcon from '../../Image/tagIcon.png';

import {pathForRequest} from '../http.js';

let http = pathForRequest();

class Timeline extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      userDocuments:[],
      userProfilePhoto:  http + '/api/users/profilePhoto/' + this.props.match.params.id,
      userCoverImages:[],
      userTags:[],
      userid: this.props.match.params.id,
      alertDisplay: false,
      bgClass: ""
    };

    this.getUsername = this.getUsername.bind(this);
    this.getUserDocs = this.getUserDocs.bind(this);
    this.getUserCoverImages = this.getUserCoverImages.bind(this);
    this.getUserTags = this.getUserTags.bind(this);
    this.getBgGradient =this.getBgGradient.bind(this);
  }

    componentDidMount(){
      this.getUsername();
      this.getBgGradient();
    };

    getBgGradient(){
      const bgUrl = http+'/api/users/bgImage/'+this.props.match.params.id;
      axios.get(bgUrl)
      .then(response => {
        this.setState({
          bgClass: response.data.bgImage
        })
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    getUsername(){
      const accurl = http + '/api/accSetting/' + this.state.userid;
      axios.get(accurl)
      .then(response => {
        this.setState({username: response.data.user.name},() => {this.getUserTags()});
      })
      .catch(function(error) {
        console.log(error);
        console.log("LEVEL 1 FAILED");
      });
    }

    getUserTags(){
      axios.get(http + '/api/tags/' + this.state.userid)
      .then(response => {
        this.setState({userTags: response.data}, () => {this.getUserCoverImages()});
      })
      .catch(function(error) {
        console.log(error);
        console.log("LEVEL 2 FAILED");
      });
    }

    getUserCoverImages(){
      axios.get(http + '/api/users/coverImages/' + this.state.userid)
      .then(response => {
        console.log(response.data);
        var coverImagesbyId = [];
        for (var i = 0; i < response.data.coverImages.coverImages.length; i++){
          coverImagesbyId.push(http + '/api/users/coverImages/' + this.state.userid +'/'+ i)
        }
        this.setState({userCoverImages: coverImagesbyId}, () => {this.getUserDocs()});
      })
      .catch(function(error) {
        console.log(error);
        console.log("LEVEL 3 FAILED");
      });
    }

    getUserDocs(){
      const docurl =  http + '/api/documents/' + this.state.userid;
      axios.get(docurl)
      .then(response => {
        this.setState({userDocuments: response.data.documents}, () => this.setState({alertDisplay: true}));
      })
      .catch(function(error) {
        console.log(error);
        console.log("LEVEL 4 FAILED");
      });
    }






  render (){
    var docCreationEvents = this.state.userDocuments.map(event => {
      var docTags = event.tags.map(tag =>{
        return (<div className = "mr-sm-2">
                  <Tag  note = {tag.name} variant = {tag.color}/>
                </div>)
      });
      /*date = event.dateCreated.split("T")[0]*/
      return ({
        type: "document",
        label: this.state.username + ' uploaded ' + event.name.split(".")[0],
        description: <Container>
                      <Row>
                        {event.description}
                      </Row>
                      <Row style ={{fontSize: "1.1em"}}>
                        Related Tags
                      </Row>
                      <Row>
                        {docTags}
                      </Row>
                    </Container>,
        icon: <Image className = "icon-hover" alt = "document" src = {docIcon}
                     style = {{height:"65px", width: "50px"}}
                     onClick = { e =>  window.location.href = '/documents/'+ event._id }/>,
                   //remove onCLick when MArker onclick works
        datetime: event.dateCreated,
        clickEvent:  '/documents/'+ event._id,
        photo : ""
      })
    });

    var docModifiedEvents = this.state.userDocuments.filter( modified =>{
      return modified.dateModified !== "";
    }).map(event => {
      var docTags = event.tags.map(tag =>{
          return (<div className = "mr-sm-2">
                    <Tag  note = {tag.name} variant = {tag.color}/>
                  </div>)
      });
      return ({
        type: "document",
        label: this.state.username + ' modified ' + event.name.split(".")[0],
        description: <Container>
                      <Row>
                        {event.description}
                      </Row>
                      <Row style ={{fontSize: "1.1em"}}>
                        Related Tags
                      </Row>
                      <Row>
                        {docTags}
                      </Row>
                    </Container>,
        icon: <Image className = "icon-hover" alt = "document" src = {docIcon}
                     style = {{height:"65px", width: "50px"}}
                     onClick = {e =>  window.location.href= '/documents/'+ event._id}/>,
        datetime: event.dateModified,
        photo : ""
      })
    });

    var profilePhotoEvent = {
      type: "photo",
      label: this.state.username + ' updated their profile photo',
      icon: <Image className = "icon-hover" alt = "photo" src = {photoIcon}
                   style = {{height:"50px", width: "50px"}}
                   onClick = {event =>  window.location.href= '/home/' + this.state.userid}/>,
      datetime: "2020-10-19T04:23:28.855Z", /*Add DateAdded after response.data structure is created*/
      description: "",
      photo : this.state.userProfilePhoto
      /*Send photo to create card */
    };

    var coverImagesEvent = this.state.userCoverImages.map(event => {
      return ({
      type: "photo",
      label: this.state.username + ' added a cover image',
      icon: <Image className = "icon-hover" alt = "photo" src = {photoIcon}
                   style = {{height:"50px", width: "50px"}}
                   onClick = {e =>  window.location.href= '/home/' + this.state.userid}/>,
      datetime: "2020-10-19T04:23:28.855Z",/*Add DateAdded after response.data structure is created*/
      description: "",
      photo : event
      /*Send photo to create card */
      })
    });

    var newTagEvent = this.state.userTags.map(event => {
      return ({
      type: "tag",
      label: <div>
                {this.state.username + ' created a new tag '}&nbsp;&nbsp;{<Tag note = {event.name} variant = {event.color}/>}
            </div>,
      icon: <Image className = "icon-hover" alt = "tag" src = {tagIcon}
                   style = {{height:"50px", width: "50px"}}
                   onClick = {event =>  window.location.href= "/search/" + this.state.userid}/>,
      datetime: event.dateAdded, /*Add DateAdded after response.data structure is created*/
      description: "",
      photo : ""
      })
    });

    /*console.log(docCreationEvents);
    console.log(docModifiedEvents);
    console.log(profilePhotoEvent);
    console.log(coverImagesEvent);
    console.log(newTagEvent);
    console.log(timelineMarker);
    console.log(this.state.alertDisplay);*/

    if(this.state.alertDisplay){
      var flattenedEvents = docModifiedEvents.concat(profilePhotoEvent)
                                             .concat(docCreationEvents)
                                             .concat(coverImagesEvent)
                                             .concat(newTagEvent)
                                             .sort((a,b) => (
                                               new Date(b.datetime).getTime()
                                             - new Date(a.datetime).getTime()));

      var timelineMarker = flattenedEvents.map( event => {
        return(<CustomMarker event = {event} />)
      });
      return (
        <body className = {this.state.bgClass}>
          <div className = "timeline-body">
            <h2>Recent Activity</h2>
            <ActivityTimeline>
              {timelineMarker}
            </ActivityTimeline>
          </div>
        </body>

      )
    } else {
      return(
      <body className = "app-background">
        <Container fluid className = "default-timeline-body">
          <Row>
            <Spinner animation="border" />
          </Row>
          <Row>
            <h2>Want a Timeline?</h2>
          </Row>
          <Row>
            <h3>Get the following on your profile today!</h3>
          </Row>
          <Row>
              <OverlayTrigger placement="top"
                              delay={{ hide: 100 }}
                              overlay={
                                <Tooltip>Photos</Tooltip>
                              }>
              <Image className = "icon-hover mr-sm-2" alt = "photo" src = {photoIcon}
                     style = {{height:"50px", width: "50px"}}
                     onClick = {event =>  window.location.href= '/manage/' + this.state.userid}/>
              </OverlayTrigger>

              <OverlayTrigger placement="top"
                              delay={{ hide: 100 }}
                              overlay={
                                <Tooltip>Documents</Tooltip>
                              }>
              <Image className = "icon-hover mr-sm-2" alt = "document" src = {docIcon}
                   style = {{height:"50px", width: "50px"}}
                   onClick = {event =>  window.location.href= '/manage/' + this.state.userid}/>
             </OverlayTrigger>

             <OverlayTrigger placement="top"
                             delay={{ hide: 100 }}
                             overlay={
                               <Tooltip>Tags</Tooltip>
                             }>
             <Image className = "icon-hover" alt = "tags" src = {tagIcon}
                  style = {{height:"50px", width: "50px"}}
                  onClick = {event =>  window.location.href= '/manage/' + this.state.userid}/>
             </OverlayTrigger>
          </Row>
        </Container>
      </body>

      )
    }

  }
} export default Timeline;
