import React, { Component } from 'react';
import './landing.css';
import './landing.scss';
import NavWrapper from '../nav-wrapper/navWrapper.js';
import { isLoggedIn } from '../../auth';
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'white'
  }
}));

const STONKS = [
    {key: 1, name: "Pinterest", url: 'https://finance.yahoo.com/quote/PINS/'},
    {key: 2, name: "Docusign", url: 'https://finance.yahoo.com/quote/DOCU/'},
    {key: 3, name: "Hubspot", url: 'https://finance.yahoo.com/quote/HUBS/'},
    {key: 4, name: "Amazon", url: 'https://finance.yahoo.com/quote/AMZN/'},
    {key: 5, name: "Fiverr", url: 'https://finance.yahoo.com/quote/FVRR/'},
    {key: 6, name: "Qorvo", url: 'https://finance.yahoo.com/quote/QRVO/'}
]

function Landing() { 
  const classes = useStyles();

    if (!isLoggedIn()) {
      return <Redirect to='/login'/>
    } else {
      return (
        <NavWrapper>
        <div className="landing">
          <div className="landing__titles">
            <div className="column"></div>
            <div className="column">
              <div className="title">SILICON STONKS</div>
            </div>
          </div>
          <ul className='landing__stock-list'>
              {STONKS.map(stonk => {
                  return <a className={classes.link} href={stonk.url} target='_blank'><li>{stonk.name}</li></a>
              })}
          </ul>
        </div>
        </NavWrapper>
      )
    }
  }


export default withRouter(Landing);
