import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import './Home.css';

import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import CoverImage from '../CoverImage/coverImage.js';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';
import profile from '../../Image/profile.png';
import docIcon from '../../Image/documents.png';

import {pathForRequest} from '../http.js';

let http = pathForRequest();

class Home extends Component {
    constructor(props){
        super(props);
        this.docView = React.createRef();
        this.state = {
            bioinfo: '',
            profilePage: '',
            cover:[sampleImage1, sampleImage2, sampleImage3],
            docShow: false,
            documents: [],
            docname:"",
        }
    }

    componentDidMount(){
        axios.get(http+'/api/users')
        .then(res =>{
            this.setState({
                bioinfo: res.data.users[0].bioinfo,
                documents: res.data.users[0].documents
            })
            if (!res.data.users[0].bioinfo || this.state.bioinfo === ""){
                this.setState({ bioinfo: 'this person have no bioinfo yet' });
            }
            if(res.data.users[0].documents[0] !== ""){
                const getDoc = http+'/api/OneDocument/'+res.data.users[0].documents[0];
                axios.get(getDoc)
                .then(res=>{
                    console.log(res.data.document);
                    this.setState({
                        docname: res.data.document.name
                    })
                })
            }
        })
        .catch(function(error) {
            console.log(error);
        })

        const imgUrl = http+'/api/users/coverImages';
        axios.get(imgUrl, { withCredentials: true })
        .then(res =>{
            if (res.data.coverImages.coverImages[0] !== ""){
                var i;
                const tempCover = [];
                for (i=0; i<res.data.coverImages.coverImages.length; i++){
                tempCover.push(http+'/api/users/coverImages/'+i)
                }
                this.setState({
                    cover: tempCover
                });
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
        });

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
                        <h1 style = {{lineHeight: 2 }}>Welcome!<br/></h1>
                      </Col>
                    </Row>

                    <Row style = {{marginTop: "2vmax"}} >
                        <Col style = {{textAlign: "center"}}>
                        <Image src={http+'/api/users/profilePhoto'} onError={(e)=>{e.target.onerror = null; e.target.src=profile}} roundedCircle style = {{height: "20vmax", width: "20vmax"}}/>
                        </Col>
                        <Col style = {{backgroundColor: "rgba(180,180,180,0.5)" , border: "2px solid black", borderRadius: "15px"}}>

                        <p>
                          {this.state.bioinfo}
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
                    {this.state.documents.length<1 ? (
                        <Carousel indicators ={false}>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={sampleImage1}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>No documents</h3>
                            <p>This user hasn't upload anydocuments yet</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                    ):(
                        <Carousel indicators ={false}>
                        <Carousel.Item>
                        <CardDeck>
                        <Card>
                            <Card.Img src={docIcon} />
                            <Card.Body>
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img src={docIcon} />
                            <Card.Body bsPrefix = "card-body">
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img src={docIcon} />
                            <Card.Body>
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        </CardDeck>
                        </Carousel.Item>
                        <Carousel.Item>
                        <CardDeck>
                        <Card>
                            <Card.Img variant="top" src={docIcon} />
                            <Card.Body>
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={docIcon} />
                            <Card.Body>
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={docIcon} />
                            <Card.Body>
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        </CardDeck>
                        </Carousel.Item>
                        <Carousel.Item>
                        <CardDeck>
                        <Card >
                            <Card.Img variant="top" src={docIcon} />
                            <Card.Body>
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={docIcon} />
                            <Card.Body>
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={docIcon} />
                            <Card.Body>
                                <Button variant="secondary" href={"/documents/" + this.state.documents[0]} block>{this.state.docname}</Button>
                            </Card.Body>
                        </Card>
                        </CardDeck>
                        </Carousel.Item>
                        </Carousel>
                    )}
                    
                    
            </div>
        </body>
        )
    }
}

export default Home;
