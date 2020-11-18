import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: '300px auto',
        width: '90%',
        height: '150px',
        backgroundColor: 'white',
        textAlign: 'center'
      }
    },
    field: {
        width: '350px',
        margin: 'auto',
        padding: '10px'
    },
    button: {
        margin: '25px',
        backgroundColor: 'green'
    },
    container: {
        textAlign: 'center',
        margin: '200px auto'
    }
  }));

function ForgotPassword(props) {
    const classes = useStyles();
    const [done, setDone] = useState(false)
    const [email, setEmail] = useState({
        email: ''
    })


    const handleChange = name => event => {
        setEmail({[name]: event.target.value });
      };

    const handleSave = e => {
        const {dispatch} = props;
        axios.post('/api/users/forgotpassword', email)
        .then(res => {
            setDone(true)
        })
        .catch(err => {
            dispatch({type: 'SETFLASH', flash: {msg: "That email does not exit. Register for a new account.", severity: 'error'}})
        })
        e.preventDefault()
    }

    if(done) {
        return(
            <div className={classes.container}>
                <h1>Please check your email to reset your password.</h1>
            </div>
        )
    } else {
        return(
            <div className={classes.root}>
                <form noValidate autoComplete="off">
                    <div className={classes.field}>
                        <TextField fullWidth id="standard-basic" label="Enter email" onChange={handleChange("email")}/>
                        <Button onClick={handleSave} className={classes.button}>Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(ForgotPassword);