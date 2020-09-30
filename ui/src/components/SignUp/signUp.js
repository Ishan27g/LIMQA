import React, {Component} from 'react';
import axios from 'axios';
import Register from './register.js';


class SignUp extends Component{
  constructor(props){
    super(props);

    this.state = {

      step: 1

    }
  }
  render() {
    const signup = () => {
          switch(this.step) {

            case "one":   return {Register};
            default:      return <h1>No project match</h1>
          }
        }
    return(
      <div>
      (signup())
      </div>
  )
  }
}
export default SignUp
