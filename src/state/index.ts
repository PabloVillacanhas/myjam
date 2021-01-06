import { combineReducers } from 'redux'
import session from './reducers/session'
import configuration from './reducers/configuration'

const myJamApp = combineReducers({
  session,
  configuration,
})

export default myJamApp
