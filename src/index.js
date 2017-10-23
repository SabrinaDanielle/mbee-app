import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import Routes from './routes'
import './styles/global-styles'
import registerServiceWorker from './utils/registerServiceWorker'
import * as firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyA0VNHCzC7PfP-RQRQVXqijc7rirsZepIE',
  authDomain: 'mbee-7711.firebaseapp.com',
  databaseURL: 'https://mbee-7711.firebaseio.com',
  projectId: 'mbee-7711',
  storageBucket: 'mbee-7711.appspot.com',
  messagingSenderId: '429954204490',
}
firebase.initializeApp(config)

render(
  <Provider store={configureStore()}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
