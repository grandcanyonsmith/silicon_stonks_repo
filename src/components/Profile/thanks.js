import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    header: {
        color: 'white'
    },
    container: {
        textAlign: 'center'
    },
    profile: {
        margin: '150px auto'
    },
    button: {
        backgroundColor: '#3CEC97',
        marginTop: '60px'
    },
    link: {
        textDecoration: 'none'
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
                <Link className={classes.link} to='/profile'>
                    <Button className={classes.button}>Profile</Button>
                </Link>
            </div>
        </div>
    )
}

export default withRouter(Thanks);