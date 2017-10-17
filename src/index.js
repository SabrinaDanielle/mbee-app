import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';

import registerServiceWorker from './registerServiceWorker';

var config = {
    apiKey: "AIzaSyAMdF2h6goO0t5X0O50QpykVPNatpVwbyM",
    authDomain: "beatnicktech.firebaseapp.com",
    databaseURL: "https://beatnicktech.firebaseio.com",
    projectId: "beatnicktech",
    storageBucket: "beatnicktech.appspot.com",
    messagingSenderId: "432231058561"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
