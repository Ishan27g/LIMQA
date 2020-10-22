
import React, {Component} from "react";
import axios from "axios";
import CardDeck from "react-bootstrap/CardDeck";

import CardRight from './AchievementRight';
import CardLeft from './AchievementLeft';




import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Achievements extends Component{
  constructor(props){
    super(props);
    this.state = {
      documents: [],
      /*[{name: 'A', description: 'a', achivement: true, Institution: 'SPV', dateAchieved:'11-12-14', highlighted: false },
        {name: 'B', description: 'b', achivement: true, Institution: 'Unimelb', dateAchieved: '12-13-14', highlighted: false}]*/
      userId: this.props.match.params.id,
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

    let achievementDoc = aDoc.map(doc =>{
      if (counter%2 === 0){
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
      }
    });

    return (
      <CardDeck>
      {achievementDoc}
      </CardDeck>
    );
  }
}

export default Achievements;
