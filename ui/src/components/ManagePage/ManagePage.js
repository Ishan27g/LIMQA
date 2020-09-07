import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";

import Container from 'react-bootstrap/Container';
import Carousel from "react-bootstrap/Carousel";

import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';

class ManagePage extends Component {
    render(){
        return(
            <body>
                <Container>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
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
                        className="d-block w-100"
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
                        className="d-block w-100"
                        src= {sampleImage3}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </Container>
            </body>
        )
    }
}

export default ManagePage;