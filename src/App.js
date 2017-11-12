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
import {RaisedButton, FloatingActionButton ,AppBar, Drawer, IconMenu, MenuItem, IconButton, FlatButton, Toggle} from '../node_modules/material-ui';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wtm:true, colorSet:true, open: false, canvasUrl: "http://placehold.it/800x1200", imageUrl: "http://placehold.it/800x1200", image:null}; 
  }

  componentWillMount(nextProps, nextState) {

  }


  render() {


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


    var WtmToggled = (e, toggle) => {
      console.log("wtm", toggle);
      this.state.wtm=!this.state.wtm;
    }

    var BWToggled = (e, toggle) => {
      console.log("black and white", toggle);
      this.state.colorSet=!this.state.colorSet;
    }

    var BlackTextToggled = (e, toggle) => {
      console.log("back text", toggle);
      this.state.blackText=!this.state.blackText;
    }
  
    var downloadImg = () =>{
      console.log("download", this.state.canvasUrl);
    }
    
    var setEditorRef = (editor) => {
      this.editor = editor; 
    }
    
    var ImageUrl = (e, toggle) => {
      console.log("back text", toggle);
    }
 
    var imgUpload = (e) => {
      var logoWtm = new Image();
      logoWtm.width = 600;
      logoWtm.height = 600;
      logoWtm.crossOrigin = 'anonymous';
      logoWtm.src = './src/img/logow.svg'
      this.state.logoWtm = logoWtm;

  
      var logo = new Image();
      logo.crossOrigin = 'anonymous';
      logo.src = "./img/frame.svg";
      logo.onload = function() {
        this.state.logo = logo;
        console.log("setlogo");
      };



      var image = document.getElementById("inputImage").files[0];
      this.state.image = image;
      console.log("image", image);
      var canvas = document.getElementById("imgCanvas");
      this.state.canvas =canvas;
      var ctx = canvas.getContext('2d');
      this.state.ctx = ctx;
      var url = window.URL || window.webkitURL;
      var src = url.createObjectURL(image);
      var img = new Image();
      img.src = src;
      this.setState({ canvasUrl: canvas.toDataURL() });
      this.setState({ imageUrl: src });
      img.onload = function() {
        canvas.height = canvas.width;
        ctx.drawImage(img, 0,0,canvas.width,canvas.width);
        setCanvaState(ctx, canvas, img, true);
        //mouseUp();
      }
    }
  
    var setCanvaState = (ctx, canvas, img, first) =>{
      this.state.ctx = ctx;
      this.state.canvas = canvas;
      this.state.img = img;
      this.state.canvasUrl = this.state.canvas.toDataURL();
    }

    var mouseUp = () =>{
      var img = this.state.img;
      if(img == null) return;
      
      var cropper = document.getElementsByClassName("canvas-panel")[0].children[0];
      var canvas = document.getElementById("imgCanvas");
      var ctx = canvas.getContext("2d")
      this.state.canvas  =canvas;
      this.state.ctx = ctx;
      var colorSet = this.state.colorSet;
      var wtm = this.state.wtm;
      var cropping = this.editor.getCroppingRect();
      console.log(cropping);
      if (true) {
        canvas.height = canvas.width;
        ctx.drawImage(img, -cropping.x*canvas.width,-cropping.y*canvas.height,canvas.width/cropping.width,canvas.height/cropping.height );
      }
      if (colorSet){ 
        canvas.setAttribute("style", "filter: grayscale(100%)");
        cropper.setAttribute("style", "filter: grayscale(100%)");
      }else {
        canvas.setAttribute("style", "");
        cropper.setAttribute("style", "");
      }
      if (wtm) {
        var logoWtm = this.state.logoWtm;
        console.log(logoWtm);
        var widthWMT = 400;
        var new_height2 = logoWtm.height / logoWtm.width * widthWMT;
        ctx.drawImage(logoWtm, 10, 10, widthWMT, new_height2);
      }
      setCanvaState(ctx, canvas, img, false);
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
        <canvas id="imgCanvas"></canvas>
        <div className="canvas-panel">
            <AvatarEditor
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
        <a href={this.state.canvasUrl} onClick={downloadImg} download="avatar.png" id="download">
          <FloatingActionButton >
            <ContentAdd />
          </FloatingActionButton>
        </a>
      </div>
    );
  }
}

App.propTypes = {
};

App.defaultProps = {
};

export default App;
