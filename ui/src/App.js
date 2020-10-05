import React, {Component} from 'react';
import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ManagePage from './components/ManagePage/ManagePage.js';
import Register from './components/SignUp/register.js';
import Landing from './components/LandingPage/landingPage.js';
import NotFound from './components/NotFound.js';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      login: false,
      user_redirect: ""
    }

  }
  handleLoginStatus = e => this.setState({login: e.target.value});
  handleRedirect = e => this.setState({user_redirect: e.target.value});

  render(){


    return (
      <div>
      {<BrowserRouter>
        <Switch>
          <Route path="/" render = {() => <Landing onChangeLogin = {this.handleLoginStatus}
                                                   redirect = {this.handleRedirect}/> } exact/>
          {this.state.login?
            (<Route path="/manage" component={ManagePage}/>)
            :
            (<Route path="/" exact />)
            }
          <Route path="/register" component={Register}/>
          <Route path="/notfound" render = {() => <NotFound link = "/"/> }/>
          <Route render={() => <Redirect to={{pathname: "/notfound"}} />} />
        </Switch>
      </BrowserRouter>}
      </div>
    )
  }
}
export default App;
