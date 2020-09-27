import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./docViewer.css";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';

import Tag from './../Tags/Tag.js';
import DocEditor from './docEditor.js';
import doc from '../../Image/documents.png';


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
       docViewer: true,
       docEditor: false,
       checkEdit: false,
       docname: "Document Name",
       docdate: "Document Date",
       tags: ["Extra-Curricular" , "Acadmeic", "Work-Experience", "Volunteering", "Leadership"],
       highlighted: true,
       docdesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Id eu nisl nunc mi ipsum faucibus. Augue maursisaugue neque gravida.",
       achievement: true,
       acinst: "Institution name",
       acdate: "Date of Achievement"
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
  /* Save Changes before going back to Viewer Mode*/
  handleSaveChanges = () => {
    this.setState({docEditor:false, docViewer: true});
  }
  /* Leaves abruptly w/o saving Changes */
  handleAbruptLeave = () => {

    this.setState({docEditor:false, docViewer: false, checkEdit: false});
  }

  render() {
    var tags = this.state.tags;
    let tagsMap = tags.map(tags =>{
        return(
            <Tag note={tags} />
        )
    })

    return(

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
                <Col className = "docview-image" xs ={5} md = {5}>
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

    )
  }
}

export default DocViewer;
