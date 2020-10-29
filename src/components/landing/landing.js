import React, { Component } from 'react';
import './landing.css';
import './landing.scss';
import NavWrapper from '../nav-wrapper/navWrapper.js';
import { isLoggedIn } from '../../auth';
import {Redirect} from 'react-router-dom';

const STONKS = [
    "Pinterest @ $40, Jan. '22",
    "Fiverr @ $130, Feb. '22",
    "Google @ $2,000, Jun. '21",
    "Qorvo @ $140, Feb. '21",
    "AMD @ $100, Jun. '21",
    "Vivnt @ $19.00, Jan. '22"
]

class Landing extends Component { 
  render() {
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
            <div className="column"></div>
          </div>
          <ul className='landing__stock-list'>
              {STONKS.map(stonk => {
                  return <li>{stonk}</li>
              })}
          </ul>
        </div>
        </NavWrapper>
      )
    }
  }
}

export default Landing;
