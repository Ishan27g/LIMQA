import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './coverImage.css';

class CoverImage extends Component{
    render(){
        return (  
            <Carousel.Item className="cover-image">
                <img
                src= {this.props.note.path}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }
}

export default CoverImage;