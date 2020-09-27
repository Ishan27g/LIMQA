import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./docViewer.css";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';

import Tag from './../Tags/Tag.js';

import doc from '../../Image/documents.png';

class DocViewer extends Component {

  render() {
    var tags = this.state.tags;
    let tagsMap = tags.map(tags =>{
        return(
            <Tag note={tags} />
        )
    })

    return(
      <div>
        <Modal
          dialogClassName = "docview"
          show = {this.state.docViewer}
          onHide={this.handleViewerClose}
          >

          <Modal.Header className = "docview-header">
            {/*Change doc-name to document name*/}
            {this.state.highlighted ?
            (<Modal.Title className = "doc-highlighted">
              <h4>{this.state.docname}</h4>
             </Modal.Title>):
            (<Modal.Title ><h4>{this.state.docname}</h4></Modal.Title>)
            }
            {/*Change doc-date to document added date*/}
            <h6> Added on: <span> {this.state.docdate} </span> </h6>
          </Modal.Header>

          <Modal.Body className = "docview-body" >
            <Container fluid>
              <Row>
                <Col className = "docview-image" xs ={5}>
                  {/*Change Image Src to document preview */}
                  <Image src ={doc} style = {{height:"100%", width: "100%"}}/>
                </Col>
                <Col className = "docview-properties">
                  <Row>
                    <h4>Attached Tags</h4>

                  </Row>
                  <Row className = "doc-tags">
                    <h4>{tagsMap}</h4>
                  </Row>
                  <Row classname = "create-tags">

                  </Row>
                  <Row>
                    <h4> Description</h4>
                  </Row>
                  <Row className = "doc-description">
                    <p>
                      {this.state.docdesc}
                    </p>
                  </Row>
                  <Row>
                      {this.state.achievement ?
                        (<h4>Achievement Details</h4>):
                        (<h4 style = {{color: "rgba(200,200,200,0.6)", textDecoration: "line-through"}}>
                            Achievement Details
                         </h4>)
                      }

                      {/* If the field is not an achievemnt change the opacity of h4*/}
                  </Row>
                  {/* only show this row when document is an achievement is checked out */}
                  <Collapse in={this.state.achievement}>
                    <Row className = "doc-achievement">
                      {/* Add acheivement name */}
                      <h5>Institution: <span>{this.state.acinst}</span></h5>
                      {/* Add acheivement date */}
                      <h5>Date: <span>{this.state.acdate}</span></h5>
                    </Row>
                  </Collapse>

                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className = "docview-footer">
            <Button variant = "outline-dark" onClick ={this.handleViewerClose} >Close</Button>
            <Button variant = "outline-dark" onClick ={this.handleViewerEdit}>Edit</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.checkEdit} >
        <Modal.Header>
          <h4> All unsaved changes will be lost </h4>
        </Modal.Header>
        <Modal.Footer className = "docview-footer">
            <Button variant = "outline-dark" onClick ={this.handleEditorShow} >Return</Button>
            <Button
              variant = "outline-danger"
              onClick ={this.handleAbruptLeave}>Close</Button>
        </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default DocViewer;
