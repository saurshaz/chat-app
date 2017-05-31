import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './state-management/store/configureStore';
import { App, Nav } from './views/containers';
import { Login, NotFound } from './views/components';
import './style.css';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const styles = {
  root: {
    display: 'flex',
    top: '2px',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
};

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Paper>
          <Nav />
          <Route
            component={App}
            path="/chat"
          />
          <Route
            component={Login}
            path="/login"
          />
        </Paper>
      </MuiThemeProvider>
    </Router>
  </Provider>
), document.getElementById('root'));
