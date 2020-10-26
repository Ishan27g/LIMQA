import React, {Component} from "react";
import './Achievement.css';
import Row from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import docIcon from '../../Image/documents.png';

class CardLeft extends Component{
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
          <Row>
            <Col className = "ac-image" sm = {3}>
              <Image src={docIcon} style = {{width: "10vmax", height:"14vmax"}}/>
            </Col>
            <Col sm = {7}>
              <Row>
                <h4>{this.state.name}</h4>
              </Row>
              <Row>
                  <h5>{this.state.description}</h5>
              </Row>
              <Row>
                <h5>Institution: {this.state.institution}</h5>
              </Row>
              <Row style ={{display: 'flex', alignItems: "center", justifyContent: "flex-start"}}>
                <h5>Date: {this.state.dateAchieved}</h5>
              </Row>

            </Col>
          </Row>
    );
  }
}

export default CardLeft;
