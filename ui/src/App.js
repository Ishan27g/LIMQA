import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';

import Home from './components/Home/home.js';
import ManagePage from './components/MangePage/managePage.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar>
          
        </Navbar>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          111 Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
