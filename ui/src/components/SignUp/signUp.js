import React, {Component} from 'react';
import axios from 'axios';

import Register from './register.js';
import AccDemo from './accSettingsDemo.js';

class SignUp extends Component{
  constructor(props){
    super(props);

    this.state = {
      step: 2
    }
  }

  renderSignup(step) {
    switch(step) {

      case 1: return <Register/>;
      case 2: return <AccDemo/>;
      default: return <h1>No project match</h1>;
    }
  }

  render() {

    return(
      <div>
        {this.renderSignup(this.state.step)}
      </div>
  )
  }
}
export default SignUp
