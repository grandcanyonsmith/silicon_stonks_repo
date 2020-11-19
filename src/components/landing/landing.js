import React from 'react';
import './landing.css';
import './landing.scss';
import { isLoggedIn } from '../../auth';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import BackgroundVideo from '../background-video/BackgroundVideo';
import Stock from './stock';

function Landing() { 

    if (!isLoggedIn()) {
      return <Redirect to='/login'/>
    } else {
      return (
        <div>
        <BackgroundVideo className='nav-wrapper__video'/>
        <div className="landing">
          <div className="landing__titles">
            <div className="column"></div>
            <div className="column">
              <div className="title">SILICON STONKS</div>
            </div>
          </div>
          <ul className='landing__stock-list'>
          <Stock />
          </ul>
        </div>
        </div>
      )
    }
  }


export default withRouter(Landing);
