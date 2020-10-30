import React, { Component } from 'react';
import axios from 'axios';

import CardLeft from './AchievementLeft';
import CardRight from './AchievementRight';


import CardDeck from "react-bootstrap/CardDeck";


import {pathForRequest} from '../http.js';
let http = pathForRequest();
class Achievements extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      documents: [],
      userId: this.props.match.params.id,
      bgClass: ""

    }

    this.getBgGradient =this.getBgGradient.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount(){
    this.getBgGradient();
    this.getUsername();
    axios.get(http+'/api/documents/'+this.state.userId)
      .then(res =>{
          this.setState({
              documents: res.data.documents,
          })
      })
      .catch(function(error) {
          console.log(error);
      });
  }

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
    const accurl = http + '/api/accSetting/' + this.state.userId;
    axios.get(accurl)
    .then(response => {
      this.setState({username: response.data.user.name});
    })
    .catch(function(error) {
      console.log(error);
      console.log("LEVEL 1 FAILED");
    });
  }

  render(){
    var counter = 2;
    var aDoc = this.state.documents.filter(document => {
      return document.achivement === true;
    }).sort((a,b) => (new Date(b.dateAchieved).getTime()
                  - new Date(a.dateAchieved).getTime()));

    let achievementDoc = aDoc.map(doc =>{
      if (counter%2 === 0){
        counter = 1;
        return (
          <CardLeft name={doc.name} description={doc.description} institution={doc.Institution} dateAchieved={doc.dateAchieved} />
      );
        }
      else {
        counter = 2;
        return (
          <CardRight name={doc.name} description={doc.description} institution={doc.Institution} dateAchieved={doc.dateAchieved} />
      );
      }
    });

    return (
      <body className = {this.state.bgClass}>
        <div className = "pt-2">
          <h2>{this.state.username + "'s Achievements"}</h2>
        </div>
          <CardDeck style = {{marginRight: "10vw", marginLeft: "13vw", paddingBottom: "50px"}}>
          {achievementDoc}
          </CardDeck>
      </body>
    );
  }
}

export default Achievements;
