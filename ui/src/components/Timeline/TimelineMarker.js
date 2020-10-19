import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Timeline.css';

import { Card, TimelineMarker } from 'react-rainbow-components';

 /* Fallback Icon */
class CustomMarker extends Component{
  constructor(props){
    super(props);

    this.state = {
      type: this.props.event.type,
      label: this.props.event.label,
      icon: this.props.event.icon,
      datetime: this.props.event.datetime,
      description: this.props.event.description,
      photo: this.props.event.photo
    }
  }
  render(){
    //redirect to document viewer
    return(
        <TimelineMarker
        className = "timeline-marker"
        label= {this.state.label}
        icon = {this.state.icon}
        datetime = {this.state.datetime} /*Add System Clock*/
        description= {this.state.description} >
        {this.state.type === "photo"?
          (<Card>
             <img src = {this.state.photo}
                  alt = {this.state.type}
                  style = {{height: "15vmax", width:"auto"}}/>
         </Card>)
         :(<div></div>)}
       </TimelineMarker>
    )
  }
} export default CustomMarker;
