import React, {Component} from 'react';
import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ManagePage from './components/ManagePage/ManagePage.js';
import Register from './components/SignUp/register.js';
import Landing from './components/LandingPage/landingPage.js';
import NotFound from './components/NotFound.js';

class App extends Component{

  render(){

    return (
      <div>
      {<BrowserRouter>
        <Switch>
          <Route path="/" component ={Landing} exact/>\
          <Route path="/register" component={Register}/>
          <Route path="/notfound" render = {() => <NotFound link = "/"/> }/>
          <Route render={() => <Redirect to={{pathname: "/notfound"}} />} />

          /*{this.state.login? (
              <Route path="/manage"
                      render = {() => <ManagePage id = {this.state.loginid} />}/>)
            :(<Route path="/manage" component={NotFound}/>)}*/
        </Switch>
      </BrowserRouter>}
      </div>
    )
  }
}
export default App;
