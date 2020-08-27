import React, { Component } from 'react';
import './landing.css';
import './landing.scss';
import NavWrapper from '../nav-wrapper/navWrapper.js';

const STONKS = [
    "Pinterest",
    "Quoavo",
    "Fiverr",
    "AMD"
]

class Landing extends Component { 
  render() {
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

export default Landing;
