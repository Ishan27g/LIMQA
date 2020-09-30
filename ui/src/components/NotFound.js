import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class NotFound extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={'div_min75'} style={{display: 'flex', justifyContent: 'center',  flexDirection: 'column', textAlign: 'center'}}>
          <Container>
            <div className='div_padding submitTitle' style={{display: 'flex', justifyContent: 'center',  flexDirection: 'column', textAlign: 'center'}}>
              <div className='loginBox'>
                <h2>Page Not Found - 404 Error</h2>
                <p>Whoops! Looks like you took a wrong turn.</p>
                <a href='/'>
                  <Button variant='primary' size='lg' className='submitBtn'>
                    Return to Home Page
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default NotFound;