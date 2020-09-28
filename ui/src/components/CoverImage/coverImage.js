import React, {Component} from 'react';
import Image from 'react-bootstrap/Image';
import './coverImage.css';

class CoverImage extends Component{
    render(){
        return (
                <Image 
                src= {this.props.note}
                alt="First slide"
                />
        )
    }
}

export default CoverImage;