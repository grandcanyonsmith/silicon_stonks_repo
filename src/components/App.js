import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./landing/landing";
import LoginPage from "./login-page/login-page";
import Signuppage from "./sign-up-page/sign-up-page";
import Flash from './Flash/flash';

function App() {

  return (
    <div id='appMain'>
    <Flash/>
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={Signuppage} />
    </Switch>
    </div>
  );
}

export default App;