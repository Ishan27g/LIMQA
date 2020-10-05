import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class NotFound extends Component {
  render() {
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
                  <Button variant='primary' size='lg' className='submitBtn'>
                    Return
                  </Button>
                </a>

            </div>
          </Container>
      </React.Fragment>
    );
  }
}

export default NotFound;
