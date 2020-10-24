import React, {Component} from 'react';

import Badge from 'react-bootstrap/Badge';


class Tag extends Component{
    render(){
        return (
                <Badge variant = {this.props.variant === "" ? "primary" : this.props.variant} >
                  {this.props.note}
                </Badge>
        )
    }
}

export default Tag;
