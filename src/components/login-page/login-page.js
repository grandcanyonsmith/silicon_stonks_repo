import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './login-page.css';
import './login-page.scss';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {signIn} from '../../actions/users';
import FlashMessage from 'react-flash-message';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  field: {
    backgroundColor: 'white',
    margin: '10px'
  },
  form: {
    backgroundColor: 'white'
  }
}));

const STONKS = [
    "Pinterest", 
    "Fiverr",
    "AMD"
]

function LoginPage(props) { 
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const classes = useStyles();

  const handleChange = name => event => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleSave = e => {
    const {dispatch} = props;
    dispatch(signIn(user))
    e.preventDefault()
  }

  return (
    <div className="login-page">
      <div className="information">
        <div className="about-us">
          <h1>Welcome to Silicon Stonks.</h1>
        </div>
        <div className="instructions">
        <h2>Step 1. Create an account.</h2>
        <h2>Step 2. Get the best tech-stock notifications</h2>
        <h2>on the first of every month.</h2>
        </div>
        
      {/* <div className="sign-up-page-buttons"> */}
        <div className="login-info-column">
        <div className="login-items">
          <div className="sign-up-text">
              <h1>Sign In</h1>
          </div>
          <TextField 
            className={classes.field} 
            id="standard-required" 
            label="Email" 
            required
            defaultValue="" 
            onChange={handleChange('email')}
          />
          <TextField 
            className={classes.field} 
            id="standard-required" 
            label="Password" 
            type='password'
            required
            defaultValue="" 
            onChange={handleChange('password')}
          />

          <div className="login-button" onClick={handleSave}> Login </div>
          <div className="create-account-option">
              <div>
                  <h2>Don't have an account? Create an account <Link to='/register'>here</Link></h2>
              </div>
          </div>
          

        </div>
        </div>
        </div>
    </div>
  )
}

export default withRouter(connect()(LoginPage));
