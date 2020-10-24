import React from 'react';
import Card from "react-bootstrap/Card";
import docIcon from './documents.png';

class CardLeft extends React.Component{
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
      <Card style={{
          position:'relative', 
          backgroundColor: '#d9b382', 
          width: "1000px",
          height: "250px", 
          top: "50px",
          margin: "0 auto",
          marginBottom: "30px"}}>
      <Card.Img src={docIcon} style={{position:'relative', left:"140px", top:"50px"}} width="120" height="150"/>
      <Card.Body>
        <Card.Title style = {{position:'relative', left:"270px", bottom:"150px"}}><h2>{this.state.name}</h2></Card.Title>
        <Card.Text style = {{position:'relative', left:"270px", bottom:"160px", "font-size":"20px", width: "590px" }}>
        {this.state.description}
        </Card.Text>
        <Card.Text style = {{position:'relative', left:"270px", bottom:"160px", "font-size":"20px" }}>
        <b>Institution</b>: {this.state.institution} 
        <br/>
        <b>Date</b>: {this.state.dateAchieved}
        </Card.Text>
      </Card.Body>
      </Card>
    );          
  }
}
  
export default CardLeft;