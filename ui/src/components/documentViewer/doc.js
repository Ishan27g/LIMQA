import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import "./docViewer.css";

import DocViewer from './docViewer.js';

class Doc extends Component {
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
    {/* Save Changes before going back to Viewer Mode*/}
    this.setState({docEditor:false, docViewer: true});
  }
  handleAbruptLeave = () => {
    {/* Leaves abruptly w/o saving Changes */}
    this.setState({docEditor:false, docViewer: false, checkEdit: false});
  }

  render(){
    return(
      <div>
        {DocViewer}
      </div>
    )
  }
}
export default Doc
