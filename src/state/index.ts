import { combineReducers } from 'redux'
import session from './reducers/session'

const myJamApp = combineReducers({
  session,
})

export default myJamApp
