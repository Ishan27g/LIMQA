import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import docImage from '../../Image/documents.png';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Search extends Component{
  constructor(props){
    super(props);
    this.getDocs = this.getDocs.bind(this);
    this.getTags = this.getTags.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);

    this.state = {
      /*App states*/
      searching: false,

      /*Documents Search*/
      documents: [],
      tags: [],
      search: "",
      userId: this.props.match.params.id,
      searchMethod: "Title",
    }
  }
  componentDidMount(){
    this.getDocs();
    this.getTags();
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

  getTags(){
    axios.get(http+'/api/tags/'+this.state.userId)
    .then(response => {
      this.setState({tags: response.data});
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  handleMethodChange(e){
    if(e.target.innerHTML === 'Title'){
      this.setState({
        searchMethod: "Title",
        search: "",
        searching: false
      })
    }
    if(e.target.innerHTML === 'Tag'){
      this.setState({
        searchMethod: "Tag",
        search: "Default;",
        searching: false
      })
    }
  }

  intersection() {
    var result = [];
    var lists;
    
    if(arguments.length === 1) {
      lists = arguments[0];
    } else {
      lists = arguments;
    }
    
    for(var i = 0; i < lists.length; i++) {
      var currentList = lists[i];
      for(var y = 0; y < currentList.length; y++) {
        var currentValue = currentList[y];
        if(result.indexOf(currentValue) === -1) {
          if(lists.filter(function(obj) { return obj.indexOf(currentValue) === -1 }).length === 0) {
            result.push(currentValue);
          }
        }
      }
    }
    return result;
  }

  onChangeTag(e){
    if (this.state.search === ""){
      this.setState({
        searching: true,
        search: e.target.innerHTML + ';'
      })
    }else{
      var tempTag = this.state.search.split(";");
      tempTag.pop();
      if (tempTag.includes(e.target.innerHTML)){
        if(e.target.innerHTML !== "Default"){
          var index = tempTag.indexOf(e.target.innerHTML);
          tempTag.splice(index, 1);
          var i;
          var tempString = tempTag[0];
          for(i=1; i<tempTag.length; i++){
            tempString = tempString + ";" + tempTag[i]
          }
          tempString = tempString + ";"
          this.setState({
            search: tempString
          })
        }
      }else{
        this.setState({
          searching: true,
          search: this.state.search + e.target.innerHTML + ';'
        })
      }
    }
  }

render(){
  
  var tags = this.state.tags;
  var tagNames = [];
  let tagsMap = tags.map(tags =>{
    tagNames.push(tags.name);
      return(
          <Button onClick={this.onChangeTag}>{tags.name}</Button>
      )
  })

  var searchDocs = this.state.documents

  if(this.state.searchMethod === "Title"){
    searchDocs = this.state.documents.filter(doc => {
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

        return (name.toLowerCase().includes(this.state.search.toLowerCase()) || name.match(regex))

      }
    }).sort((a,b)=> b["name"] - a["name"]).slice(0,7);

    }else{
      if (this.state.search !== ""){
        var selectTags = this.state.search.split(";");
        var tempTagWithDoc = [];
        var i;
        for(i=0; i<selectTags.length; i++){
          var j;
          for(j=0; j<tagNames.length; j++){
            if(selectTags[i] === tagNames[j]){
              tempTagWithDoc.push(this.state.tags[j].files);
            }
          }
        }
        tempTagWithDoc = this.intersection(tempTagWithDoc);
        searchDocs = this.state.documents.filter(function(document){
          return tempTagWithDoc.includes(document._id)
        });

      }
    }
    
      
    let showDocs = searchDocs.map( searchedDoc => {
        return (
            <Col sm='3' >
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
                    <Card.Body onClick = {event =>  window.location.href = '/documents/'+ cardDoc._id }>
                    <Card.Title>
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
            <Container style={{marginBottom:"5rem"}} fluid>
                <Row className = "landing-header">
                    Discover documents
                </Row>
                <Row className = "landing-header">
                  <Button variant='primary' size='lg' onClick= {this.handleMethodChange}>Title</Button>
                  <Button variant='secondary' size='lg'onClick= {this.handleMethodChange} >Tag</Button>
                </Row>
                <Row className = "user-search">
                {this.state.searchMethod === "Title"?(
                  <FormControl type="text" size = "lg"
                  onChange = {this.onChangeSearch}
                  value = {this.state.search}
                  placeholder="Search documents by Titles"/>
                ):(
                  <FormControl type="text" size = "lg"
                  onChange = {this.onChangeSearch}
                  value = {this.state.search}
                  placeholder="Search documents by Tags"
                  readOnly />
                )}
                </Row>
                {this.state.searchMethod === "Title"?(
                  <br />
                ):(
                  <Row className = "user-search">
                  {tagsMap}
                  </Row>
                )}
               
                {this.state.searching ? (
                    <Container>
                        <div class="row justify-content-md-center" style={{marginTop:"2rem"}}>
                            {showDocs}
                        </div>
                    </Container>
                ):(
                    <Container>
                        <div class="row justify-content-md-center" style={{marginTop:"2rem"}}>
                            {alldocs}
                        </div>
                    </Container>
                )}
            </Container>
        </body>

    )
  }
}
export default Search;