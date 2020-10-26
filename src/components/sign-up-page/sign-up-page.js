import React, { Component } from 'react';
import './sign-up-page.css';
import './sign-up-page.scss';

const STONKS = [
    "Pinterest", 
    "Fiverr",
    "AMD"
]

class Signuppage extends Component { 
  render() {
    return (
      <div className="sign-up-page">
        {/* <div className="sign-up-page-buttons"> */}
          <div className="login-info-column">
            <div className="login-items">
                <div className="sign-up-text">
                <h1>Create an account</h1>
            </div>
            <div className="sign-up-email sign-up-item"> Email </div>
            <form>
                 <input type="text"/>
            </form>
            <div className="sign-up-password sign-up-item"> Password </div>
            <form>
                <input type="text"/>
            </form>
            <div className="sign-up-password-confirmation sign-up-item"> Confirm Password </div>
            <form>
                <input type="text"/>
            </form>
            <div className="login-button sign-up-item"> Sign Up </div>
            <div className="create-account-option sign-up-item">
                <div>
                    <h1>Already have an account? Login here</h1>
                </div>
                <div>
                    <button>Here</button>
                </div>
            </div>
            

          </div>
          </div>
          {/* <div className="column"></div> */}
        {/* </div> */}
      </div>
    )
  }
}

export default Signuppage;
