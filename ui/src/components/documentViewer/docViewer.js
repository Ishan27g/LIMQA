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
import FileViewer from "react-file-viewer";

import doc from '../../Image/documents.png';

const onError = () =>{
  return(
    <Image src ={doc} style = {{height:"100%", width: "100%"}}/>
  )
}

class DocViewer extends Component {
  constructor(props){
    super(props);
    this.handleViewerClose = this.handleViewerClose.bind(this);
    this.handleViewerShow = this.handleViewerShow.bind(this);
    this.handleEditorClose = this.handleEditorClose.bind(this);
    this.handleEditorShow = this.handleEditorShow.bind(this);
    this.handleViewerEdit = this.handleViewerEdit.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleAbruptLeave = this.handleAbruptLeave.bind(this);

     this.state = {
       docViewer: false,
       docEditor: false,
       checkEdit: false
     }
  }

  handleViewerShow = () => {
    this.setState({ docViewer: true });
  }
  handleViewerClose = () => {
    this.setState({ docViewer: false});
  }
  handleEditorClose = () => {
    this.setState({ checkEdit: true});
  }
  /*Returns From checkEdit to re-edit document*/
  handleEditorShow = () => {
    this.setState({ checkEdit: false, docEditor: true});
  }
  /*Goes into Edit Mode*/
  handleViewerEdit = () => {
    this.setState({ docViewer: false , docEditor: true});
  }
  handleSaveChanges = () => {
    /* Save Changes before going back to Viewer Mode*/
    this.setState({docEditor:false, docViewer: true});
  }
  handleAbruptLeave = () => {
    /* Leaves abruptly w/o saving Changes */
    this.setState({docEditor:false, docViewer: false, checkEdit: false});
  }



  render() {
    console.log(this.props);
    return(
      <div>
        <Modal
          dialogClassName = "docview"
          show={this.state.docViewer}
          onHide={this.handleViewerClose}
          >

          <Modal.Header className = "docview-header">
            {/*Change doc-name to document name*/}
            <Modal.Title id = "doc-name">Document Name</Modal.Title>

            {/*Change doc-date to document added date*/}
            <h6> Added on: <span id = "doc-date"> DATE </span> </h6>
          </Modal.Header>

          <Modal.Body className = "docview-body" >
            <Container fluid>
              <Row>
                <Col className = "docview-image" xs ={5}>
                  {/*Change Image Src to document preview */}
                  <FileViewer fileType={this.props.doc.type} filePath={this.props.doc.path} onError={onError} />
                  {/*
                  <Image src ={doc} style = {{height:"100%", width: "100%"}}/>
                  */}
                </Col>
                <Col className = "docview-properties">
                  <Row>
                    <h4>Attached Tags</h4>
                  </Row>
                  <Row className = "doc-tags">
                    { /*Add a List of badges: indent  1 vmax*/}
                    <ListGroup>
                      <ListGroup.Item>
                        {/*Add a Badge*/}
                      </ListGroup.Item>
                    </ListGroup>
                  </Row>
                  <Row>
                    <h4> Description</h4>
                  </Row>
                  <Row className = "doc-description">
                      {/* Add document description */}
                    <p id = "doc-desc">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Id eu nisl nunc mi ipsum faucibus. Augue maursis
                      augue neque gravida.
                    </p>
                  </Row>
                  <Row>
                      <h4>Achievements</h4>

                      {/* If the field is not an achievemnt change the opacity of h4*/}
                  </Row>
                  {/* only show this row when document is an achievement is checked out */}
                  <Row className = "doc-achievement"
                        show = {this.state.Actext}>
                    {/* Add acheivement name */}
                    <h5>NAME: <span id= "doc-ac-date"> AC NAME</span></h5>
                    {/* Add acheivement date */}
                    <h5>DATE: <span id= "doc-ac-date"> AC DATE</span></h5>
                  </Row>

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
          dialogClassName = "docview"
          show={this.state.docEditor}
          onHide={this.handleViewerClose}
          >

          <Modal.Header className = "docview-header">
            {/*Change doc-name to document name*/}
            <Modal.Title id = "doc-name" >Document Name</Modal.Title>

            {/*Change doc-date to document added date*/}
            <h6> Added on: <span id = "doc-date"> Document Date </span> </h6>
          </Modal.Header>

          <Modal.Body className = "docview-body" >
            <Container fluid>
              <Row>
                <Col className = "docview-image" xs ={5}>
                  {/*Change Image Src to document preview */}
                  <Image src ={doc} style = {{height:"100%", width: "100%"}}/>
                </Col>
                <Col className = "docview-properties">
                <ListGroup>

                  <h4> Date </h4>
                  <ListGroup.Item block>

                  </ListGroup.Item>
                  <h4>Facebook</h4>
                  <ListGroup.Item>

                  </ListGroup.Item>
                  <h4>Facebook</h4>
                  <ListGroup.Item>

                  </ListGroup.Item>
                  <h4>Facebook</h4>
                  <ListGroup.Item>
                  </ListGroup.Item>
                </ListGroup>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className = "docview-footer">
            <Button variant = "outline-dark" onClick ={this.handleEditorClose} >Close</Button>
            <Button
              variant = "outline-dark"
              onClick ={this.handleSaveChanges}
              style = {{width: "10vmax"}}>Save Changes</Button>
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
