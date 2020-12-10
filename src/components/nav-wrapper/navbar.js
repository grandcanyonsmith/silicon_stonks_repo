import React from 'react';
import './navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import '../nav-wrapper/navbar.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  link: {
      textDecoration: "none"
  },
  container: {
    display: 'inline-block'
  }
}));

function NavBar(props) {
    const classes = useStyles();

    const authButton = () => {
        if(props.auth.id) {
            return (
              <div className={classes.container}>
                {/* {
                  props.auth.admin ? 
                  <Link className={classes.link} to='/create-competition'>
                    <Button className="button" variant="contained">New Competition</Button>
                  </Link> :
                  null
                }
                <Link className={classes.link} to='/competitions'>
                  <Button className="button" variant="contained">Competitions</Button> 
                </Link> */}
                <Button className="button" variant="contained" >Logout</Button> 
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
  
    return (
      <div className={classes.root}>
          <Button href='/' className="button" variant="contained">Home</Button>
          <Button href='/performance' className="button" variant="contained">Past Performance</Button>
        {/* <Link className={classes.link} to='/profile'>
          <Button className="button" variant="contained">Profile</Button>
        </Link> */}
        {authButton()}
      </div>
    );
  }

const mapStateToProps = (state) => {
return { auth: state.auth}
}

export default withRouter(connect(mapStateToProps)(NavBar));