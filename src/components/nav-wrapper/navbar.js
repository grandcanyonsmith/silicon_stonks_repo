import React, { Component } from 'react';
import './navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {isLoggedIn, logout} from '../../auth';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
    link: {
        textDecoration: "none"
    }
}));

function NavBar(props) {
    const classes = useStyles();
    const auth = props;

    const authButton = () => {
        if(isLoggedIn()) {
            return (
                <Button variant="contained" onClick={() => logout()}>Logout</Button>
            )
        } else {
            return (
                <Link className={classes.link} to='/login'>
                    <Button variant="contained">Login</Button>
                </Link>
            )
        }
    }
  
    return (
      <div className={classes.root}>
        <Link className={classes.link} to='/'>
          <Button variant="contained">Home</Button>
        </Link>
        {/* <Link className={classes.link} to='/profile'>
          <Button variant="contained">Profile</Button>
        </Link> */}
        {authButton()}
      </div>
    );
  }

const mapStateToProps = (state) => {
return { auth: state.auth}
}

export default withRouter(connect(mapStateToProps)(NavBar));