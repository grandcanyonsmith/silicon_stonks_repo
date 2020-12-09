import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./landing/landing";
import LoginPage from "./login-page/login-page";
import Signuppage from "./sign-up-page/sign-up-page";
import Flash from './Flash/flash';
import Profile from './Profile/profile'
import Thanks from "./Profile/thanks";
import NavWrapper from './nav-wrapper/navWrapper';
import ForgotPassword from "./ForgotPassword/forgotPassword";
import ChangePassword from "./ForgotPassword/changePassword";
import NewCompetition from "./Competition/newCompetition";
import axios from 'axios';
import JoinCompetition from "./Competition/joinCompetition";
import Overall from "./PastPerformance/overall";
import Performance from "./PastPerformance/perfomance";
import AppBar from "./AppBar/appBar";
import AllStocks from "./AdminStocks/allStocks";
import SingleStock from "./AdminStocks/singleStock";

function App() {

  return (
    <div id='appMain'>
    <AppBar>
    <Flash/>
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={Signuppage} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/thank-you' component={Thanks} />
        <Route exact path='/forgotpassword' component={ForgotPassword} />
        <Route exact path='/forgotpassword/:token' component={ChangePassword} />
        <Route exact path='/create-competition' component={NewCompetition} />
        <Route exact path='/competitions' component={JoinCompetition} />
        <Route exact path='/performance' component={Overall} />
        <Route exact path='/performance/:month/:year' component={Performance} />
        <Route exact path='/all-stocks' component={AllStocks} />
        <Route exact path='/all-stocks/:id' component={SingleStock} />
    </Switch>
    </AppBar>
    </div>
  );
}

export default App;