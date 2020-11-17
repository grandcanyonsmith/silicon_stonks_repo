import React from 'react';
import './landing.css';
import './landing.scss';
import { isLoggedIn } from '../../auth';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import BackgroundVideo from '../background-video/BackgroundVideo';
import Stock from './stock';

const STONKS = [
    {key: 1, name: "Pinterest", url: 'https://finance.yahoo.com/quote/PINS/', ticker: 'PINS', date: '20201102'},
    {key: 2, name: "Docusign", url: 'https://finance.yahoo.com/quote/DOCU/', ticker: 'DOCU', date: '20201102'},
    {key: 3, name: "Hubspot", url: 'https://finance.yahoo.com/quote/HUBS/', ticker: 'HUBS', date: '20201102'},
    {key: 4, name: "Amazon", url: 'https://finance.yahoo.com/quote/AMZN/', ticker: 'AMZN', date: '20201102'},
    {key: 5, name: "Fiverr", url: 'https://finance.yahoo.com/quote/FVRR/', ticker: 'FVRR', date: '20201102'},
    {key: 6, name: "Qorvo", url: 'https://finance.yahoo.com/quote/QRVO/', ticker: 'QRVO', date: '20201102'}
]

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
              {STONKS.map(stonk => {
                  return (
                    <div key={stonk.key}>
                      <Stock url={stonk.url} name={stonk.name} ticker={stonk.ticker} date={stonk.date}/>
                    </div>
                  )
              })}
          </ul>
        </div>
        </div>
      )
    }
  }


export default withRouter(Landing);
