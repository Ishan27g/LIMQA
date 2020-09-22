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
import CoverImage from '../CoverImage/coverImage.js';

import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';
import profile from '../../Image/profile.png';
import docIcon from '../../Image/documents.png';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            bioinfo: '',
            coverPage: [],
            profilePage: '',
            documents: ''
        }
    }

    componentDidMount(){
        // wait for back end for routes
    };

    render(){
        const coverImg = [{path: '../../Image/sampleImage1.jpg'}, {path: '../../Image/sampleImage2.jpg'}, {path: '../../Image/sampleImage3.jpg'}];
        let coverImage = coverImg.map(cover =>{
          return(
            <CoverImage note={cover}/>
          )
        })

        return(
          <body>
            <div class = "cover-image">
              <Carousel>
                    {coverImage}
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
                        <h1 style = {{lineHeight: 2 }}>Welcome!<br/></h1>
                      </Col>
                    </Row>

                    <Row style = {{marginTop: "2vmax"}} >
                        <Col style = {{textAlign: "center"}}>
                        <Image src={profile} roundedCircle style = {{height: "20vmax", width: "20vmax"}}/>
                        </Col>
                        <Col style = {{backgroundColor: "rgba(180,180,180,0.5)" , border: "2px solid black", borderRadius: "15px"}}>

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
                <Row style = {{marginBottom: "3vmax"}}>
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
