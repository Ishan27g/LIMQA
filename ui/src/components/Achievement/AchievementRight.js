import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import docIcon from '../../Image/documents.png';

class CardRight extends Component{
  constructor(props){
    super(props);
    this.state = {
    name: this.props.name,
    description: this.props.description,
    institution: this.props.institution,
    dateAchieved: this.props.dateAchieved
    }
  }

  render(){
    return (
      <Card>
      <Card.Img src={docIcon} style = {{width: "15vmax", height:"12vmax"}}/>
      <Card.Body>
        <Card.Title><h6>{this.state.name}</h6></Card.Title>
        <Card.Text>
        {this.state.description}
        </Card.Text>
        <Card.Text>
          <p>Institution</p>: {this.state.institution}
          <br/>
          <p>Date</p>: {this.state.dateAchieved}
        </Card.Text>
      </Card.Body>
      </Card>
    );
  }
}

export default CardRight;
