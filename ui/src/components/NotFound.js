import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-rainbow-components';

class NotFound extends Component {
  render() {
    if(true){
      return(
        <React.Fragment>
          <Container>
            <div className="rainbow-align-content_center rainbow-position_relative rainbow-p-vertical_xx-large">
              <Spinner variant="brand" size="large" />
            </div>
          </Container>
        </React.Fragment>)
    } else {
    return (
      <React.Fragment>
          <Container fluid style = {{display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                        fontSize: "1em",
                        color: "white",}}>
            <h4>404 Error - Page Not Found </h4>
            <div style = {{display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          textAlign: 'center',
                          fontSize: "2em",
                          color: "white",
                          marginTop: "10%"}}>
                <p>Whoops! Looks like you took a wrong turn.</p>
                <a href= {this.props.link}>
                  <Button variant='primary' size='lg' className='submitBtn' onClick={event =>  window.location.href = '/'}>
                    Return
                  </Button>
                </a>

            </div>
          </Container>
      </React.Fragment>
    );}

  }
}

export default NotFound;
