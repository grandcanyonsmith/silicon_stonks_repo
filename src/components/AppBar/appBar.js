import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import DrawerContainer from './drawer';
import '../nav-wrapper/nav-wrapper.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    button: {
        backgroundColor: 'green'
    },
    appBar: {
        backgroundColor: 'black'
    }
  }));

function AppBarContainer(props){
    const classes = useStyles();

    const handleLogout = () => {
      localStorage.removeItem('token')
      window.location.replace('/login')
    }

    const authButton = () => {
        if(props.user) {
            return (
              <div className={classes.container}>
                <Button className="button" variant="contained" onClick={() => handleLogout()}>Logout</Button> 
              </div>
            )
        } else {
            return (
                <Link className={classes.link} to='/login'>
                    <Button className="button" variant="contained">Login</Button>
                </Link>
            )
        }
    }

    return(
        <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <DrawerContainer user={props.user}/>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            {authButton()}
          </Toolbar>
        </AppBar>
        {props.children}
      </div>
    )
}

const mapStateToProps = (state) => {
    return { user: state.user}
}

export default withRouter(connect(mapStateToProps)(AppBarContainer));