import React, { Component } from 'react';
import './nav-wrapper.css';
import BackgroundVideo from '../background-video/BackgroundVideo.js'
import Navbar from './navbar';

class NavWrapper extends Component {
    render() {
        const { className } = this.props;
        return (
            <div className={`nav-wrapper ${className ? className : ''}`}>
                <Navbar className='nav-wrapper__navbar'/>
                <BackgroundVideo className='nav-wrapper__video'/>
                {this.props.children}
            </div>
        )
    }
}

export default NavWrapper;