import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import {setBW, setWTM, setTextColor, setCanvasUrl } from '../redux/actions/index';
import {Step, 
        TextField,
        Checkbox 
}from 'material-ui';
import { __esModule } from 'recompose/pure';
import { relative } from 'path';
import '../style/App.css'


class Canvas extends React.Component {
  constructor(props){
    super(props);
    this.state = {timeout: null, name:"",finished: false}; 
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

  componentDidUpdate(){
    this.drawCanvas();
  }

  drawCanvas(){
    console.log("draw", canvas, ctx, this.props.imageUrl);
    var canvas = document.getElementById("imgCanvas");
    var ctx = canvas.getContext("2d");
    var name = this.state.name;
    var blackText = this.props.blackText;
    var bw = this.props.bw;
    var wtm = this.props.wtm;
    var frame = this.state.frame;
    var cropping = this.props.cropping;
    var logoWtm = this.state.logoWtm;

    var img = new Image();
    img.addEventListener('load', () => {
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
      ctx.font = "500 25px product sans";
      var textWidth = ctx.measureText(name).width;
      ctx.fillText(name, canvas.height - textWidth - 10, 30);
  
      if (wtm) {
        var widthWMT = 400;
        var new_height2 = logoWtm.height / logoWtm.width * widthWMT;
        ctx.drawImage(logoWtm, 10, 10, widthWMT, new_height2);
      }
      var new_height = frame.height / frame.width * canvas.width;
      ctx.drawImage(frame, 0, canvas.height - new_height, canvas.width, new_height);    
      this.props.dispatch(setCanvasUrl(canvas.toDataURL()));
    }, false);
    img.src = this.props.imageUrl;
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
      this.setState({name: newValue});

      this.setState({timeout: setTimeout(() => this.drawCanvas(), 500)});
    };

    const inputStyle = {
			height: "36px",
			width: "100%",
			borderColor: "lightgray",
			borderStyle: "solid",
      borderRadius: "5px",
			borderWidth: "1px",
		};

    return( 
    <div>  
      <BrowserView device={isBrowser}>
      <div className="stylePanel desktop">
        <Checkbox 
          label="WTM"
          checked={this.props.wtm}
          onCheck={WtmToggled}
          labelPosition="right"
          style={{marginTop: 16, width: "15%"}}
        />
        <Checkbox 
          label="Black & White"
          checked={this.props.bw}
          onCheck={BWToggled}
          labelPosition="right"
          style={{marginTop: 16, width: "15%"}}
        />
        <Checkbox 
          label="Black Text"
          checked={this.props.blackText}
          onCheck={BlackTextToggled}
          labelPosition="right"
          style={{marginTop: 16, width: "15%"}}
        />
        <TextField onChange={setName} style={{display:"block"}} hintStyle={{bottom:16, paddingLeft:8}} underlineStyle={{display: "none"}} inputStyle={inputStyle} hintText={"GDG name"}></TextField>
      </div>
      </BrowserView>
      <MobileView device={isMobile}>
      <div className="stylePanel mobile">
        <Checkbox 
          label="WTM"
          checked={this.props.wtm}
          onCheck={WtmToggled}
          labelPosition="right"
          style={{marginTop: 16, width: "100%"}}
        />
        <Checkbox 
          label="Black & White"
          checked={this.props.bw}
          onCheck={BWToggled}
          labelPosition="right"
          style={{marginTop: 16, width: "100%"}}
        />
        <Checkbox 
          label="Black Text"
          checked={this.props.blackText}
          onCheck={BlackTextToggled}
          labelPosition="right"
          style={{marginTop: 16, width: "100%"}}
        />
        <TextField onChange={setName} style={{display:"block"}} hintStyle={{bottom:16, paddingLeft:8}} underlineStyle={{display: "none"}} inputStyle={inputStyle} hintText={"GDG name"}></TextField>
      </div>
      </MobileView>
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