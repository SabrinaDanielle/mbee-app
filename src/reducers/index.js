import { combineReducers } from 'redux'
import counter from './counter'
import { firebaseStateReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  counter,
  firebase: firebaseStateReducer,
})

export default rootReducer
