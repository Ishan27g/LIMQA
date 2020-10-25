import React from 'react';
import Card from "react-bootstrap/Card";
import docIcon from './documents.png';
import './Card.css'
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
      <Card className="outline left" /*style={{
          position:'relative', 
          backgroundColor: '#d9b382', 
          width: "70vw",
          height: "30vh", 
          top: "50px",
          margin: "0 auto",
          marginBottom: "30px"}}*/>
      <Card.Img className="imgOutline leftImg" src={docIcon} /*style={{position:'relative', left:"10%", top:"24%", width:"6.5vw", height:"17vh"}}*/ />
      <Card.Body>
        <Card.Title className="heading" /*style = {{position:'relative', left:"20%", bottom:"15vh", "font-size":"2vh"}}*/><h2>{this.state.name}</h2></Card.Title>
        <Card.Text className="desc" /*style = {{position:'relative', left:"20%", bottom:"15vh", "font-size":"2.5vh", width: "60%" }}*/>
        {this.state.description}
        </Card.Text>
        <Card.Text className="misc" /*style = {{position:'relative', left:"20%", bottom:"15vh", "font-size":"2vh" }}*/>
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