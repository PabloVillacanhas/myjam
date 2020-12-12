import * as React from 'react';
import Login from './Login/Login';
import { Container } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import { Alert } from '@material-ui/lab';
import theme from '../themes/theme';
import styles from './app.module.scss'; 

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Alert severity="error">This is an error alert — check it out!</Alert>
          <Login />
        </Container>
      </ThemeProvider>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
 