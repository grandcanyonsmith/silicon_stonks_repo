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
          <div className="percent-change-title">
            <div className="percent-change-column-1"></div>
            <div className="percent-change-column-2">% change since<br></br>
            Nov. 1st recommendation</div>
          </div>
          <Stock />
          </ul>
        </div>
        </div>
      )
    }
  }


export default withRouter(Landing);
