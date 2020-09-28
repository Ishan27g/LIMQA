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
import Docview from '../documentViewer/doc.js';

class Home extends Component {
    constructor(props){
        super(props);
        this.docView = React.createRef();
        this.state = {
            bioinfo: '',
            profilePage: '',
            documents: '',
            cover:[sampleImage1, sampleImage2, sampleImage3],
            docShow: false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/api/users')
        .then(res =>{
            this.setState({
                bioinfo: res.data.users[0].bioinfo
            })
            if (!res.data.users[0].bioinfo || this.state.bioinfo.length < 1){
                this.setState({ bioinfo: 'this person have no bioinfo yet' });
            }
        })
        .catch(function(error) {
            console.log(error);
        })

        const imgUrl = 'http://localhost:8080/api/users/coverImages';
        axios.get(imgUrl, { withCredentials: true })
        .then(res =>{
            if (res.data.coverImages.coverImages[0] !== ""){
                var i;
                const tempCover = [];
                for (i=0; i<res.data.coverImages.coverImages.length; i++){
                tempCover.push('http://localhost:8080/api/users/coverImages/'+i)
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

    openDocView = () =>{
        this.docView.current.handleViewerShow();
    }
  

    render(){
        var coverImg = this.state.cover;
        let coverImage = coverImg.map(cover =>{
            return(
                <Carousel.Item>
                    <CoverImage note={cover} />
                </Carousel.Item>
            )
        });

        var doc = {path:'', docType: ''};

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

            <Docview doc={doc} ref={this.docView}/>

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
                        <Card.Title onClick={this.openDocView}> Card Title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img src={docIcon} />
                        <Card.Body bsPrefix = "card-body">
                        <Card.Title onClick={this.openDocView}>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img src={docIcon} />
                        <Card.Body>
                        <Card.Title onClick={this.openDocView}>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                    <CardDeck>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title onClick={this.openDocView}>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title onClick={this.openDocView}>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title onClick={this.openDocView}>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    </CardDeck>
                    </Carousel.Item>
                    <Carousel.Item>
                    <CardDeck>
                    <Card >
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title onClick={() => this.clickDoc()}>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title onClick={() => this.clickDoc()}>Card title</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={docIcon} />
                        <Card.Body>
                        <Card.Title onClick={() => this.clickDoc()}>Card title</Card.Title>
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
