import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Home from './components/Home/home.js';
import ManagePage from './components/MangePage/managePage.js';

import logo from './Image/logo.png';
class App extends Component{
  render(){
    return (

      <div>
        <header>
          <Navbar bg = "light" variant = "light" expand = "lg" fixed ="top">
            <Navbar.Brand href="/">
              <img alt="Logo" src = {logo} width="100" height="30" className="d-inline-block align-top fs-5"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className ="mr-auto">
                <Nav.Item>
                <Nav.Link href="home">About me</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="manage">Experience</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="link">Achievements</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="link">Timeline</Nav.Link>
                </Nav.Item>
                <NavDropdown bg = "info" title="More" id="collasible-nav-dropdown">
                  <Nav.Link href="link">Contact me</Nav.Link>
                </NavDropdown>
                </Nav>
                <Nav>
                <Button variant="primary-info" className = "mx-auto" href = "/managePage">
                  <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                      <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                  </svg>
                  </Button>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="primary-outline-info">Search</Button>
                </Form>
              </Nav>
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
