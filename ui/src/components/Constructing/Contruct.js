import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Construct extends Component {
  render() {
    return (
      <React.Fragment>
          <Container fluid style = {{display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                        fontSize: "1em",
                        color: "white",
                        marginTop: "20vmax"}}>
            <h2>This page is under construction</h2>
            <h4>Comming soon</h4>
            <div style = {{display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          textAlign: 'center',
                          fontSize: "2em",
                          color: "white",
                          marginTop: "10%"}}>
                <a href= {this.props.link}>
                  <Button style={{marginBottom: "19vmax"}} variant='info' size='lg' className='submitBtn' onClick={event =>  window.location.href = '/'}>
                    Return
                  </Button>
                </a>

            </div>
          </Container>
      </React.Fragment>
    );
  }
}

export default Construct;