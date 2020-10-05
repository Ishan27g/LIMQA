import React, {Component} from 'react';
import '../../App.css';

import ListGroup from 'react-bootstrap/ListGroup';


class UserList extends Component{
    render(){
        var userLink = `/${this.props.id}`;
        return (
                <ListGroup.Item
                  className = "user-search-list-item"
                  onClick = {event =>  window.location.href = {userLink} }>
                  {this.props.name}&nbsp;&nbsp;<span>{this.props.email}</span>
                </ListGroup.Item>
        )
    }
}

export default UserList;
