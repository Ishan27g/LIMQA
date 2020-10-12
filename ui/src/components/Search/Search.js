import React, {Component} from 'react';
import axios from 'axios';

import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import docImage from '../../Image/documents.png';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Search extends Component{
  constructor(props){
    super(props);
    this.getDocs = this.getDocs.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {
      /*App states*/
      searching: false,

      /*Documents Search*/
      documents: [],
      search: "",
      userId: this.props.match.params.id,

      /*Login Values*/
      email: "",
      password: "",
      loginid: "",
    }
  }
  componentDidMount(){
    this.getDocs();
  };


  getDocs(){
    axios.get(http+'/api/documents/'+this.state.userId)
    .then(response => {
      this.setState({documents: response.data.documents});
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onChangeSearch(e){
    if (e.target.value === ""){	
      this.setState({	
        search: e.target.value,	
        searching: false	
      });	
    } else {	
      this.setState({	
        search: e.target.value,	
        searching: true	
      });	
    }	

  }

render(){

    var searchDocs = this.state.documents.filter(doc => {
        if (this.state.search === "") {

            return("")

        } else {

          var name = doc.name;
          const pattern = this.state.search.split("").map(letter => {
                    if(!("\\+*()?.,".includes(letter))) {
                      return `(?=.*${letter})`
                    } else {
                      return ""
                    }
                  }).join("");

          const regex = new RegExp(`${pattern}`, "g");

          return (name.toLowerCase().includes(this.state.search.toLowerCase())
                  || name.match(regex))

        }
      }).sort((a,b)=> b["name"] - a["name"]).slice(0,7);
      
    let showDocs = searchDocs.map( searchedDoc => {
        return (
            <Col sm='3'>
                <div>
                <Card className='documentsCard' >
                    <Card.Img variant='top' src={docImage}/>
                    <Card.Body>
                    <Card.Title onClick = {event =>  window.location.href = '/documents/'+ searchedDoc._id }>
                        {searchedDoc.name}
                    </Card.Title>
                    </Card.Body>
                </Card>
                </div>
            </Col>
        )
    });

    let alldocs = this.state.documents.map( cardDoc =>{
        return (
            <Col sm='3' style = {{marginTop:"3vmax"}}>
                <div>
                <Card className='documentsCard' >
                    <Card.Img variant='top' src={docImage}/>
                    <Card.Body>
                    <Card.Title onClick = {event =>  window.location.href = '/documents/'+ cardDoc._id }>
                        {cardDoc.name}
                    </Card.Title>
                    </Card.Body>
                </Card>
                </div>
            </Col>
        )
    });

    return (
        <body>
            <Container fluid style={{marginBottom:"5rem"}}>
                <Row className = "landing-header">
                    Discover documents
                </Row>
                <Row className = "user-search">
                <FormControl type="text" size = "lg"
                                onChange = {this.onChangeSearch}
                                placeholder="Search documents"/>
                </Row>
            
                {this.state.searching ? (
                    <Row style = {{marginTop:"1rem"}}>
                        {showDocs}
                    </Row>
                ):(
                    <Row style = {{marginTop:"1rem"}}>
                        <ListGroup variant = "flush">{alldocs}</ListGroup>
                    </Row>
                )}
            </Container>
        </body>
    )
  }
}
export default Search;