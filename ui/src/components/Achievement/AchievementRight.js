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
  setMessage() {
    if(!this.state.institution){
      this.state.institution = "Missing"
    }
  }
  render(){
    this.setMessage()
    return (
      <div>
      <Card className="outline right" style={{
          position:'relative',
          backgroundColor: 'white',
          width: "70vw",
          height: "30vh",
          top: "50px",
          marginBottom: "50px"}}>
      <Card.Img className="imgOutline rightImg" src={docIcon} style={{position:'relative', left:"80%",top:"4vh", width:"6.5vw", height:"17vh"}}/>
      <Card.Body style={{
            marginTop: "10px",
            background: "grey",
            width: "68vw",
            margin: "0 auto"
            }}>
        <Card.Title className="heading" style = {{position:'relative', left:"20%", bottom:"16vh", "font-size":"3vh", textAlign: "right", width:"59%"}}>{this.state.name}</Card.Title>
        <Card.Text className="desc" style = {{position:'relative', left:"20%", bottom:"16vh", "font-size":"2.5vh", color:"black", textAlign: "right", width:"59%" }}>
        {this.state.description}
        </Card.Text>
        <Card.Text className="misc" style = {{position:'relative', left:"20%", bottom:"12vh", "font-size":"2vh", textAlign: "right", width:"59%"}}>
        <b>Institution</b>: {this.state.institution}
        <br/>
        <b>Date</b>: {this.state.dateAchieved}
        </Card.Text>
      </Card.Body>
      </Card>
      </div>
    );
  }
}

export default CardRight;
