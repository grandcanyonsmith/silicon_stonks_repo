import React, { Component } from 'react';
import './nav-wrapper.css';
import BackgroundVideo from '../background-video/BackgroundVideo.js'
import Navbar from './navbar';

function NavWrapper(props) {
        const { className } = props;
        return (
            <div className={`nav-wrapper ${className ? className : ''}`}>
                <Navbar className='nav-wrapper__navbar'/>
                {/* <BackgroundVideo className='nav-wrapper__video'/> */}
                {props.children}
            </div>
        )
    }

export default NavWrapper;