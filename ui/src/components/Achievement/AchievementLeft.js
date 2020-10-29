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

  setMessage() {
    if(!this.state.institution){
      this.state.institution = "Missing"
    }
  }
  render(){
    this.setMessage()
    return (
      <div>
        <Card style={{
            position:'relative',
            background: "grey",
            width: "70vw",
            height: "30vh",
            top: "50px",
            margin: "0 auto",
            marginBottom: "50px"}}>
          <Card.Img src={docIcon} style={{position:'relative', left:"10%", top: "4vh", width:"6.5vw", height:"17vh"}}/>
          <Card.Body style={{
            width:"68vw",
            marginTop: "10px",
            background: "white",
            margin: "0 auto"
            }}>
            <Card.Title style = {{position:'relative', left:"20%", bottom:"18vh", "font-size":"3vh", color:"white"}}>
              {this.state.name}
            </Card.Title>    
            <Card.Text className="desc" style = {{position:'relative', left:"20%", bottom:"18vh", "font-size":"2.5vh", width: "60%" }}>
              {this.state.description}
            </Card.Text>
            <Card.Text className="misc" style = {{position:'relative', left:"20%", bottom:"15vh", "font-size":"2vh" , color:"black"}}> 
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

export default CardLeft;
