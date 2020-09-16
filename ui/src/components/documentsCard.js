import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import {NavLink} from "react-router-dom";

import docImage from '../Image/documents.png';

class documentsCard extends Component {

    render() {
        return (
            <div>
                <Card className='documentsCard' >
                    <Card.Img variant='top' src={docImage}/>
                    <Card.Body>
                        <Card.Title>
                            {this.props.note.Title}
                        </Card.Title>
                        <br/>
                        <NavLink to={"/"}>
                            <Card.Link></Card.Link>
                        </NavLink>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default documentsCard;
