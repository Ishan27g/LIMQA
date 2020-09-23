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
          userid:''
        }
        this.handleEditBio = this.handleEditBio.bind(this);
        this.handleSubmiteBio = this.handleSubmiteBio.bind(this);
        this.handleFilterOnTitle = this.handleFilterOnTitle.bind(this);
        this.handleFilterOnTime = this.handleFilterOnTime.bind(this);
        this.handleFilterOnElse = this.handleFilterOnElse.bind(this);
        this.onChangBioInfo = this.onChangBioInfo.bind(this);
    }

    componentDidMount(){
      const idurl = 'http://localhost:8080/api/users/check';
      axios.get(idurl, { withCredentials: true })
      .then(response => {
        console.log(response.data.userid)
        this.setState({
          userid: response.data.userid
        })
      })
      const biourl = 'http://localhost:8080/api/bioinfo';
      axios.get(biourl, { withCredentials: true })
      .then(res =>{
        this.setState({
          bio: res.data.bioinfo,
          updateBio: res.data.bioinfo
        })
      })
    };
    
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
        })
        const coverImg = [{path: '../../Image/sampleImage1.jpg'}, {path: '../../Image/sampleImage2.jpg'}, {path: '../../Image/sampleImage3.jpg'}];
        let coverImage = coverImg.map(cover =>{
          return(
            <CoverImage note={cover}/>
          )
        })
        return(
            <body>
            <div class = "manage-cover-image">
              <Carousel>
                  {coverImage}
                  <Carousel.Item>
                      <img
                      src= {sampleImage1}
                      alt="First slide"
                      />
                      <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                      <img
                      src= {sampleImage2}
                      alt="Third slide"
                      />

                      <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                      <img
                      src= {sampleImage3}
                      alt="Third slide"
                      />

                      <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <input type="file" id="BtnBrowseHidden" name="files" style={{display: "none"}} />
                    <label for="BtnBrowseHidden" className="imageUpload">
                      <Image src = {uploadIcon} alt ="Upload Icon" style = {{width: "11vmax", height: "9vmax"}}/>
                      <br/>Upload Cover Images
                    </label>
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
                  <Row style ={{marginTop: "2vmax"}}>
                      <Col style = {{textAlign: "center"}}>
                          <Image src={profile} roundedCircle style = {{height: "20vmax", width: "20vmax"}}/>
                          <input type="file" id="BtnBrowseHidden" name="files" style={{display: "none"}} />
                      <Col>
                      </Col>
                        <label htmlFor="BtnBrowseHidden" className="profileUpload">
                            Upload profile
                        </label>
                      </Col>
                      <Col style = {{backgroundColor: "rgba(180,180,180,0.5)" , border: "2px solid black", borderRadius: "15px"}}>
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
                <h2 style = {{marginBottom: "3vmax"}}>Document Arena</h2>
                <Container>
                  <Row style ={{}}>
                      <Col style = {{textAlign: "center", marginTop: "15vmax", marginBottom: "10vmax"}}>
                          <Image src={uploadDocuments} style = {{height: "20vmax", width: "15vmax", backgroundColor: "rgba(200,200,200,0.4)"}}/>
                          <input type="file" id="BtnBrowseHidden" name="files" style={{display: "none"}} />
                          <label htmlFor="BtnBrowseHidden" className="docUpload">
                              Upload Documents
                          </label>
                      </Col >

                      <Col xs={6} md={8}>
                      <Container fluid style={{overflow:"scroll", height:'45rem'}}>
                        <Row>
                          <Col style = {{textAlign: "center"}}>
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
                        <Row style = {{marginTop:"3vmax"}}>
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
