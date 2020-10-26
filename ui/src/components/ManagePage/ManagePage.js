import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import './Manage.css';

import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Card from 'react-bootstrap/Card';
import Carousel from "react-bootstrap/Carousel";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';

import Tag from './../Tags/Tag.js';
import CoverImage from '../CoverImage/coverImage.js';
import Docview from '../documentViewer/doc.js';
import docImage from '../../Image/documents.png';
import profile from '../../Image/profile.png';
import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';
import uploadIcon from '../../Image/uploadIcon.png';
import uploadDocuments from '../../Image/uploadDocuments.png';
import uploadCoverImageBg from '../../Image/bioContentBackground.jpg';
import {pathForRequest} from '../http.js';
let http = pathForRequest();

class ManagePage extends Component {
    constructor(props){
        super(props);
        this.docView = React.createRef();
        this.state = {

          editBio : false,
          filter : "Title",
          bio: 'tester',
          updateBio: '',
          userid: this.props.match.params.id,
          cover: [sampleImage1, sampleImage2, sampleImage3],
          updateProfile: null,
          updateCover: null,
          updateDoc: null,
          profileImg: http+'/api/users/profilePhoto/'+this.props.match.params.id,
          bgImg: http+'/api/users/bgImage/'+this.props.match.params.id,
          updatebgImg: null,
          docPath: '',
          doctype: '',
          documents: [],
          searching: false,
          search: "",
          tags: [],
          newTag: false,
          tagName: "",
          tagColor: "",
          delTag: "",
          tagManagement: false,
          alertCover: false,
          alertCreateTag: false,
          alertDelTag: false

        }
        this.handleEditBio = this.handleEditBio.bind(this);
        this.handleSubmiteBio = this.handleSubmiteBio.bind(this);
        this.handleFilterOnTitle = this.handleFilterOnTitle.bind(this);
        this.handleFilterOnTag = this.handleFilterOnTag.bind(this);
        this.onChangBioInfo = this.onChangBioInfo.bind(this);
        this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
        this.onChangeCoverImage = this.onChangeCoverImage.bind(this);
        this.uploadProfileImage = this.uploadProfileImage.bind(this);
        this.uploadCoverImage = this.uploadCoverImage.bind(this);
        this.onChangeDocUpload = this.onChangeDocUpload.bind(this);
        this.openDocView = this.openDocView.bind(this);
        this.onChangeBgImg = this.onChangeBgImg.bind(this);
        this.uploadBgImg = this.uploadBgImg.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.handleAddTagClose = this.handleAddTagClose.bind(this);
        this.handleAddTagShow = this.handleAddTagShow.bind(this);
        this.createNewTag = this.createNewTag.bind(this);
        this.onChangeTagName = this.onChangeTagName.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.handleTagShow = this.handleTagShow.bind(this);
        this.handleTagClose = this.handleTagClose.bind(this);
        this.tagColorChange = this.tagColorChange.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.abortDeleteTag = this.abortDeleteTag.bind(this);
    }

    componentDidMount(){
      const docUrl = http+'/api/documents/' + this.state.userid;
      axios.get(docUrl, { withCredentials: true })
      .then(res=>{
        this.setState({
          documents: res.data.documents
        })
      })

      const biourl = http+'/api/bioinfo/' + this.state.userid;
      axios.get(biourl, { withCredentials: true })
      .then(res =>{
        this.setState({
          bio: res.data.bioinfo,
          updateBio: res.data.bioinfo
        })
      })
      .catch(function(error) {
        console.log(error);
      })

      const imgUrl = http+'/api/users/coverImages/'+this.state.userid;
      axios.get(imgUrl, { withCredentials: true })
      .then(res =>{

        if (res.data.coverImages.coverImages[0] !== ""){
          var i;
          const tempCover = [];
          for (i=0; i<res.data.coverImages.coverImages.length; i++){
          tempCover.push(http+'/api/users/coverImages/'+this.state.userid+'/'+i)
          }
          this.setState({
            cover: tempCover
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });

      const tagUrl = http+'/api/tags/' + this.state.userid;
      axios.get(tagUrl)
      .then(res =>{
        this.setState({
          tags: res.data
        })
      })
      .catch(function(error) {
        console.log(error);
      })
    };

    onChangeProfileImage(e){
      this.setState({
        updateProfile: e.target.files[0]
      }, ()=>{
        if(this.state.updateProfile !== null){
          this.uploadProfileImage()
        }
      });
    }

    uploadProfileImage(){
      if (this.state.updateProfile !== null){
        const proImg = new FormData();
        proImg.append('file', this.state.updateProfile);
        axios.post(http+'/api/users/profilePhoto/'+this.state.userid, proImg, { withCredentials: true })
        .then( res => {
          console.log(res);
          const tempProfile = URL.createObjectURL(this.state.updateProfile);
          this.setState({
            profileImg: tempProfile
          })
        })
        .catch(function(error) {
          console.log(error);
        });
      };
    }

    onChangeCoverImage(e){
      this.setState({
        updateCover: e.target.files
      }, ()=>{
        if(this.state.uploadCoverImage !== null){
          this.uploadCoverImage();
        }
      });
    }

    uploadCoverImage(){
      if (this.state.updateCover !== null){
        var length
        if(this.state.cover[0]!==sampleImage1){
          length = this.state.cover.length + this.state.updateCover.length;
        }else{
          length = this.state.updateCover.length;
        }

        if(length < 6){
          const covImg = new FormData();
          var i;
          var tempCover = [];

          if(this.state.cover[0]!==sampleImage1){
            console.log("uptohere")
            for(i=0; i<this.state.cover.length; i++){
              tempCover.push(this.state.cover[i]);
            }
          }

          for(i=0; i<this.state.updateCover.length; i++){
            covImg.append('files', this.state.updateCover[i]);
            tempCover.push(URL.createObjectURL(this.state.updateCover[i]));
          }

          axios.post(http+'/api/users/coverImages/'+this.state.userid, covImg, { withCredentials: true })
          .then( res => {
            this.setState({
              cover: tempCover
            })
          })
          .catch(function(error) {
            console.log(error);
          });

        }else{
          this.setState({alertCover:true},()=>{
            window.setTimeout(()=>{
              this.setState({alertCover:false}, ()=>{
                this.setState({
                  updateCover: null
                })
              })
            },1500);
          });
        }

      }
    }

    handleEditBio = () => {
        this.setState({ editBio: true });
    }

    handleSubmiteBio = () => {
      const obj = {
        bioinfo: this.state.updateBio
      };
      axios.put(http+'/api/bioinfo/'+this.state.userid, obj, { withCredentials: true })
      .then(res =>{
        const tempBio = this.state.updateBio;
        this.setState({
          bio: tempBio
        })
      })
      .catch(function(error) {
        console.log(error);
      });
      this.setState({ editBio: false });
    }

    handleFilterOnTitle = () => {
        this.setState({
          filter: "Title",
          search: "",
          searching: false
        });
    }

    handleFilterOnTag = () => {
        this.setState({
          filter: "Tag",
          search: "All|",
          searching: false
        });
    }

    handleAddTagShow(){
      console.log('up to here')
      this.setState({newTag: true})
    }

    handleAddTagClose(){
      this.setState({newTag: false})
    }

    onChangBioInfo(e){
      if (e.target.value.length > 0){
        this.setState({
          updateBio: e.target.value
        });
      }else{
        const info = this.state.bio;
        this.setState({
          updateBio: info
        });
      }
    }

    onChangeDocUpload(e){
      this.setState({
        updateDoc: e.target.files[0],
        docPath: URL.createObjectURL(e.target.files[0])
      }, ()=>{
        if(this.state.updateDoc !== null){
          this.docView.current.handleUploadMode();
        }
      });
    }

    onChangeBgImg(e){
      this.setState({
        updatebgImg: e.target.files[0]
      }, ()=>{
        if(this.state.updatebgImg !== null){
          this.uploadBgImg();
        }
      })
    }

    uploadBgImg(){
      const bgImg = new FormData();
      bgImg.append('file', this.state.updatebgImg)
      axios.post(http+'/api/users/bgImage/'+this.state.userid, bgImg, { withCredentials: true })
      .then( res => {
        console.log(res);
        const tempProfile = URL.createObjectURL(this.state.updatebgImg);
        this.setState({
          bgImg: tempProfile
        })
      })
      .catch(function(error) {
        console.log(error);
      });

    }

    openDocView = () =>{
      this.docView.current.handleViewerShow();
    }

    onChangeSearch(e){
      if (e.target.value === ""){
        this.setState({
          search: e.target.value,
          searching: false
        });
      } else {
        this.setState({
          search: e.target.value,
          searching: true
        });
      }
    }

    onChangeTagName(e){
      this.setState({
        tagName: e.target.value,
        alertCreateTag: false
      })
    }

    createNewTag(){
      if(this.state.tagName !== ""){
        const obj = {
          name: this.state.tagName,
          color: this.state.tagColor
        }
        const tagUrl = http +'/api/tags/' + this.state.userid;
        axios.post(tagUrl, obj, { withCredentials: true })
        .then( res => {
          const gettagUrl = http +'/api/tags/' + this.state.userid;
          axios.get(gettagUrl)
          .then(res =>{
            this.setState({
              tags: res.data,
              newTag: false
            })
          })
          .catch(function(error) {
            console.log(error);
          })
        })
        .catch(function(error) {
          console.log(error);
        });
      } else {
        this.setState({alertCreateTag: true});
      }
    }

    intersection() {
      var result = [];
      var lists;

      if(arguments.length === 1) {
        lists = arguments[0];
      } else {
        lists = arguments;
      }

      for(var i = 0; i < lists.length; i++) {
        var currentList = lists[i];
        for(var y = 0; y < currentList.length; y++) {
          var currentValue = currentList[y];
          if(result.indexOf(currentValue) === -1) {
            if(lists.filter(function(obj) { return obj.indexOf(currentValue) === -1 }).length === 0) {
              result.push(currentValue);
            }
          }
        }
      }
      return result;
    }

    onChangeTag(e){
      if (this.state.search === ""){
        this.setState({
          searching: true,
          search: e.target.innerHTML + '|'
        })
      }else{
        var tempTag = this.state.search.split("|");
        tempTag.pop();
        if (tempTag.includes(e.target.innerHTML)){
          if(e.target.innerHTML !== "All"){
            var index = tempTag.indexOf(e.target.innerHTML);
            tempTag.splice(index, 1);
            var i;
            var tempString = tempTag[0];
            for(i=1; i<tempTag.length; i++){
              tempString = tempString + "|" + tempTag[i]
            }
            tempString = tempString + "|"
            this.setState({
              search: tempString
            })
          }
        }else{
          this.setState({
            searching: true,
            search: this.state.search + e.target.innerHTML + '|'
          })
        }
      }
    }

    handleTagShow(){
      this.setState({
        tagManagement: true
      })
    }

    handleTagClose(){
      this.setState({
        tagManagement: false
      }, () => {window.location.href = "/manage/" + this.state.userid})
    }

    tagColorChange(variant){

      this.setState({
        tagColor: variant
      });
    }

    deleteTag(){

      var tagId = this.state.delTag;
      if(this.state.delTag !== ""){
      axios.delete(http + '/api/deleteTag/' + tagId, {withCredentials: true})
      .then(response => {

            const tagUrl = http+'/api/tags/' + this.state.userid;
            axios.get(tagUrl)
            .then(res =>{
              this.setState({
                tags: res.data
              }, () => this.setState({alertDelTag: false}))
            })
            .catch(function(error) {
              console.log(error);
            })
        })
      .catch(function(error) {
        console.log(error);
      })
    } else {
      console.log("TAG DELETION FAILED");
      this.abortDeleteTag();
    }

  }
    abortDeleteTag(){
      this.setState({
        alertDelTag: false,
        delTag: ""
      })
    }
    render(){
      var doc = {doc: this.state.updateDoc, id: this.state.userid};
      //const documents = [{Title: "sample documents 1"}, {Title: "sample documents 2"}, {Title: "sample documents 3"},{Title: "sample documents 4"},{Title: "sample documents 5"},{Title: "sample documents 6"},{Title: "sample documents 7"}];
      var searchDocs = this.state.documents;

      var tags = this.state.tags;

      let tagsMap = tags.filter(tag => {
          return (tag.name !== "All")
      }).map(tags =>{
          return(
            <Row>
              <Button
                variant = "outline-danger"
                style = {{border: "0px solid red"}}
                onClick= {() => {this.setState({alertDelTag: true, delTag: tags._id})}}>
                <Tag note={tags.name}
                     variant ={tags.color}/>
              </Button>
             </Row>
           )
         });

      var tagNames = [];
      let tagsButtonMap = tags.map(tags =>{
        tagNames.push(tags.name);
          return(
              <Button onClick={this.onChangeTag} variant = {tags.color}className = "mt-sm-1 mr-sm-1">{tags.name}</Button>
          )
      })

      let docCards = searchDocs.map(card =>{
        return(
          <Col sm='6' className = "mb-sm-3 justify-content-center">
            <div>
              <Card className='document-card' bg = "dark" text = "light">
                <Card.Img variant='top' src={docImage}
                          style ={{alignSelf: "center", width: "auto", height: "200px"}}/>
                <Card.Body onClick = {event =>  window.location.href = '/documents/'+card._id }>
                <Card.Title >
                  {card.name}
                </Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
        )
      });

      if(this.state.filter === "Title"){
        searchDocs = this.state.documents.filter(doc => {
          if (this.state.search === "") {

            return("")

          } else {

            var name = doc.name;
            const pattern = this.state.search.split("").map(letter => {
              if(!("\\+*()?.,".includes(letter))) {
                return `(?=.*${letter})`
              } else {
                return ""
              }
            }).join("");

            const regex = new RegExp(`${pattern}`, "g");

            return (name.toLowerCase().includes(this.state.search.toLowerCase()) || name.match(regex))

          }
        }).sort((a,b)=> b["name"] - a["name"]).slice(0,7);

      }else{
        if (this.state.search !== ""){
          var selectTags = this.state.search.split("|");
          var tempTagWithDoc = [];
          var i;
          for(i=0; i<selectTags.length; i++){
            var j;
            for(j=0; j<tagNames.length; j++){
              if(selectTags[i] === tagNames[j]){
                tempTagWithDoc.push(this.state.tags[j].files);
              }
            }
          }
          tempTagWithDoc = this.intersection(tempTagWithDoc);
          searchDocs = this.state.documents.filter(function(document){
            return tempTagWithDoc.includes(document._id)
          });

        }
      }

    let showDocs = searchDocs.map( searchedDoc => {
        return (
            <Col sm='6' className = "mb-sm-3 justify-content-center">
                <div>
                <Card bg = "dark" text = "light" >
                  <Card.Img variant='top' src={docImage}
                            style ={{alignSelf: "center", width: "auto",
                                    height: "250px"}}/>
                    <Card.Body onClick = {event =>  window.location.href = '/documents/'+ searchedDoc._id }>
                    <Card.Title>
                        {searchedDoc.name}
                    </Card.Title>
                    </Card.Body>
                </Card>
                </div>
            </Col>
        )
    });

      const coverImg = this.state.cover;
      let coverImage = coverImg.map(cover =>{
        return(
          <Carousel.Item>
            <CoverImage note={cover} />
          </Carousel.Item>
        )
      });
      var colorMap = [  'primary','secondary','success',  'danger', 'warning',
                        'info', 'light','dark'].map(variant => {
                          return(
                            <ToggleButton size = "lg" className ="mr-sm-2"
                                          variant = {variant} value = {variant}>
                            </ToggleButton>)
                        });
      return(
        <body>

        <div class = "manage-cover-image">
          {this.state.alertCover?(
            <Alert variant="danger" show={this.state.alertCover} block>
            Upload cover image failed, the limit of total cover image is 5!
            </Alert>
          ):(
            <Carousel Fluid>
              {coverImage}
            <Carousel.Item>
              <input
              type="file"
              style={{display: "none"}}
              onChange={this.onChangeCoverImage}
              ref={coverInput=>this.coverInput=coverInput}
              multiple="multiple"/>
              <img
              src = {uploadCoverImageBg}
              onClick = {() => this.coverInput.click()} />
            <Carousel.Caption>
              <img
                src = {uploadIcon}
                alt ="Upload Icon"
                onClick = {() => this.coverInput.click()}
                style = {{height: "7vmax", width: "9vmax", marginBottom: "1vmax"}}/>
              <h3>Uplaod Cover Image</h3>
            </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
          )}

        </div>

            <div class = "manage-basic-info">
              <Container fluid = {true}>
                  <Row>
                    <Col>
                      <h1 className = "welcome-sign">Welcome!<br/></h1>
                    </Col>
                  </Row>
                  <Row>
                      <Col style = {{textAlign: "center"}}>
                          <Image src={this.state.profileImg} roundedCircle style = {{height: "20vmax", width: "20vmax"}} onError={(e)=>{e.target.onerror = null; e.target.src=profile}}/>
                          <input
                           type="file"
                           onChange={this.onChangeProfileImage}
                           style={{display: 'none'}}
                           ref={profileInput=>this.profileInput=profileInput} />
                      <Col>
                        <Button variant="info" onClick={() => this.profileInput.click()}>Select photo</Button> {' '}
                      </Col>
                      </Col>
                      <Col className = "bioinfo">
                          {this.state.editBio ? (
                              <Form style ={{textAlign: "center", color: "white"}}>
                                <h5>Enter your new bio here</h5>
                                  <Form.Control
                                    as="textarea"
                                    rows = "8"
                                    defaultValue = {this.state.bio}
                                    onChange={this.onChangBioInfo}/>
                                  <h6> 100 charcater limit</h6>
                                  <Button variant="info" onClick={this.handleSubmiteBio} block className = "mt-3">Submit</Button>
                              </Form>
                          ):
                          (
                          <Form>
                            {this.state.bio}
                            <Button variant="info" onClick={this.handleEditBio} block>Edit</Button>
                          </Form>
                          )}
                      </Col>
                  </Row>

                </Container>
              </div>

              <Docview doc={doc} ref={this.docView}/>

              <div class = "document-arena">
                <h2 style = {{marginBottom: "3vmax"}}>Document Arena</h2>
                <Container>
                  <Row>
                      <Col className = "upload-doc-input justify-content-center">
                        <Row>
                        <input
                         type="file"
                         style={{display: "none"}}
                         onChange={this.onChangeDocUpload}
                         ref={docInput=>this.docInput=docInput}/>
                        <Image
                         src={uploadDocuments}
                         style = {{height: "200px", width: "200px"}}
                         onClick = {() => this.docInput.click()}/>
                        </Row>
                        <Row>
                          <p>Upload Documents</p>
                        </Row>
                        <Row className = "mt-sm-4">
                          <Button variant="info" block onClick={this.handleTagShow}>Manage tags</Button>
                        </Row>

                      </Col>

                      <Col xs={6} md={8}>

                      <Container fluid style={{height:'40rem'}}>
                        <Row className = "justify-content-center">
                          <Form inline className = "document-arena-search">
                              {this.state.filter === "Title" ? (
                                <FormControl  type="text"
                                              placeholder="Search for documents by names"
                                              className="mr-sm-2 w-75"
                                              value = {this.state.search}
                                              onChange={this.onChangeSearch}/>
                              ):(
                                <FormControl type="text"
                                             placeholder="Search for documents by tags"
                                             className="mr-sm-2 w-75"
                                             defaultValue = "Select documents by tags"
                                             value = {this.state.search}
                                             disabled/>
                              )}

                              <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.filter}
                                </Dropdown.Toggle>
                              <Dropdown.Menu>
                                  <Dropdown.Item onClick={this.handleFilterOnTitle}>Title</Dropdown.Item>
                                  <Dropdown.Item onClick={this.handleFilterOnTag}>Tags</Dropdown.Item>
                              </Dropdown.Menu>
                              </Dropdown>
                          </Form>
                        </Row>
                        {this.state.filter === "Title" ? (
                          <Row className = "mt-sm-2 mb-sm-4"></Row>
                        ):(
                          <Row className = "mt-sm-1 justify-content-center">
                            {tagsButtonMap}
                          </Row>
                        )}
                          <Container fluid
                                     style={{overflow:"auto",
                                              height:'40rem'}}>
                            {this.state.searching ? (
                              <Row className = "document-arena-row">
                                {showDocs}
                              </Row>
                            ):(
                              <Row className = "document-arena-row">
                                {docCards}
                              </Row>
                            )}
                          </Container>
                      </Container>
                      </Col>
                  </Row>
                  <Row style={{marginTop: '1rem'}}>

                  </Row>
                  <Row className = "mt-3">
                    <input
                          type="file"
                          style={{display: "none"}}
                          onChange={this.onChangeBgImg}
                          ref={bgInput=>this.bgInput=bgInput}/>
                    <Button block variant="info" onClick = {() => this.docInput.click()}>
                      Select Background Gradient</Button>
                  </Row>

                  <Modal
                    show={this.state.tagManagement}
                    onHide={this.handleTagClose}
                    backdrop="static"
                    keyboard={false}
                    dialogClassName ="manage-tags"
                  >
                  <Modal.Header closeButton>
                    <Modal.Title>Tags Management</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container fluid className = "manage-tags-list">
                      {tagsMap}
                    </Container>
                  </Modal.Body>
                  <Modal.Footer className = "tags-management-modal-footer">
                    <Button variant="danger" onClick={this.handleTagClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={this.handleAddTagShow}>Add new Tag</Button>
                  </Modal.Footer>
                </Modal>

                <Modal show = {this.state.newTag}>
                  <Modal.Header>
                    Create a new Tag
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <InputGroup>
                          <Form.Control type="tag" placeholder="Enter new tag name" onChange={this.onChangeTagName}/>
                          <InputGroup.Append>
                            <OverlayTrigger placement="top"
                                            delay={{ hide: 400 }}
                                            overlay={
                                              <Popover id="popover-basic">
                                                <Popover.Title as="h6">Tag requirements</Popover.Title>
                                                <Popover.Content>
                                                  Maximum Length:
                                                  <strong> 20 characters</strong><br/>
                                                  Pick a <strong>Color </strong>
                                                  as well!
                                                </Popover.Content>
                                              </Popover>
                                            }>
                              <Button variant = "light">?</Button>
                            </OverlayTrigger>
                          </InputGroup.Append>
                        </InputGroup>

                      </Form.Group>
                      <Form.Group>
                        <Form.Text as = "h5">Pick a Color</Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <ToggleButtonGroup type="radio" name="options" defaultValue="primary" onChange = {this.tagColorChange}>
                          {colorMap}
                        </ToggleButtonGroup>
                      </Form.Group>
                      {this.state.createNewTag?(
                          <Alert block variant = "danger">
                            Name your Tag!
                          </Alert>
                        ):(
                          <div></div>
                        )
                      }
                    </Form>
                  </Modal.Body>
                  <Modal.Footer className = "tags-management-modal-footer">
                    <Button variant="warning" type="submit" onClick={this.handleAddTagClose}>
                      Return
                    </Button>
                    <Button variant="primary" type="submit" onClick={this.createNewTag}>
                      Create
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal show = {this.state.alertDelTag}>
                  <Modal.Header>
                    Delete Tag Permanently?
                  </Modal.Header>

                  <Modal.Footer className = "tags-management-modal-footer">
                    <Button variant = "secondary" onClick ={this.abortDeleteTag}>
                      Return
                    </Button>
                    <Button variant = "warning" onClick ={this.deleteTag} >
                      Delete Tag
                    </Button>
                  </Modal.Footer>
                </Modal>
                </Container>
              </div>
            </body>
        )
    }
}
export default ManagePage;
