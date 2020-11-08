import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';

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

    // useEffect(() => {
    //     function onLoad() {
    //         const sessionId = qs.parse(props.location.search, { ignoreQueryPrefix: true }).sessionId
    //         const token = localStorage.getItem('token')

    //         if(sessionId) {
    //             axios.post('/api/stripe/save-stripe-customer', {sessionId}, {headers: { 'Authorization': token}})
    //             .then(res => {
    //                 console.log(res.data)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //         } else {
    //             return
    //         }
    //     }
    //     onLoad()
    //   }, [])

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