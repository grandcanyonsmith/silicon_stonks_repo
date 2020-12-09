import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {isLoggedIn, logout} from '../../auth';
import DrawerContainer from './drawer';
import '../nav-wrapper/nav-wrapper.css';
import BackgroundVideo from '../background-video/BackgroundVideo';

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

    const authButton = () => {
        if(isLoggedIn()) {
            return (
              <div className={classes.container}>
                <Button className="button" variant="contained" onClick={() => logout()}>Logout</Button> 
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
            <DrawerContainer user={props.auth}/>
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
    return { auth: state.auth}
}

export default withRouter(connect(mapStateToProps)(AppBarContainer));