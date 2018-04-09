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
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { setImage } from '../src/redux/actions/index';
import {Step, 
        Slider,
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
  constructor(props){
    super(props);
    this.state = {stepIndex: 0, finished: false}; 
  }
  
  handleNext = () => {
    const {stepIndex} = this.state;
    if(stepIndex == 0 && this.props.image==false)return alert("Please upload an image");
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
      
    var downloadImg = () =>{
      console.log("download", this.state.canvasUrl);
    }

    return (     
      <Provider store={this.props.store}>
      <div className="App" style={{textAlign:"center",}}>
        
        <img style={{height:"15em", margin:"-50px"}} src="./img/logo.svg"/>

        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Upload an image</StepLabel>
          </Step>
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
        

        <div style={contentStyle}>
          {finished ? (
            <p>
              <a href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}>
                Click here
              </a>to create another avatar.
            </p>
          ) : (
            <div style={{textAlign: "center", marginBottom: "16px"}}>
              <CanvasPanel scale={this.state.slider} stepIndex={stepIndex} image={this.props.image}></CanvasPanel>
              <div style={{marginTop: 12}}>
                <RaisedButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                  />
                <RaisedButton
                  label={stepIndex === 3 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                  />
              </div>
            </div>
          )}
        </div>
      </div>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

App.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    image: state.data.image
  }
}

export default connect(mapStateToProps)(App);
