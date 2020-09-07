import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Home from './components/Home/Home.js';
import ManagePage from './components/MangePage/ManagePage.js';

class App extends Component{
  render(){
    return (

      <div>
        <header>
          <Navbar bg="light" expand="lg" fixed="top" >
            <Navbar.Brand href="/">Home icon</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="home">About me</Nav.Link>
                <Nav.Link href="manage">Experience</Nav.Link>
                <Nav.Link href="link">Achievements</Nav.Link>
                <Nav.Link href="link">Timeline</Nav.Link>
                <Nav.Link href="link">Contact me</Nav.Link>
              </Nav>
              <Form inline>
                <Button variant="outline-info">Log in</Button>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </header>
        {<BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/managepage" component={ManagePage} exact/>
          </Switch>
        </BrowserRouter>}
      </div>
    );
  }
}

export default App;
