import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./landing/landing";
import LoginPage from "./login-page/login-page";
import Signuppage from "./sign-up-page/sign-up-page";
import Flash from './Flash/flash';
import Profile from './Profile/profile'
import ProtectedRoute from './ProtectedRoute';
import Thanks from "./Profile/thanks";
import NavWrapper from './nav-wrapper/navWrapper';

function App() {

  return (
    <div id='appMain'>
    <NavWrapper>
    <Flash/>
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={Signuppage} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/thank-you' component={Thanks} />
    </Switch>
    </NavWrapper>
    </div>
  );
}

export default App;