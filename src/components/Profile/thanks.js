import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    header: {
        color: 'black'
    },
    container: {
        
    },
    profile: {
        backgroundColor: 'white',
        margin: ' 200px',
        padding: '100px'
    }
  }));

function Thanks(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.profile}>
                <h1 className={classes.header}>
                    Thank you for subscribing.
                </h1>
                <Link to='/profile'><button>Profile</button></Link>
            </div>
        </div>
    )
}

export default withRouter(Thanks);