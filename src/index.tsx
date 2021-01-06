import * as React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import myJamApp from './state'
import App from './components/App'
import createSagaMiddleware from 'redux-saga'
import wsMiddleware from './state/sagas/socketMiddleware'
import rootSaga from './state/sagas/session'

const rootEl = document.getElementById('root')

const sagaMiddleware = createSagaMiddleware()
const store = createStore(myJamApp, applyMiddleware(wsMiddleware, sagaMiddleware))
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl,
)
