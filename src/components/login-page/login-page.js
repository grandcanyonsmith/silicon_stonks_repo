import React, { Component } from 'react';
import './login-page.css';
import './login-page.scss';

const STONKS = [
    "Pinterest", 
    "Fiverr",
    "AMD"
]

class LoginPage extends Component { 
    constructor(props){
        super(props)
        this.state = {
            email: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        console.log(data)
    }

    handleInputChange = (event) => {
        event.preventDefault()
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }


  render() {
      const {email} = this.state
    return (
      <div className="login-page">
        {/* <div className="sign-up-page-buttons"> */}
          <div className="login-info-column">
          <div className="login-items">
            <div className="sign-up-text">
                <h1>Sign In</h1>
            </div>
            <div className="sign-up-email"> Email </div>
            <form onSubmit={this.handleSubmit} name='email' onChange={this.handleInputChange}>
                 <input type="text" placeholder="Email"/>
            </form>
            <div className="sign-up-password"> Password </div>
            <form onSubmit={this.handleSubmit} name='password' onChange={this.handleInputChange}>
                <input type="text" placeholder="Password"/>
            </form>
            <div className="login-button"> Login </div>
            <div className="create-account-option">
                <div>
                    <h1>Don't have an account? Create an account here</h1>
                </div>
                <div>
                    <button onClick={this.clickHandler}>Here</button></div>
            </div>
            

          </div>
          </div>
          {/* <div className="column"></div> */}
        {/* </div> */}
      </div>
    )
  }
}

export default LoginPage;
