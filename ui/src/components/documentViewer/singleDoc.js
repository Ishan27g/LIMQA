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
import doc from '../../Image/documents.png';
import Tag from './../Tags/Tag.js';

import {pathForRequest} from '../http.js';

let http = pathForRequest();

class singleDoc extends Component {
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
        this.updateDoc = this.updateDoc.bind(this);
        this.handleRemoveAchievement = this.handleRemoveAchievement.bind(this);
        this.handleAchievement = this.handleAchievement.bind(this);
        this.onChangeInstitution = this.onChangeInstitution.bind(this);
        this.onChangeAcdate = this.onChangeAcdate.bind(this);

        this.state = {
            login: false,
            /*Viewer mode State*/
            docEditor: false,
            checkEdit: false,
            checkDelete: false,
            addTags: false,
            docViewer: true,
            /*Document Properties*/
            docname: "Untitled",
            docdate: "Document Date",
            tags: [{'name':"Extra-Curricular"}, {'name': "Acadmeic"}, {'name': "Work-Experience"}, {'name': "Volunteering"}, {'name':"Leadership" }],
            highlighted: false,
            docdesc: "",
            achievement: false,
            acinst: "",
            acdate: "",
            owner: "",
            docId: this.props.match.params.id,
            /*All Tags Created*/
            allTags: [{'name':"Extra-Curricular"}, {'name': "Acadmeic"}, {'name': "Work-Experience"}, {'name': "Volunteering"}, {'name':"Leadership" }, {'name': "Extra1"}, {name: "Extra2"}, {name:"Extra3"} ],
        }

    }

    componentDidMount(){
        console.log(this.state.docId)
        const getDoc = http+'/api/OneDocument/'+this.state.docId;
        axios.get(getDoc)
        .then(res=>{
            console.log(res.data.document.tags);

            this.setState({
                docname: res.data.document.name,
                docdate: res.data.document.dateCreated,
                highlighted: res.data.document.highlighted,
                docdesc: res.data.document.description,
                achievement: res.data.document.achivement,
                acinst: res.data.document.acinst,
                acdate: res.data.document.dateAchieved,
                tags: res.data.document.tags,
                owner: res.data.document.owner
            })
        })
        .catch(function(error) {
            console.log(error);
        });

        const check = http+'/api/users/check';
        axios.get(check, { withCredentials: true })
        .then(response => {
            if (response.data.logIn){
                this.setState({
                    login: true,
                })
            }
        })
    }

    handleViewerShow = () => {
        this.setState({ docViewer: true });
        
    }
    handleViewerClose = () => {
        this.setState({ docViewer: false});
        this.props.history.goBack();
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
        this.updateDoc()
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
        const deleteDoc = http+'/api/documents/'+this.state.owner+'/'+this.state.docId;
        console.log(deleteDoc);
        axios.delete(deleteDoc, { withCredentials: true });
        this.setState({checkDelete: false, docEditor: false, docViewer: false});
        this.props.history.goBack();
    }

    handleAchievement =()=>{
        this.setState({achievement: true})
    }

    handleRemoveAchievement =()=>{
        this.setState({achievement: false})
    }


  updateDoc(){
    const docForm = {
        'name': this.state.docname,
        'highlighted': this.state.highlighted,
        'description': this.state.docdesc,
        'achivement': this.state.achievement,
        'institution': this.state.acinst,
        'dateAchieved': this.state.docdate
    }

    const putDoc = http+'/api/editDocument/' + this.props.match.params.id;
    axios.put(putDoc, docForm, { withCredentials: true } )
    .then(res=>{
        console.log(res.status)
    })
    .catch(function(error) {
      console.log(error);
    });

  }

  onChangeDescripton(e){
    this.setState({
      docdesc: e.target.value
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

  onChangeAcdate(e){
    this.setState({
        acdate: e.target.value
    })
  }

  render(){
    var tags = this.state.tags;

    let tagsMap = tags.map(tags =>{
        return(
            <Tag note={tags.name} />
        )
    })

    let showtagButtons = tags.map(onetag =>{
        return(
          <Button
            variant = "outline-danger"
            style = {{border: "0px solid red"}}>
            <Tag note={onetag.name} />
          </Button>
        )
    })

    var allTags = this.state.allTags;
    let SelectTags = allTags.map(onetag =>{
        return(
            <InputGroup className = "select-tags">
              <InputGroup.Prepend>
                <InputGroup.Checkbox/>
              </InputGroup.Prepend>
              <InputGroup.Append>
                  <Tag note={onetag.name} />
              </InputGroup.Append>
            </InputGroup>
        )
    })
    //console.log(this.props.doc)
    return(
        <body>
        { this.state.docEditor ?(
            <div>
                <Modal
                 dialogClassName = "docedit"
                 show = {this.state.docViewer}
                 onHide={this.handleViewerClose}
                 backdrop="static"
                 keyboard={false}
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
                        {this.state.highlighted? (
                            <Button variant= "warning" onClick = {this.handleRemoveHighlight}>
                                Remove Highlight
                            </Button>
                        ):(
                            <Button variant= "outline-dark" onClick = {this.handleHighlight}>
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
                                <Button
                                 block
                                 variant = "outline-danger"
                                 onClick = {this.handleCheckDelete}>
                                    Delete Document
                                </Button>
                            </Row>
                        </Col>
                        <Col className = "docedit-properties">
                            <Row>
                                <h4>Attached Tags</h4>
                            </Row>
                            <Row className = "doc-tags">
                                <h4>{showtagButtons}</h4>
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
                                <FormControl
                                    placeholder = "Date"
                                    defaultValue = {this.state.acdate}
                                    onChange={this.onChangeAcdate}/>
                            </Row>
                            </Collapse>
                        </Col>
                    </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer className = "docedit-footer">
                    <Button variant = "outline-dark" onClick ={this.handleEditorClose} >Close</Button>
                    <Button variant = "outline-dark" onClick ={this.handleSaveChanges}>Save Changes</Button>


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
        ):(
            <Modal
             dialogClassName = "docview"
             show = {this.state.docViewer}
             onHide={this.handleViewerClose}
             backdrop="static"
             keyboard={false}
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
                    {this.state.login ? (
                        <Button variant = "outline-dark" onClick ={this.handleViewerEdit}>Edit</Button>
                    ):(
                        <div></div>
                    )}
                    
                </Modal.Footer>
            </Modal>
        )}
        </body>
    )
}
}
export default singleDoc;
