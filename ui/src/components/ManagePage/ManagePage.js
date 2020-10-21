import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import './Manage.css';

import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from "react-bootstrap/Carousel";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Tag from './../Tags/Tag.js';

import CoverImage from '../CoverImage/coverImage.js';
import Docview from '../documentViewer/doc.js';

import docImage from '../../Image/documents.png';
import profile from '../../Image/profile.png';
import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';
import uploadIcon from '../../Image/uploadIcon.png';
import uploadDocuments from '../../Image/uploadDocuments.svg';
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
        proImg.append('file', this.state.updateProfile)
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
        const covImg = new FormData();
        //covImg.append('files', this.state.updateCover)
        var i;
        var tempCover = [];
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
      };

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
          search: "",
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
        tagName: e.target.value
      })
    }

    createNewTag(){
      const obj = {
        name: this.state.tagName,
        color: 'green'
      }
      const tagUrl = http+'/api/tags/'+this.state.userid;
      axios.post(tagUrl, obj, { withCredentials: true })
      .then( res => {
        console.log(res);
        const gettagUrl = http+'/api/tags/' + this.state.userid;
        axios.get(gettagUrl)
        .then(res =>{
          this.setState({
            tags: res.data
          })
        })
        .catch(function(error) {
          console.log(error);
        })
      })
      .catch(function(error) {
        console.log(error);
      });
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
          search: e.target.innerHTML + ';'
        })
      }else{
        var tempTag = this.state.search.split(";");
        tempTag.pop();
        if (tempTag.includes(e.target.innerHTML)){
          var index = tempTag.indexOf(e.target.innerHTML);
          tempTag.splice(index, 1);
          var i;
          var tempString = tempTag[0];
          for(i=1; i<tempTag.length; i++){
            tempString = tempString + ";" + tempTag[i]
          }
          tempString = tempString + ";"
          this.setState({
            search: tempString
          })
        }else{
          this.setState({
            searching: true,
            search: this.state.search + e.target.innerHTML + ';'
          })
        }
      }
    }


    render(){
      var doc = {doc: this.state.updateDoc, id: this.state.userid};
      //const documents = [{Title: "sample documents 1"}, {Title: "sample documents 2"}, {Title: "sample documents 3"},{Title: "sample documents 4"},{Title: "sample documents 5"},{Title: "sample documents 6"},{Title: "sample documents 7"}];
      var searchDocs = this.state.documents;

      var tags = this.state.tags;

      let tagsMap = tags.map(tags =>{
          return(
              <Tag note={tags.name}/>
          )
      })

      var tagNames = [];
      let tagsButtonMap = tags.map(tags =>{
        tagNames.push(tags.name);
          return(
              <Button onClick={this.onChangeTag}>{tags.name}</Button>
          )
      })

      let docCards = searchDocs.map(card =>{
        return(
          <Col sm='4'>
            <div>
              <Card className='documentsCard' >
                <Card.Img variant='top' src={docImage}/>
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
          var selectTags = this.state.search.split(";");
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
            <Col sm='4' >
                <div>
                <Card className='documentsCard' >
                    <Card.Img variant='top' src={docImage}/>
                    <Card.Body>
                    <Card.Title onClick = {event =>  window.location.href = '/documents/'+ searchedDoc._id }>
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

      return(
        <body>
        <div class = "manage-cover-image">
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
                      <Col className = "upload-doc-input">
                        <Row>
                        <input
                         type="file"
                         style={{display: "none"}}
                         onChange={this.onChangeDocUpload}
                         ref={docInput=>this.docInput=docInput}/>
                        <Image
                         src={uploadDocuments}
                         style = {{height: "20vmax", width: "15vmax", backgroundColor: "rgba(200,200,200,0.4)"}}
                         onClick = {() => this.docInput.click()}/>
                        </Row>
                        <Row>
                          <p>Upload Documents</p>
                        </Row>
                      </Col>

                      <Col xs={6} md={8}>

                      <Container fluid style={{height:'45rem'}}>
                        <Row>
                        <Col style = {{textAlign: "center"}}>
                            <Form inline>
                                {this.state.filter === "Title" ? (
                                  <FormControl type="text" placeholder="Search for documents by names" className="mr-sm-2" value = {this.state.search} onChange={this.onChangeSearch}/>
                                ):(
                                  <FormControl type="text" placeholder="Search for documents by tags" className="mr-sm-2" value = {this.state.search} onChange={this.onChangeSearch} readOnly/>
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
                          </Col>
                          {this.state.filter === "Title" ? (
                            <Row></Row>
                          ):(
                            <Row>
                              {tagsButtonMap}
                            </Row>
                          )}

                        </Row>
                          <Container fluid style={{overflow:"auto", height:'40rem', marginTop: '3rem'}}>
                            {this.state.searching ? (
                              <Row>
                                {showDocs}
                              </Row>
                            ):(
                              <Row>
                                {docCards}
                              </Row>
                            )}
                          </Container>
                      </Container>
                      </Col>
                  </Row>
                </Container>
              </div>
              <div class = "document-arena">
                <h2 style = {{marginBottom: "3vmax"}}>Tags Management</h2>
                <Container>
                  <Row style = {{height: "10vmax"}}>
                    <Col>
                      {this.state.newTag? (
                        <Form>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Control type="tag" placeholder="Enter new tag name" onChange={this.onChangeTagName}/>
                          </Form.Group>
                          <Button variant="primary" type="submit" onClick={this.createNewTag}>
                            Create
                          </Button>
                        </Form>
                        
                      ):(
                        <Button variant="info" onClick={this.handleAddTagShow}>Add new tag</Button>
                      )}
                    </Col>
                    <Col>
                      {tagsMap}
                    </Col>
                  </Row>

                </Container>
                <Container>
                  <Row className = "mt-3">
                    <input
                          type="file"
                          style={{display: "none"}}
                          onChange={this.onChangeBgImg}
                          ref={bgInput=>this.bgInput=bgInput}/>
                    <Button block variant="info" onClick = {() => this.docInput.click()}>
                      Select Background Gradient</Button>
                  </Row>
                </Container>
              </div>

            </body>
        )
    }
}
export default ManagePage;
