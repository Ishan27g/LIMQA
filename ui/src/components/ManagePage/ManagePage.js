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

import sampleImage1 from '../../Image/sampleImage1.jpg';
import sampleImage2 from '../../Image/sampleImage2.jpg';
import sampleImage3 from '../../Image/sampleImage3.jpg';
import profile from '../../Image/profile.png';
import uploadIcon from '../../Image/uploadIcon.png';
import uploadDocuments from '../../Image/uploadDocuments.svg';

class ManagePage extends Component {
    constructor(){
        super();
        this.state = {
            editBio : false,
            filter : "Title",
            bioinfo: '',
        }
        this.handleEditBio = this.handleEditBio.bind(this);
        this.handleSubmiteBio = this.handleSubmiteBio.bind(this);
        this.handleFilterOnTitle = this.handleFilterOnTitle.bind(this);
        this.handleFilterOnTime = this.handleFilterOnTime.bind(this);
        this.handleFilterOnElse = this.handleFilterOnElse.bind(this);
        this.onChangBioInfo = this.onChangBioInfo.bind(this);
    }

    componentDidMount(){
      // wait for back end for routes
    };
    
    handleEditBio = () => {
        this.setState({ editBio: true });
    }

    handleSubmiteBio = () => {
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
      this.setState({
        bioinfo: e.target.value
      })
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

        return(
            <body>
            <div class = "manage-cover-image">
              <Carousel>
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
                    <input type="file" id="BtnBrowseHidden" name="files" />
                    <label for="BtnBrowseHidden" className="imageUpload">
                      <Image src = {uploadIcon} alt ="Upload Icon" />
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
                  <Row className = "manage-basic-info-row">
                      <Col className = "column1" >
                          <Image src={profile} roundedCircle/>
                          <input type="file" id="BtnBrowseHidden" name="files" />
                      <Col>
                      </Col>
                        <label htmlFor="BtnBrowseHidden" className="profileUpload">
                            Upload profile
                        </label>
                      </Col>
                      <Col className = "column2" >
                          {this.state.editBio ? (
                              <Form>
                                  <Form.Label>Enter your bio here</Form.Label>
                                  <Form.Control as="textarea" rows="3" onChange={this.onChangBioInfo}/>
                                  <Button variant="outline-info" onClick={this.handleSubmiteBio}>submit</Button>
                              </Form>
                          ):
                          (<p>Twitter lover. Certified
                              entrepreneur Tv evangelist.
                              Hardcore thinker. Professional reader.
                              Problem solver. Organizer.
                            </p>)}
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
