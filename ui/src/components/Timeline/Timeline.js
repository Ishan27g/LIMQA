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
      counter: 0
    };

    this.getUsername = this.getUsername.bind(this);
    this.getUserDocs = this.getUserDocs.bind(this);
    this.getUserCoverImages = this.getUserCoverImages.bind(this);
    this.getUserTags = this.getUserTags.bind(this);
  }

    componentDidMount(){
      this.getUsername();
      this.getUserDocs();
      this.getUserCoverImages();
      this.getUserTags();
    };

    getUsername(){
      const accurl = http + '/api/accSetting/' + this.state.userid;
      axios.get(accurl)
      .then(response => {
        var local_counter = this.state.counter + 1;
        this.setState({username: response.data.user.name},() => {this.setState({counter:  local_counter})});
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    getUserDocs(){
      const docurl =  http + '/api/documents/' + this.state.userid;
      axios.get(docurl)
      .then(response => {
        var local_counter = this.state.counter + 1;
        this.setState({userDocuments: response.data.documents},() => {this.setState({counter:  local_counter})});
        console.log(response.data.documents);
      })
      .catch(function(error) {
        console.log(error);
      });
    }


    getUserCoverImages(){
      axios.get(http + '/api/users/coverImages/' + this.state.userid)
      .then(response => {
        var coverImagesbyId = [];
        for (var i = 0; i < response.data.coverImages.coverImages.length; i++){
          coverImagesbyId.push(http + '/api/users/coverImages/' + this.state.userid +'/'+ i)
        }
        var local_counter = this.state.counter + 1;
        this.setState({userCoverImages: coverImagesbyId}, () => {this.setState({counter: local_counter})});
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    getUserTags(){
      axios.get(http + '/api/tags/' + this.state.userid)
      .then(response => {
        var local_counter = this.state.counter + 1;
        this.setState({userTags: response.data}, () => {this.setState({counter: local_counter})});
      })
      .catch(function(error) {
        console.log(error);
      });
    }

  render (){
    var date;
    var docCreationEvents = this.state.userDocuments.map(event => {
      var docTags = event.tags.map(tag =>{
          return (<Tag note = {tag.name}/>)
      });
      date = event.dateCreated.split("T")[0]
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
                     onClick = {event =>  window.location.href = '/documents/'+ event._id }/>,
                   //remove onCLick when MArker onclick works
        datetime: date,
        clickEvent:  '/documents/'+ event._id,
        photo : ""
      })
    });

    var docModifiedEvents = this.state.userDocuments.filter( modified =>{
      return modified.dateModified !== "";
    }).map(event => {
      var docTags = event.tags.map(tag =>{
          return (<Tag note = {tag.name}/>)
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
                     onClick = {event =>  window.location.href= '/documents/'+ event._id}/>,
        datetime: event.dateModified,
        photo : ""
      })
    });

    var profilePhotoEvent = {
      type: "photo",
      label: this.state.username + ' updated their profile photo',
      icon: <Image className = "icon-hover" alt = "photo" src = {photoIcon}
                   style = {{height:"50px", width: "50px"}}
                   onClick = {event =>  window.location.href= '/manage/' + this.state.userid}/>,
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
                   onClick = {event =>  window.location.href= '/manage/' + this.state.userid}/>,
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
                {this.state.username + ' created a new tag '}&nbsp;&nbsp;{<Tag note = {event.name} />}
            </div>,
      icon: <Image className = "icon-hover" alt = "tag" src = {tagIcon}
                   style = {{height:"50px", width: "50px"}}
                   onClick = {event =>  window.location.href= "/experience/" + this.state.userid}/>,
      datetime: event.dateAdded, /*Add DateAdded after response.data structure is created*/
      description: "",
      photo : ""
      })
    });



    var flattenedEvents = docCreationEvents.concat(profilePhotoEvent)
                                           .concat(docModifiedEvents)
                                           .concat(coverImagesEvent)
                                           .concat(newTagEvent)
                                           .sort((a,b) => -(b.datetime - a.datetime));


    var timelineMarker = flattenedEvents.map( event => {
      return(<CustomMarker event = {event} />)
    });

    /*console.log(docCreationEvents);
    console.log(docModifiedEvents);
    console.log(profilePhotoEvent);
    console.log(coverImagesEvent);
    console.log(newTagEvent);*/
    console.log(timelineMarker);
    console.log(this.state.counter)
    if(this.state.counter === 4){
      return (
          <div className = "timeline-body">
          <h2>Recent Activity</h2>
          <ActivityTimeline>
            {timelineMarker}
          </ActivityTimeline>
        </div>
      )
    } else {
      return(<div></div>)
    }

  }
} export default Timeline;
