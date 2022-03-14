import * as React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { hot } from 'react-hot-loader'
import theme from '../themes/theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CreateSession } from './Login/CreateSession'
import { JoinSession } from './Login/JoinSession'
import SessionPage from './Session/Session'
import { CssBaseline } from '@material-ui/core'
import Welcome from './Welcome/Welcome'

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/join" component={JoinSession} />
            <Route path="/create" component={CreateSession} />
            <Route path="/session/:id" component={SessionPage} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

declare let module: Record<string, unknown>

export default hot(module)(App)
