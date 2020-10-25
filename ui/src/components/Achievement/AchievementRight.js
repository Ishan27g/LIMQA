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
      <Card className="outline right" style={{
          position:'relative',
          backgroundColor: 'black',
          width: "70vw",
          height: "30vh",
          top: "50px",
          margin: "0 auto",
          marginBottom: "100px"}}>
      <Card.Img className="imgOutline rightImg" src={docIcon} style={{position:'relative', left:"80%", top:"24%", width:"6.5vw", height:"17vh"}}/>
      <Card.Body>
        <Card.Title className="heading" style = {{position:'relative', left:"20%", bottom:"15vh", "font-size":"2vh"}}>{this.state.name}</Card.Title>
        <Card.Text className="desc" style = {{position:'relative', left:"20%", bottom:"15vh", "font-size":"2.5vh", width: "80%" }}>
        {this.state.description}
        </Card.Text>
        <Card.Text className="misc" style = {{position:'relative', left:"20%", bottom:"15vh", "font-size":"2vh" }}>
        <b>Institution</b>: {this.state.institution}
        <br/>
        <b>Date</b>: {this.state.dateAchieved}
        </Card.Text>
      </Card.Body>
      </Card>
    );
  }
}

export default CardRight;
