import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './App';
import {register} from './serviceWorker';
import ConfigureStore from './redux/configureStore';
import './style/index.css';
import './style/App.css';
import { ThemeProvider } from "@material-ui/core/styles";
import {theme} from "./style/theme";

const store = ConfigureStore();

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App store={store} />
    </ThemeProvider>, document.getElementById('root')
);
register(store)
