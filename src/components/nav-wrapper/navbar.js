import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {
    render() {
        const { className } = this.props;
        return (
            <div className={`navbar ${className ? className : ''}`}>
                
                <ul className='navbar__items'>
                    <li>info</li>
                    <li>logout</li>
                </ul>
            </div>
        )
    }
}

export default Navbar;