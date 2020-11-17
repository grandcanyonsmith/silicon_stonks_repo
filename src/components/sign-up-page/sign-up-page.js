import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './sign-up-page.css';
import './sign-up-page.scss';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {createUser} from '../../actions/users';

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

function Signuppage(props) { 
  const [user, setUser] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const classes = useStyles();

  const handleChange = name => event => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleSave = e => {
    const {dispatch} = props;
    dispatch(createUser(user))
    e.preventDefault()
  }

  return (
    <div className="sign-up-page">
      {/* <div className="sign-up-page-buttons"> */}
        <div className="login-info-column">
          <div className="login-items">
              <div className="sign-up-text">
              <h1>Create an account</h1>
          </div>
          <TextField 
            className={classes.field} 
            id="standard-required" 
            label="First Name" 
            required
            defaultValue="" 
            onChange={handleChange('first')}
          />
          <TextField 
            className={classes.field} 
            id="standard-required" 
            label="Last Name" 
            required
            defaultValue="" 
            onChange={handleChange('last')}
          />
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
            label="Phone" 
            required
            defaultValue="" 
            onChange={handleChange('phone')}
          />
          <TextField 
            className={classes.field} 
            id="standard-required" 
            label="Password" 
            type="password"
            defaultValue=""
            onChange={handleChange('password')}
          />
          <TextField 
            className={classes.field} 
            id="standard-required" 
            label="Confirm Password" 
            type="password"
            defaultValue="" 
            onChange={handleChange('password2')}
          />
          {
            user.password === user.password2 ?
            <div className="login-button sign-up-item" onClick={handleSave}> Sign Up </div> :
            <div className="login-button sign-up-item"> Passwords Must Match </div>
          }
          <div className="create-account-option sign-up-item">
              <div>
                  <h1>Already have an account? Login <Link to='/login'>here</Link></h1>
              </div>
          </div>
          

        </div>
        </div>
        {/* <div className="column"></div> */}
      {/* </div> */}
    </div>
  )
}

export default withRouter(connect()(Signuppage));
