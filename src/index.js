import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import configureStore from '../src/redux/store/configureStore';
import './style/index.css';
import './style/App.css';

const store = configureStore();

ReactDOM.render(
    <MuiThemeProvider>
      <App store={store} />
    </MuiThemeProvider>, document.getElementById('root')
);
registerServiceWorker(store);
