
import React, {Component} from "react";
import axios from "axios";
import './Achievement.css';
import Container from "react-bootstrap/Container";

import CardRight from './AchievementRight';
import CardLeft from './AchievementLeft';




import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Achievements extends Component{
  constructor(props){
    super(props);
    this.state = {
      documents: [{name: 'A', description: 'alot has happened in te lst dor djkwqufdwebdebvwhjfdge ehqwkfruwf wfejwhfuhuhdekjwenc hfwkjafj.rjfareigs jfaljfijresvnjkewjoidjdw dljwio', achivement: true, Institution: 'SPV', dateAchieved:'11-12-14', highlighted: false }, 
        {name: 'B', description: 'b', achivement: true, Institution: 'Unimelb', dateAchieved: '12-13-14', highlighted: false}],
      //userId: this.props.match.params.id,
    }
  }

  componentDidMount(){
    axios.get(http+'/api/documents/'+this.state.userId)
      .then(res =>{
          this.setState({
              documents: res.data.documents,
          })
      })
      .catch(function(error) {
          console.log(error);
      })
  }


  render(){
    var counter = 2;
    var aDoc = this.state.documents.filter(document => {
      return document.achivement === true;
    });

    var achievementDoc = aDoc.map(doc =>{
      return(
        <CardLeft
          name={doc.name}
          description={doc.description}
          institution={doc.Institution}
          dateAchieved={doc.dateAchieved} />
      )
      /*if (counter%2 === 0){)
        counter = 1;
        return (
          <CardLeft name={doc.name} description={doc.description} institution={doc.Institution} dateAchieved={doc.dateAchieved} />
      )
        }
      else {
        counter = 2;
        return (
          <CardRight name={doc.name} description={doc.description} institution={doc.Institution} dateAchieved={doc.dateAchieved} />
      )
      }*/
    });

    return (
      <Container fluid bg = "dark" className = "ac-body">
        {achievementDoc}
      </Container>
    );
  }
}

export default Achievements;
