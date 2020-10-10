import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import './Home.css';

import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Carousel from "react-bootstrap/Carousel";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CoverImage from '../CoverImage/coverImage.js';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import docImage from '../../Image/documents.png';
import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';
import profile from '../../Image/profile.png';

import {pathForRequest} from '../http.js';
let http = pathForRequest();

class Home extends Component {
    constructor(props){
        super(props);
        this.docView = React.createRef();
        this.state = {
            bioinfo: '',
            cover:[sampleImage1, sampleImage2, sampleImage3],
            docShow: false,
            documents: [],
            docname:"",
            userId: this.props.match.params.id,
            profileImg: http+'/api/users/profilePhoto/'+this.props.match.params.id,
            bgImg: http+'/api/users/bgImage/'+this.props.match.params.id,
        }
    }

    componentDidMount(){
        axios.get(http+'/api/bioinfo/'+this.state.userId)
        .then(res =>{
            this.setState({
                bioinfo: res.data.bioinfo,
            })
        })
        .catch(function(error) {
            console.log(error);
        })

        axios.get(http+'/api/documents/'+this.state.userId)
        .then(res =>{
            console.log(res.data.documents)
            this.setState({
                documents: res.data.documents,
            })
        })
        .catch(function(error) {
            console.log(error);
        })

        const imgUrl = http+'/api/users/coverImages/'+this.state.userId;
        axios.get(imgUrl, { withCredentials: true })
        .then(res =>{
            if (res.data.coverImages.coverImages[0] !== ""){
                var i;
                const tempCover = [];
                for (i=0; i<res.data.coverImages.coverImages.length; i++){
                tempCover.push(http+'/api/users/coverImages/'+this.state.userId+'/'+i)
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
        console.log(this.state.documents)
        var hDoc = this.state.documents.filter(function(document){
            return document.highlighted == true;
        });

        let highlightedDoc = hDoc.map(doc =>{
            return (
                <Card className='documentsCard' >
                    <Card.Img variant='top' src={docImage}/>
                    <Card.Body>
                      <Card.Title onClick = {event =>  window.location.href = '/documents/'+ doc._id }>
                        {doc.name}
                      </Card.Title>
                    </Card.Body>
                </Card>
            )
        });
            
        var setDoc =[];
        for(var i= 0; i < highlightedDoc.length; i=i+3){
            setDoc.push(
            <CardColumns variant = "flush">{highlightedDoc.slice(i,i+3)}</CardColumns>
        )
        }

        let displayHDoc = setDoc.map(docDeck => {
        return(<Carousel.Item>{docDeck}</Carousel.Item>)
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
                        <Image src={this.state.profileImg} onError={(e)=>{e.target.onerror = null; e.target.src=profile}} roundedCircle style = {{height: "20vmax", width: "20vmax"}}/>
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
                    {hDoc.length < 1 ? (
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
                        <Carousel indicators ={false} interval = {10000}>
                            {displayHDoc}
                        </Carousel>
                    )}
                    
                    
            </div>
        </body>
        )
    }
}

export default Home;
