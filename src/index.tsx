import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import myJamApp from './state'
import App from './components/App'

const rootEl = document.getElementById('root')

const store = createStore(myJamApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl,
)
