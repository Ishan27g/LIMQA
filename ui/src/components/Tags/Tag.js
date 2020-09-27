import React, {Component} from 'react';

import Badge from 'react-bootstrap/Badge';


class CoverImage extends Component{
    render(){
        return (
                <Badge variant = "primary">
                {this.props.note}
                </Badge>
        )
    }
}

export default CoverImage;
