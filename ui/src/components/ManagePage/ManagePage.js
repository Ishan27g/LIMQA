import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import './Manage.css';

import Container from 'react-bootstrap/Container';
import Carousel from "react-bootstrap/Carousel";
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DocCard from '../documentsCard.js';
import CoverImage from '../CoverImage/coverImage.js';

import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';
import profile from '../../Image/profile.png';
import uploadIcon from '../../Image/uploadIcon.png';
import uploadDocuments from '../../Image/uploadDocuments.svg';
import axios from "axios";

class ManagePage extends Component {
    constructor(){
        super();
        this.state = {
          editBio : false,
          filter : "Title",
          bio: '',
          updateBio: '',
          userid:'',
          cover: [],
          updateProfile: null,
          updateCover: null,
        }
        this.handleEditBio = this.handleEditBio.bind(this);
        this.handleSubmiteBio = this.handleSubmiteBio.bind(this);
        this.handleFilterOnTitle = this.handleFilterOnTitle.bind(this);
        this.handleFilterOnTime = this.handleFilterOnTime.bind(this);
        this.handleFilterOnElse = this.handleFilterOnElse.bind(this);
        this.onChangBioInfo = this.onChangBioInfo.bind(this);
        this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
        this.onChangeCoverImage = this.onChangeCoverImage.bind(this);
        this.uploadProfileImage = this.uploadProfileImage.bind(this);
        this.uploadCoverImage = this.uploadCoverImage.bind(this);
    }

    componentDidMount(){
      const idurl = 'http://localhost:8080/api/users/check';
      axios.get(idurl, { withCredentials: true })
      .then(response => {
        this.setState({
          userid: response.data.userid
        })
      })
      .catch(function(error) {
        console.log(error);
    })
    
      const biourl = 'http://localhost:8080/api/bioinfo';
      axios.get(biourl, { withCredentials: true })
      .then(res =>{
        this.setState({
          bio: res.data.bioinfo,
          updateBio: res.data.bioinfo
        })
        if (!res.data.bioinfo || this.state.bio.length < 1){
          this.setState({
            bio: 'this person have no bioinfo yet',
            updateBio: 'this person have no bioinfo yet',
          })
      }
      })
      .catch(function(error) {
        console.log(error);
      })

      const imgUrl = 'http://localhost:8080/api/users/coverImages';
      axios.get(imgUrl, { withCredentials: true })
      .then(res =>{
        var i;
        const tempCover = [];
        for (i=0; i<res.data.coverImages.coverImages.length; i++){
          tempCover.push('http://localhost:8080/api/users/coverImages/'+i)
        }
        this.setState({
          cover: tempCover
        })

        if (this.state.cover.length < 1){
          this.setState({
            cover: [sampleImage1, sampleImage2, sampleImage3]
          })
        }
        
      })
      .catch(function(error) {
        console.log(error);
      })
    };
    
    onChangeProfileImage(e){
      console.log(e.target.files[0]);
      this.setState({
        updateProfile: e.target.files[0]
      })
    }

    uploadProfileImage(){
      if (this.state.updateProfile !== null){
        const proImg = new FormData();
        proImg.append('file', this.state.updateProfile)
        axios.post('http://localhost:8080/api/users/profilePhoto', proImg, { withCredentials: true })
        .then( res => {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        })
      }
    }

    onChangeCoverImage(e){
      console.log(e.target.files[0]);
      this.setState({
        updateCover: e.target.files[0]
      })
    }

    uploadCoverImage(){
      if (this.state.updateCover !== null){
        const covImg = new FormData();
        covImg.append('files', this.state.updateCover)
        axios.post('http://localhost:8080/api/users/coverImages', covImg, { withCredentials: true })
        .then( res => {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        })
      }

    }

    handleEditBio = () => {
        this.setState({ editBio: true });
    }

    handleSubmiteBio = () => {
      const obj = {
        bioinfo: this.state.updateBio
    };
      axios.put('http://localhost:8080/api/bioinfo/'+this.state.userid, obj, { withCredentials: true })
      this.setState({ editBio: false });
    }

    handleFilterOnTitle = () => {
        this.setState({filter: "Title"});
    }

    handleFilterOnTime = () => {
        this.setState({filter: "Time"});
    }

    handleFilterOnElse = () => {
        this.setState({filter: "Else"});
    }

    onChangBioInfo(e){
      if (e.target.value.length > 0){
        this.setState({
          updateBio: e.target.value
        })
      }else{
        const info = this.state.bio;
        this.setState({
          updateBio: info
        })
      }
    }

    render(){
        const documents = [{Title: "sample documents 1"}, {Title: "sample documents 2"}, {Title: "sample documents 3"},{Title: "sample documents 4"},{Title: "sample documents 5"},{Title: "sample documents 6"},{Title: "sample documents 7"}];
        let docCards = documents.map(card =>{
          return(
            <Col sm='4'>
              <DocCard note={card}/>
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
              <Carousel>
                  {coverImage}
                  <Carousel.Item>
                     multiple/>
                    <input
                     type="file"
                     onChange={this.onChangeCoverImage}
                     style={{display: "none"}}
                     ref={coverInput=>this.coverInput=coverInput}
                    <label className="imageUpload">
                      <Image 
                      src = {uploadIcon}
                      alt ="Upload Icon" 
                      style = {{width: "11vmax", height: "9vmax"}}
                      onClick = {() => this.coverInput.click()} />
                      <br/>Upload Cover Images
                    </label>
                    <Button variant="info" onClick={this.uploadCoverImage} block>Upload Cover Image</Button>
                  </Carousel.Item>
              </Carousel>
            </div>

            <div class = "manage-basic-info">
              <Container fluid = {true}>
                  <Row>
                    <Col>
                      <h1>Welcome!</h1>
                    </Col>
                  </Row>
                  <Row className = "manage-basic-info-row">
                      <Col className = "column1" >
                          <Image src={'http://localhost:8080/api/users/profilePhoto'} roundedCircle style = {{height: "20vmax", width: "20vmax"}} onError={(e)=>{e.target.onerror = null; e.target.src=profile}}/>
                          <input 
                           type="file"
                           onChange={this.onChangeProfileImage}
                           style={{display: 'none'}}
                           ref={profileInput=>this.profileInput=profileInput} />
                      <Col>
                        <Button variant="info" onClick={() => this.profileInput.click()}>Select photo</Button> {' '}
                        <Button variant="info" onClick={this.uploadProfileImage}>Upload photo</Button>                  
                      </Col>
                      </Col>
                      <Col className = "column2" >
                          {this.state.editBio ? (
                              <Form>
                                  <Form.Label>Enter your new bio here</Form.Label>
                                  <Form.Control as="textarea" rows="3" onChange={this.onChangBioInfo}/>
                                  <Button variant="info" onClick={this.handleSubmiteBio} block>submit</Button>
                              </Form>
                          ):
                          (
                          <p>{this.state.bio}</p>
                          )}
                          <Button variant="info" onClick={this.handleEditBio} block>Edit</Button>

                      </Col>
                  </Row>
                </Container>
              </div>

              <div class = "document-arena">
                <h2>Document Arena</h2>
                <Container>
                  <Row className = "document-arena-row">
                      <Col className = "column1">
                          <Image src={uploadDocuments} />
                          <input type="file" id="BtnBrowseHidden" name="files"/>
                          <label htmlFor="BtnBrowseHidden" className="docUpload">
                              Upload Documents
                          </label>
                      </Col >

                      <Col xs={6} md={8}>
                      <Container fluid >
                        <Row>
                          <Col id="column1">
                            <Form inline>
                                <FormControl type="text" placeholder="Search for documents" className="mr-sm-2" />
                                <Dropdown>
                                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                                      {this.state.filter}
                                  </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.handleFilterOnTitle}>Title</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleFilterOnTime}>Time</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleFilterOnElse}>something else</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </Form>
                          </Col>
                        </Row>
                        <Row id="row-do">
                            {docCards}
                        </Row>
                      </Container>

                      </Col>
                  </Row>
                </Container>
              </div>
            </body>
        )
    }
}
export default ManagePage;
