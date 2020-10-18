import React, { Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Timeline.css';

import { Card, ActivityTimeline, TimelineMarker } from 'react-rainbow-components';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Timeline extends Component {
  constructor(props){
    super(props);
    this.state = {
      userdocs: [],
      userid: this.props.match.params.id
    }
    this.getUserDocs = this.getUserDocs.bind(this)

  }

  componentDidMount(){
    this.getUserDocs();
  };

  getUserDocs(){
    axios.post(http + '/api/documents/' + this.state.userid)
    .then(response => {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render (){
    return (
      <div className = "app-body">
        <ActivityTimeline>
          <TimelineMarker
              label="User Sign Up."
              datetime = "Yesterday"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore etdolore magna aliqua."
          />
        </ActivityTimeline>
      </div>
    )
  }
} export default Timeline;
