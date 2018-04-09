import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CanvasPanel from '../components/CanvasPanel';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { setImageUrl, setBW, setWTM, setTextColor } from '../redux/actions/index';
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
}from 'material-ui';
import { __esModule } from 'recompose/pure';
import '../style/App.css'

class SettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false}; 
  }
  render() {

    return (
      <div className="left-panel">
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
          containerStyle={{textAlign: 'center'}}>


          {/* <Toggle
            label="Image Fit"
            defaultToggled={this.state.squareCrop}
            labelPosition="right"
            onToggle={FitImage}
            style={{marginTop: 16}}
          /> */}
          
        </Drawer>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    image: state.data.image,
    imageUrl: state.data.imageUrl,
    wtm: state.data.wtm,
    bw: state.data.bw,
    blackText: state.data.blackText
  }
}

export default connect(mapStateToProps)(SettingsPanel);