import axios from 'axios';
import moment from 'moment';

export const createUser = user => {
    return (dispatch) => {
      axios.post('/api/users/register', user)
        .then(res => {
            const expires = moment().add(res.data.expiresIn, 'days')
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
            dispatch({type: 'SETFLASH', flash: {msg: "User Created", severity: "success"}})
            window.location.replace("/")
        })
        .catch(err => {
          if(err.response.status === 500) {
            dispatch({type: 'SETFLASH', flash: {msg: "Email already exists. Please try logging in.", severity: 'error'}})
            window.location.replace("/login")
          } else {
            dispatch({type: 'SETFLASH', flash: {msg: "Oops something went wrong. Please try again.", severity: 'error'}})
          }
        })
    }
  };

  export const signIn = user => {
    return (dispatch) => {
      axios.post('/api/users/login', user)
        .then(res => {
          console.log(res.data)
            const expires = moment().add(res.data.expiresIn, 'days')
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
            dispatch({type: 'LOGIN', user: res.data.user})
            dispatch({type: 'SETFLASH', flash: {msg: "Successfully Logged In", severity: 'success'}})
            window.location.replace("/")
        })
        .catch(err => {
          if(err.response.status === 401) {
            dispatch({type: 'SETFLASH', flash: {msg: "Incorrect Password", severity: 'error'}})
          } else {
            dispatch({type: 'SETFLASH', flash: {msg: "Oops something went wrong. Please try again.", severity: 'error'}})
          }

        })
    }
  };