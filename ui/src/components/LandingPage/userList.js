import React, {Component} from 'react';
import './landingPage.css';

import ListGroup from 'react-bootstrap/ListGroup';


class UserList extends Component{
    render(){
        return (
                <ListGroup.Item
                  className = "user-search-list-item"
                  onClick = {event =>  window.location.href = '/home/' + this.props.id }>
                  {this.props.name}&nbsp;&nbsp;<span>{this.props.email}</span>
                </ListGroup.Item>
        )
    }
}

export default UserList;
