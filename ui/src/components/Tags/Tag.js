import React, {Component} from 'react';

import Badge from 'react-bootstrap/Badge';


class Tag extends Component{
    render(){
        return (
                <Badge variant = "primary">
                  {this.props.note}
                </Badge>
        )
    }
}

export default Tag;
