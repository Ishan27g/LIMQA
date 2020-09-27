import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import './Home.css';

import Carousel from "react-bootstrap/Carousel";
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';
import profile from '../../Image/profile.png';
import docIcon from '../../Image/documents.png';

class Home extends Component {
    render(){
        return(
          <body>
            <div class = "cover-image">
              <Carousel>
                    <Carousel.Item>
                        <img
                        src= {sampleImage1}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        src= {sampleImage2}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        src= {sampleImage3}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
              </div>

              <div class = "basic-info">
                <Container fluid = {true}>
                    <Row>
                      <Col>
                        <h1>Welcome!<br/></h1>
                      </Col>
                    </Row>

                    <Row id="row-special">
                        <Col id="col-special1">
                        <Image src={profile} roundedCircle />
                        </Col>
                        <Col id="col-special2">

                        <p>
                            Twitter lover. Certified entrepreneur.
                            Tv evangelist. Hardcore thinker.
                            Professional reader. Problem solver. Organizer.
                        </p>
                        </Col>
                    </Row>
                </Container>
              </div>

              <div class = "highlighted-documents">
                <Row>
                  <Col>
                    <h3> Highlighted Documents </h3>
                  </Col>
                </Row>
                <Carousel indicators ={false}>
                    <Carousel.Item>
                    <CardDeck>
                    <Card>
                        <Card.Img src={docIcon} />
                        <Card.Body>
                        <Card.Title> Card Title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img src={docIcon} />
                        <Card.Body bsPrefix = "card-body">
                        <Card.Title>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img src={docIcon} />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                    <CardDeck>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                    <CardDeck>
                    <Card >
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    </CardDeck>
                    </Carousel.Item>
                </Carousel>
              </div>
            </body>
        )
    }
}

export default Home;
