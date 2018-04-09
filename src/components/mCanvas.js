import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import {setBW, setWTM, setTextColor, setCanvasUrl } from '../redux/actions/index';
import AvatarEditor from 'react-avatar-editor';
import {Step, 
        Stepper, 
        StepLabel,
        TextField,
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
import { relative } from 'path';


class Canvas extends React.Component {
  constructor(props){
    super(props);
    this.state = {timeout: null, name:"GDG",finished: false}; 
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

  componentDidMount(){
    this.drawCanvas();
  }

  drawCanvas(){
    console.log("draw",document.getElementById("imgCanvas"));
    var canvas = document.getElementById("imgCanvas");
    var ctx = canvas.getContext("2d");
    this.setState({ canvas: canvas });
    this.setState({ ctx: ctx });
    var name = this.state.name;
    var blackText = this.props.blackText;
    var bw = this.props.bw;
    var wtm = this.props.wtm;
    var frame = this.state.frame;
    var cropping = this.props.cropping;

    var img = new Image();
    img.src = this.props.imageUrl;

    if (true) {
      canvas.height = canvas.width;
      ctx.drawImage(
        img,
        -cropping.x*(canvas.width/cropping.width),
        -cropping.y*(canvas.height/cropping.height),
        canvas.width/cropping.width,
        canvas.height/cropping.height
      );
    }
    if (bw){ 
      canvas.setAttribute("style", "filter: grayscale(100%)");
    }else {
      canvas.setAttribute("style", "");
    }

    if (blackText) ctx.fillStyle = 'black';
    else ctx.fillStyle = 'white';
    ctx.font = "500 50px product sans";
    var textWidth = ctx.measureText(name).width;
    ctx.fillText(name, canvas.height - textWidth - 10, 50);

    if (wtm) {
      var logoWtm = this.state.logoWtm;
      var widthWMT = 400;
      var new_height2 = logoWtm.height / logoWtm.width * widthWMT;
      ctx.drawImage(logoWtm, 10, 10, widthWMT, new_height2);
    }
    var new_height = frame.height / frame.width * canvas.width;
    ctx.drawImage(frame, 0, canvas.height - new_height, canvas.width, new_height);    
    this.props.dispatch(setCanvasUrl(canvas.toDataURL()));
  }

  render() {
    var cropping = this.props.cropping;

    var setEditorRef = (editor) => {
      this.editor = editor; 
    }

    var WtmToggled = (e, toggle) => {
      this.props.dispatch(setWTM(toggle));
      this.drawCanvas();
    }

    var BWToggled = (e, toggle) => {
      this.props.dispatch(setBW(toggle));
      this.drawCanvas();
    }

    var BlackTextToggled = (e, toggle) => {
      this.props.dispatch(setTextColor(toggle));
      this.drawCanvas();
    }

    const setName = (event, newValue) => {
      clearTimeout(this.state.timeout);
      this.setState({name: "GDG " + newValue});

      this.setState({timeout: setTimeout(() => this.drawCanvas(), 500)});
    };

    return( 
    <div>  

      <Toggle
        label="WTM"
        toggled={this.props.wtm}
        onToggle={WtmToggled}
        labelPosition="right"
        style={{marginTop: 16, width: "30%"}}
      />
      <Toggle
        label="Black & White"
        toggled={this.props.bw}
        onToggle={BWToggled}
        labelPosition="right"
        style={{marginTop: 16, width: "30%"}}
      />
      <Toggle
        label="Black Text"
        toggled={this.props.blackText}
        onToggle={BlackTextToggled}
        labelPosition="right"
        style={{marginTop: 16, width: "30%"}}
      />

      <TextField onChange={setName} inputStyle={{marginTop: 16, width: "30%"}} hint={"GDG name"}></TextField>

      <canvas id="imgCanvas"></canvas>
    </div>
    );
  }
}

Canvas.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    image: state.data.image,
    imageUrl: state.data.imageUrl,
    wtm: state.data.wtm,
    bw: state.data.bw,
    blackText: state.data.blackText,
    cropping: state.data.cropping
  }
}

export default connect(mapStateToProps)(Canvas);