import React, {Component} from 'react';
import axios from 'axios';
import './landingPage.css';

import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Fade from 'react-bootstrap/Fade';
import ListGroup from 'react-bootstrap/ListGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import Carousel from 'react-bootstrap/Carousel';


import UserList from './userList.js';
import UserCard from './userCard.js';


import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Landing extends Component{
  constructor(props){
    super(props);
    this.getUsers = this.getUsers.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {
      /*App states*/
      searching: false,

      /*User Search*/
      users: [],
      search: "",

      /*Login Values*/
      email: "",
      password: "",
      loginid: "",
    }
  }
  componentDidMount(){
    this.getUsers();
  };


  getUsers(){
    axios.get(http + '/api/users')
    .then(response => {
      this.setState({users: response.data.users});
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

    var searchUsers = this.state.users.filter(user => {
        if (this.state.search === "") {

            return("")

        } else {

          var name = user.name;
          const pattern = this.state.search.split("").map(letter => {
                    if(!("\\+*()?.,".includes(letter))) {
                      return `(?=.*${letter})`
                    } else {
                      return ""
                    }
                  }).join("");

          const regex = new RegExp(`${pattern}`, "g");

          return (name.toLowerCase().includes(this.state.search.toLowerCase())
                  || name.substring(0,3).match(regex))

        }
      }).sort((a,b)=> b["name"] - a["name"]).slice(0,4);

    let showUsers = searchUsers.map( searchedUser => {
      return (
        <UserList
          name = {searchedUser.name}
          email = {searchedUser.email}
          id = {searchedUser.id}/>
      )
    });

    let allUsers = this.state.users.map( cardUser =>{
      return (
        <UserCard
          name = {cardUser.name}
          email = {cardUser.email}
          id = {cardUser.id}
          bioinfo = {cardUser.bioinfo}
          social = {cardUser.social}/>
      )
    });

    var setUsers =[];
    for(var i= 0; i < allUsers.length; i=i+1){
      setUsers.push(
          <CardDeck className = "user-cards-columns">
            {allUsers.slice(i,i+1)}
          </CardDeck>
      )
    }

    let diplaySetUsers = setUsers.map(userDeck => {
      return(<Carousel.Item>{userDeck}</Carousel.Item>)
    });

    return (
      <div style={{overflowY:"scroll"}}>
        <Container className = "app-body">
          <Row className = "landing-header">
              Discover New Talents
          </Row>
          <Row className = "user-search">
            <FormControl type="text" size = "lg"
                          onChange = {this.onChangeSearch}
                          placeholder="Search Users"/>
          </Row>
          <Row className = "search-field">
            <Collapse in = {this.state.searching}>
              <ListGroup variant = "flush">{showUsers}</ListGroup>
            </Collapse>
          </Row>
          <Row className = "user-cards">
          <Fade in = {!(this.state.searching)}>
            {this.state.searching?
              (<div></div>)
              :(<Carousel interval = {10000}
                          className = "user-cards-carousel">
                          {diplaySetUsers}
                </Carousel>)
            }
          </Fade>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Landing;
