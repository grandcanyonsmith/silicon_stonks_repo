import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './components/landing/landing';
import * as serviceWorker from './serviceWorker';
import './fonts/Computer-Regular.ttf'

import NavWrapper from './components/nav-wrapper/navWrapper.js';

ReactDOM.render(
  
  
  <Landing></Landing>
  // <Signuppage></Signuppage>
    // <LoginPage></LoginPage>
    // <FunctionClick/>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
