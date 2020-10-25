import React from 'react';
import Card from "react-bootstrap/Card";
import docIcon from '../../Image/documents.png';
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
          background: "grey",
          width: "70vw",
          height: "30vh",
          top: "50px",
          margin: "0 auto",
          marginBottom: "100px"}}>
        <Card.Img src={docIcon} style={{position:'relative', left:"10%", top:"14%", width:"6.5vw", height:"17vh"}} />
        <Card.Body style={{
          background: "white",
          width: "79.9vw"
          }}>
          <Card.Title style = {{position:'relative',right:"22%", bottom:"15vh", "font-size":"4vh", fontWeight:"bold"}}>
            {this.state.name}
          </Card.Title>    
          <Card.Text style = {{position:'relative',right:"0.4%", bottom:"15vh", "font-size":"2.5vh", width: "60%" }}>
            {this.state.description}
          </Card.Text>
          <Card.Text style = {{position:'relative', right:"26.7%", bottom:"13vh", "font-size":"2vh", color:"black"}}>
          <b>Institution</b>: {this.state.institution}
          </Card.Text>
          <Card.Text style = {{position:'relative', right:"20.4%", bottom:"15vh", "font-size":"2vh", color:"black"}}>
          <b>Date</b>: {this.state.dateAchieved}
          </Card.Text>
        </Card.Body>
      </Card>
    
    );
  }
}

export default CardLeft;
