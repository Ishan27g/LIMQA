import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import './Home.css';

import axios from "axios";
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
            profilePage: '',
            documents: '',
            cover:[sampleImage1, sampleImage2, sampleImage3],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/api/users')
        .then(res =>{
            this.setState({
                bioinfo: res.data.users[0].bioinfo
            })
            if (!res.data.users[0].bioinfo || this.state.bioinfo.length < 1){
                this.setState({
                    bioinfo: 'this person have no bioinfo yet'
                })
            }
            console.log(res.data.users[0].photos)
        })
        .catch(function(error) {
            console.log(error);
        })

        const imgUrl = 'http://localhost:8080/api/users/coverImages';
        axios.get(imgUrl, { withCredentials: true })
        .then(res =>{
            var i;
            const tempCover = [];
            for (i=0; i<res.data.coverImages.coverImages.length; i++){
            tempCover.push('http://localhost:8080/api/users/coverImages/'+i)
            }
            this.setState({
            cover: tempCover
            })

            if (this.state.cover.length < 1){
            this.setState({
                cover: [sampleImage1, sampleImage2, sampleImage3]
            })
            }

        })
        .catch(function(error) {
            console.log(error);
        })
    };

    render(){
        var coverImg = this.state.cover;
        let coverImage = coverImg.map(cover =>{
            return(
                <Carousel.Item>
                    <CoverImage note={cover} />
                </Carousel.Item>
            )
        })

        return(
          <body>
            <div class = "cover-image">
              <Carousel>
                    {coverImage}
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
                        <Image src={'http://localhost:8080/api/users/profilePhoto'} onError={(e)=>{e.target.onerror = null; e.target.src=profile}} roundedCircle style = {{height: "20vmax", width: "20vmax"}}/>
                        </Col>
                        <Col id="col-special2">

                        <p>
                          {this.state.bioinfo}
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
