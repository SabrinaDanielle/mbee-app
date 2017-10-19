import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';

import registerServiceWorker from './registerServiceWorker';

var config = {
      apiKey: "AIzaSyA0VNHCzC7PfP-RQRQVXqijc7rirsZepIE",
      authDomain: "mbee-7711.firebaseapp.com",
      databaseURL: "https://mbee-7711.firebaseio.com",
      projectId: "mbee-7711",
      storageBucket: "mbee-7711.appspot.com",
      messagingSenderId: "429954204490"
    };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
