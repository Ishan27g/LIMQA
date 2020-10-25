import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./docViewer.css";
import "./docEditor.css";

import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';
import doc from '../../Image/documents.png';
import Tag from './../Tags/Tag.js';
import { DatePicker } from 'react-rainbow-components';

import {pathForRequest} from '../http.js';

let http = pathForRequest();

class DocMode extends Component {
  constructor(props){
    super(props);
    this.handleViewerClose = this.handleViewerClose.bind(this);
    this.handleViewerShow = this.handleViewerShow.bind(this);
    this.handleEditorClose = this.handleEditorClose.bind(this);
    this.handleEditorShow = this.handleEditorShow.bind(this);
    this.handleViewerEdit = this.handleViewerEdit.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.handleAbruptLeave = this.handleAbruptLeave.bind(this);
    this.handleRemoveHighlight = this.handleRemoveHighlight.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
    this.handleAddTags = this.handleAddTags.bind(this);
    this.handleSetTags = this.handleSetTags.bind(this);
    this.handleRemoveHighlight = this.handleRemoveHighlight.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
    this.handleCheckDelete = this.handleCheckDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChangeDescripton = this.onChangeDescripton.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.uploadDoc = this.uploadDoc.bind(this);
    this.handleRemoveAchievement = this.handleRemoveAchievement.bind(this);
    this.handleAchievement = this.handleAchievement.bind(this);
    this.onChangeInstitution = this.onChangeInstitution.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);

    this.state = {
      /*Viewer mode State*/
      docEditor: false,
      checkEdit: false,
      checkDelete: false,
      addTags: false,
      uploadMode: false,
      docViewer: false,
      alertDescription: false,
      alertSuccess: false,

      /*Document Properties*/
      docname: "Untitled",
      docdate: "Document Date",
      tags: ["All"],
      tagColors: ["Primary"],
      highlighted: false,
      docdesc: "",
      achievement: false,
      acinst: "",
      acdate: "2020-01-01",

       /*All Tags Created*/
      allTags: [],
      allTagColors: []
    }

  }

  componentDidMount(){
    const tagUrl = http+'/api/tags/' + this.props.doc.id;
    axios.get(tagUrl)
    .then(res =>{
      var tempTag = [];
      var tempTagColors = [];
      var i;
      for(i=0; i<res.data.length; i++){
        tempTag.push(res.data[i].name);
        tempTagColors.push(res.data[i].color);
      }
      this.setState({
        allTags: tempTag,
        allTagColors: tempTagColors
      })
    })
    .catch(function(error) {
      console.log(error);
    })
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
  /*Returns From checkEdit or checkDelete to re-edit document*/
  handleEditorShow = () => {
    this.setState({ checkEdit: false, checkDelete: false, docEditor: true});
  }
  /*Goes into Edit Mode*/
  handleViewerEdit = () => {
    this.setState({ docViewer: true , docEditor: true});

  }
  /* Save Changes before going back to Viewer Mode*/
  handleSaveChanges = () => {
    this.setState({docEditor:false, docViewer: true});
  }

  /* Leaves abruptly w/o saving Changes */
  handleAbruptLeave = () => {
    this.setState({docEditor:false, docViewer: false, checkEdit: false});
  }

  handleAddTags = () =>{
    this.setState({addTags: true});
  }
  /*Edit Tag state after selecting Relevant tags*/
  handleSetTags = () =>{
    this.setState({addTags: false});
  }
  handleRemoveHighlight = () =>{
    this.setState({highlighted: false});
  }

  handleHighlight = () =>{
    this.setState({highlighted: true});
  }

  handleCheckDelete =() =>{
    this.setState({checkDelete: true});
  }
  /*Delete document and close Editor*/
  handleDelete =() =>{
    this.setState({checkDelete: false, docEditor: false, docViewer: false});
  }

  handleAchievement =()=>{
    this.setState({achievement: true})
  }

  handleRemoveAchievement =()=>{
    this.setState({achievement: false})
  }

  handleUploadMode =()=>{
    var tempName= this.props.doc.doc.name;
    const timeNow = new Date().toLocaleDateString()
    this.setState({
      uploadMode: true,
      docEditor: true,
      docViewer: true,
      docname: tempName,
      docdate: timeNow
    })
  }

  uploadDoc(){

    if(!(this.state.docdesc === "")){
      const docForm = new FormData();
      console.log(this.state.docname);
      docForm.append('highlighted', this.state.highlighted);
      docForm.append('description', this.state.docdesc);
      docForm.append('achivement', this.state.achievement);
      docForm.append('document', this.props.doc.doc);
      docForm.append('institution', this.state.acinst);
      docForm.append('dateCreated', this.state.docdate);
      docForm.append('dateAchieved', this.state.acdate);
      docForm.append('name', this.state.docname);
      if(this.state.tags.length === 1){
        docForm.append('tagName[]', this.state.tags[0])
      }else{
        var i;
        for(i=0; i<this.state.tags.length; i++){
          docForm.append('tagName', this.state.tags[i]);
        }
      }
      const postDoc = http+'/api/documents/' + this.props.doc.id;
      axios.post(postDoc, docForm, { withCredentials: true } )
      .then(res=>{
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });

      this.setState({alertSuccess:true},()=>{
        window.setTimeout(()=>{
          this.setState({alertSuccess:false}, ()=>{
            this.setState({
              docViewer: false,
              DocEditor: false,
              uploadMode: false
            });
            window.location.href = '/manage/'+ this.props.doc.id;
          })
        },1500);
      });

  } else {
    this.setState({alertDescription: true});
  }

  }

  onChangeDescripton(e){
    this.setState({
      docdesc: e.target.value,
      alertDescription: false
    });
  }

  onChangeName(e){
    this.setState({
      docname: e.target.value
    });
  }

  onChangeInstitution(e){
    this.setState({
      acinst: e.target.value
    })
  }

  onChangeTags(e){
    var chosetag = this.state.tags;
    var chooseTagColors = this.state.tagColors;
    var colorIndex = this.state.allTags.indexOf(e.target.value);
    console.log(colorIndex);
    if(e.target.checked){
        chosetag.push(e.target.value);
        chooseTagColors.push(this.state.allTagColors[colorIndex])
    }else{
        var index = chosetag.indexOf(e.target.value);
        chosetag.splice(index, 1);
        chooseTagColors.splice(index, 1);
    }
    this.setState({
        tags: chosetag,
        tagColors: chooseTagColors
    }, ()=>{
        console.log(this.state.tags)
        console.log(this.state.tagColors)
    })
  }

  render(){
    var tags = this.state.tags;
    var tagColors = this.state.tagColors;
    let tagsMap = tags.map((tags, idx) =>{
        return(
          <Col className ="mr-sm-1">
            <h4>
              <Tag note={tags} variant={tagColors[idx]} />
            </h4>
          </Col>

        )
    })

    var allTags = this.state.allTags;
    var allTagColors = this.state.allTagColors;

    let SelectTags = allTags.map((allTags, idx) =>{
        var check = this.state.tags.includes(allTags);
        return(
            <InputGroup className = "select-tags">
              <InputGroup.Prepend>
                <InputGroup.Checkbox onChange={this.onChangeTags} value={allTags} checked={check}/>
              </InputGroup.Prepend>
              <InputGroup.Append>
                  <Tag note={allTags} variant={allTagColors[idx]}/>
              </InputGroup.Append>
            </InputGroup>
        )
    })
    //console.log(this.props.doc)
    return(
      <div>
        { this.state.docEditor || this.state.uploadMode ?
          (
            <div>
              <Modal
                dialogClassName = "docedit"
                show = {this.state.docViewer}
                onHide={this.handleViewerClose}
                >
                <Modal.Header className = "docedit-header">

                  <Modal.Title className = "doc-highlight">
                    <InputGroup size ="lg">
                      <FormControl
                        defaultValue = {this.state.docname}
                        placeholder = "Name"
                        aria-label= "name"
                        onChange = {this.onChangeName}/>
                      <InputGroup.Append>
                        {this.state.highlighted?
                          (<Button variant= "warning" onClick = {this.handleRemoveHighlight}>
                              Remove Highlight
                          </Button>):
                          (<Button variant= "outline-dark" onClick = {this.handleHighlight}>
                              Highlight
                          </Button>)
                        }
                      </InputGroup.Append>
                    </InputGroup>

                  </Modal.Title>
                  {/*Change doc-date to document added date*/}
                  <h6> Added on: <span> {this.state.docdate} </span> </h6>
                </Modal.Header>

                <Modal.Body className = "docedit-body" >
                  <Container fluid>
                    <Row>
                      <Col  xs ={5} md = {5}>
                        {/*Change Image Src to document preview */}
                        <Row className = "docview-image">
                        <Image src ={doc} style = {{height:"100%", width: "100%"}}/>
                        </Row>
                        <Row>
                          { this.state.uploadMode?
                            (
                              <Button
                              block
                              variant = "outline-primary"
                              onClick = {this.uploadDoc}>
                              Upload Document
                            </Button>
                          ):
                            (<Button
                            block
                            variant = "outline-danger"
                            onClick = {this.handleCheckDelete}>
                            Delete Document
                          </Button>)
                          }
                        <Alert variant="success" show={this.state.alertSuccess} block>
                          Successfully upload the documents!
                        </Alert>
                        </Row>
                      </Col>
                      <Col className = "docedit-properties">
                        <Row>
                          <h4>Attached Tags</h4>

                        </Row>
                        <Row className = "doc-tags">
                          {tagsMap}
                          <Button block variant = "success" onClick ={this.handleAddTags}>Alter Tags</Button>
                        </Row>

                        <Row>
                          <h4> Description</h4>
                        </Row>
                        <Row className = "doc-description">
                            <FormControl
                              as = "textarea"
                              rows = "4"
                              placeholder = "About the Document"
                              defaultValue = {this.state.docdesc}
                              aria-label= "description"
                              onChange={this.onChangeDescripton}/>
                        </Row>
                        {this.state.alertDescription?
                        (
                          <Row>
                            <Col>
                                <Alert variant={'danger'}>
                                  Talk About Your Document!
                                </Alert>
                            </Col>
                          </Row>
                        ):(
                          <div></div>
                        )
                        }
                        <Row>
                          {this.state.achievement ? (
                            <Button variant='outline-warning' onClick={this.handleRemoveAchievement} style={{marginRight: "1vmax"}}> Remove  </Button>
                          ):(
                            <Button variant='outline-success' onClick={this.handleAchievement} style={{marginRight: "1vmax"}}> Add </Button>
                          )}
                          <h4>Achievement Details</h4>
                        </Row>
                        {/* only show this row when document is an achievement is checked out */}
                        <Collapse in={this.state.achievement}>
                          <Row className = "doc-achievement">
                            <FormControl
                              placeholder = "Issuing Institution"
                              defaultValue = {this.state.acinst}
                              style ={{marginBottom: "0.6vmax"}}
                              onChange = {this.onChangeInstitution}/>
                              <DatePicker
                               onChange={value => this.setState({acdate: value})}
                               value={this.state.acdate}
                               locale="en-US"
                               />
                          </Row>
                        </Collapse>

                      </Col>
                    </Row>
                  </Container>
                </Modal.Body>
                <Modal.Footer className = "docedit-footer">
                  <Button variant = "outline-dark" onClick ={this.handleEditorClose} >Close</Button>
                  {this.state.uploadMode? (
                    <div></div>
                  ): (
                    <Button variant = "outline-dark" onClick ={this.handleSaveChanges}>Save Changes</Button>
                  )}

                </Modal.Footer>
              </Modal>

              <Modal
                show={this.state.checkEdit}
                className = "docedit-leave">
              <Modal.Header>
                <h4> All unsaved changes will be lost </h4>
              </Modal.Header>
              <Modal.Footer className = "docedit-footer">
                  <Button variant = "outline-dark" onClick ={this.handleEditorShow} >Return</Button>
                  <Button
                    variant = "outline-danger"
                    onClick ={this.handleAbruptLeave}>Close</Button>
              </Modal.Footer>
              </Modal>

              <Modal
                show = {this.state.addTags}
                className = "docedit-add-tags">
                <Modal.Header>
                    <h4>Select Relevant tags</h4>
                </Modal.Header>
                <Modal.Body>
                  {SelectTags}
                </Modal.Body>
                <Modal.Footer className = "docedit-footer-tags">
                    <Button
                      variant = "outline-success"
                      onClick ={this.handleSetTags}>Save</Button>
                </Modal.Footer>
              </Modal>

              <Modal
                show={this.state.checkDelete}
                className = "docedit-delte">
              <Modal.Header>
                <h4> Document will be permanently deleted </h4>
              </Modal.Header>
              <Modal.Footer className = "docedit-footer">
                  <Button variant = "outline-dark" onClick ={this.handleEditorShow} >Return</Button>
                  <Button
                    variant = "outline-danger"
                    onClick ={this.handleDelete}>Delete</Button>
              </Modal.Footer>
              </Modal>

            </div>
          ):
          (
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
      </div>
    )
  }
}
export default DocMode;
