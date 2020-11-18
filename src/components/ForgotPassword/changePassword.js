import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: '300px auto',
        padding: "50px",
        width: '90%',
        height: '225px',
        backgroundColor: 'white',
        textAlign: 'center'
      }
    },
    field: {
        width: '350px',
        margin: 'auto'
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

function ChangePassword(props) {
    const classes = useStyles();
    const [done, setDone] = useState(false);
    const [password, setPassword] = useState({
        password1: '',
        password2: ''
    });

    const handleChange = name => event => {
        setPassword({...password, [name]: event.target.value });
      };

    const handleSave = e => {
        const token = props.match.params.token;
        const bearer = "Bearer " + token;
        console.log(token)
        axios.post(`/api/users/changepassword`, {password}, {headers: {'Authorization': bearer}})
        .then(res => {
            window.location.replace("/login")
        })
        .catch(err => {
            console.log(err)
        })
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
                        <TextField fullWidth id="standard-basic" label="Enter New Password" type='password' onChange={handleChange("password1")}/>
                        <TextField fullWidth id="standard-basic" label="Confirm Password" type='password' onChange={handleChange("password2")}/>
                        {password.password1 === password.password2 ? 
                            <Button onClick={handleSave} className={classes.button}>Submit</Button> :
                            <Button disabled className={classes.button}>Submit</Button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default ChangePassword;