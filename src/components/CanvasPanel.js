import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Canvas from './mCanvas'
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { setCropping, setImage, setImageUrl } from '../redux/actions/index';
import AvatarEditor from 'react-avatar-editor';
import {Step, 
        Stepper,
        Slider, 
        StepLabel,
        RaisedButton, 
        FloatingActionButton,
        AppBar, 
        Drawer, 
        IconMenu, 
        MenuItem, 
        IconButton, 
        FlatButton, 
        Toggle
}from 'material-ui';
import { __esModule } from 'recompose/pure';
import '../style/App.css'


class CanvasPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = { slider:1, scale: 1, finished: false}; 
  }

  componentWillMount(nextProps, nextState) {
    var logoWtm = new Image();
    logoWtm.crossOrigin = 'anonymous';
    logoWtm.src = './img/logow.svg';
    this.setState({ logoWtm: logoWtm });

    var frame = new Image();
    frame.crossOrigin = 'anonymous';
    frame.src = "./img/frame.svg";
    this.setState({ frame: frame });
  }

  handleSlider = (event, value) => {
    this.setState({slider: value});
  };


  render() {
    var setEditorRef = (editor) => {
      this.editor = editor; 
    }
    var downloadImg = () =>{
      return;
    }

    var setCrop = () =>{
      this.props.dispatch(setCropping(this.editor.getCroppingRect()));
    }

    const Cropper = (props) => (
          
        <AvatarEditor
        {...props}
          ref={setEditorRef}
          image={this.props.imageUrl}
          onMouseUp={setCrop}
          width={600}
          onImageReady={setCrop}
          // crossOrigin={"Anonymous"}
          height={600}
          border={0}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={this.state.slider}
          rotate={0}
        />
    );

    var imgUpload = (e) => {
      var image = document.getElementById("inputImage").files[0];
      var url = window.URL || window.webkitURL;
      var src = url.createObjectURL(image);


      this.props.dispatch(setImageUrl(src));
      this.props.dispatch(setImage(true));
    }

    switch (this.props.stepIndex) {
      case 0:
        return (
          <FlatButton style={{margin:"16px"}} label="Upload Image" primary={true} icon={<UploadIcon />}>
            <input id="inputImage" onChange={imgUpload} type="file" accept="image/*,capture=camera"/>
           </FlatButton>
        );
      case 1:
        return (
          <div>
            <div>
              <p>Scale Image</p>
              <Slider
                style={{width: "30%", margin: "auto"}}
                min={1}
                max={10}
                step={0.1}
                value={this.state.slider}
                onChange={this.handleSlider}
                />
            </div>
            <Cropper></Cropper>
        </div>
        );
      case 2:
        return <Canvas></Canvas>
      case 3:
        return(
        <a href={this.props.canvasUrl} onClick={downloadImg} download="avatar.png" id="download">
          <FloatingActionButton >
            <ContentAdd />
          </FloatingActionButton>
        </a>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
}

CanvasPanel.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    image: state.data.image,
    imageUrl: state.data.imageUrl,
    wtm: state.data.wtm,
    bw: state.data.bw,
    blackText: state.data.blackText,
    canvasUrl: state.data.canvasUrl
  }
}

export default connect(mapStateToProps)(CanvasPanel);