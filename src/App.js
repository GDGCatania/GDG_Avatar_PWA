import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style/App.css';
import SettingsPanel from './components/SettingsPanel'
import CanvasPanel from './components/CanvasPanel'
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AvatarEditor from 'react-avatar-editor';
import {Step, 
        Stepper, 
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
}from '../node_modules/material-ui';
import { __esModule } from 'recompose/pure';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stepIndex: 0, finished: false, wtm:true, colorSet:true, open: false, canvasUrl: "http://placehold.it/800x1200", imageUrl: "http://placehold.it/800x1200", image:null}; 
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

  
  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };


  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    const Logged = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton>menu</IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
      
    );

    const Cropper = (props) => (
      <div className="canvas-panel">
        <AvatarEditor
        {...props}
          ref={setEditorRef}
          image={this.state.imageUrl}
          onMouseUp={mouseUp}
          width={600}
          // crossOrigin={"Anonymous"}
          height={600}
          border={0}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1}
          rotate={0}
        />
      </div>
    );

  var getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Cropper></Cropper>;
      case 1:
        return <canvas id="imgCanvas"></canvas>;
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }


    var WtmToggled = (e, toggle) => {
      console.log("wtm", toggle);
      this.setState({ wtm: !this.state.wtm });
    }

    var BWToggled = (e, toggle) => {
      console.log("black and white", toggle);
      this.setState({ colorSet: !this.state.colorSet });
    }

    var BlackTextToggled = (e, toggle) => {
      console.log("back text", toggle);
      this.setState({ blackText: !this.state.blackText });
    }
  
    var downloadImg = () =>{
      console.log("download", this.state.canvasUrl);
    }
    
    var setEditorRef = (editor) => {
      this.editor = editor; 
    }
    
    var cropping;

 
    var imgUpload = (e) => {

      var image = document.getElementById("inputImage").files[0];
      this.setState({ image: image });
      // console.log("image", image);
      // var canvas = document.getElementById("imgCanvas");
      // this.setState({ canvas: canvas });
      // var ctx = canvas.getContext('2d');
      // this.setState({ ctx: ctx });
      var url = window.URL || window.webkitURL;
      var src = url.createObjectURL(image);
      var img = new Image();
      img.src = src;
      //this.setState({ canvasUrl: canvas.toDataURL() });
      this.setState({ imageUrl: src });
      this.setState({ img: img });
      // img.onload = function() {
      //   canvas.height = canvas.width;
      //   ctx.drawImage(img, 0,0,canvas.width,canvas.width);
      //   setCanvaState(ctx, canvas, img);
      //   mouseUp();
      // }
    }
  
    var setCanvaState = (ctx, canvas, img) =>{
      this.setState({ ctx: ctx });
      this.setState({ canvas: canvas });
      this.setState({ img: img });
      this.setState({ canvasUrl: canvas.toDataURL()});
    }

    var drawCanvas = () =>{
      console.log("draw")
      var img = this.state.img;
      if(img == null) return;
      
      //var cropper = document.getElementsByClassName("canvas-panel")[0].children[0];
      var canvas = document.getElementById("imgCanvas");
      var ctx = canvas.getContext("2d");
      this.setState({ canvas: canvas });
      this.setState({ ctx: ctx });
      var colorSet = this.state.colorSet;
      var wtm = this.state.wtm;
      var frame = this.state.frame;
      var cropping = this.cropping;
      console.log(cropping);
      if (true) {
        canvas.height = canvas.width;
        ctx.drawImage(img, -cropping.x*canvas.width,-cropping.y*canvas.height,canvas.width/cropping.width,canvas.height/cropping.height );
      }
      if (colorSet){ 
        canvas.setAttribute("style", "filter: grayscale(100%)");
        //cropper.setAttribute("style", "filter: grayscale(100%)");
      }else {
        canvas.setAttribute("style", "");
        //cropper.setAttribute("style", "");
      }
      if (wtm) {
        var logoWtm = this.state.logoWtm;
        console.log(logoWtm);
        var widthWMT = 400;
        var new_height2 = logoWtm.height / logoWtm.width * widthWMT;
        ctx.drawImage(logoWtm, 10, 10, widthWMT, new_height2);
      }
      console.log(frame.height);
      var new_height = frame.height / frame.width * canvas.width;
      ctx.drawImage(frame, 0, canvas.height - new_height, canvas.width, new_height);      
      //setCanvaState(ctx, canvas, img);
    }

    var mouseUp = () =>{
      console.log("muse up")
      this.cropping = this.editor.getCroppingRect();
      

    }

    return (     
      <div className="App">

        <AppBar
          title="GDG Avatar"
          iconElementLeft={<b/>}
          iconElementRight={<IconButton><MenuIcon/></IconButton>}
          onRightIconButtonTouchTap={(open) => this.setState({open})}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          openSecondary={true}
          onRequestChange={(open) => this.setState({open})}
          containerStyle={{textAlign: 'center'}}
          >

          <RaisedButton style={{margin: 16}} label="Upload Image" primary={true} icon={<UploadIcon />}>
            <input id="inputImage" onChange={imgUpload} type="file" accept="image/*,capture=camera"/>
          </RaisedButton>

          {/* <Toggle
            label="Image Fit"
            defaultToggled={this.state.squareCrop}
            labelPosition="right"
            onToggle={FitImage}
            style={{marginTop: 16}}
          /> */}
          <Toggle
            label="WTM"
            defaultToggled={this.state.wtm}
            onToggle={WtmToggled}
            labelPosition="right"
            style={{marginTop: 16}}
          />
          <Toggle
            label="Black & White"
            defaultToggled={this.state.colorSet}
            onToggle={BWToggled}
            labelPosition="right"
            style={{marginTop: 16}}
          />
          <Toggle
            label="Black Text"
            defaultToggled={this.state.blackText}
            onToggle={BlackTextToggled}
            labelPosition="right"
            style={{marginTop: 16}}
          />
        </Drawer>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Crop your image</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add some style</StepLabel>
          </Step>
          <Step>
            <StepLabel>Download it!</StepLabel>
          </Step>
        </Stepper>
        
        <a href={this.state.canvasUrl} onClick={downloadImg} download="avatar.png" id="download">
          <FloatingActionButton >
            <ContentAdd />
          </FloatingActionButton>
        </a>
        <a onClick={drawCanvas} download="avatar.png" id="download">
          <FloatingActionButton >
            <ContentAdd />
          </FloatingActionButton>
        </a>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              {getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                  />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                  />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
};

App.defaultProps = {
};

export default App;
