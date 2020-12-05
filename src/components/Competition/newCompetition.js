import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: '100px auto',
        padding: "50px",
        width: '90%',
        height: '325px',
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

function NewCompetition(props) {
    const classes = useStyles();
    const [done, setDone] = useState(false);
    const [competition, setCompetition] = useState({
        entryFee: 0,
        startDate: new Date,
        endDate: new Date,
        prize: 0
    });

    const handleChange = name => event => {
        setCompetition({...competition, [name]: event.target.value });
      };

    const handleDateChange = name => date => {
        setCompetition({...competition, [name]: date})
    }

    const handleSave = e => {
        const token = localStorage.getItem('token')
        axios.post(`/api/competition/create`, {competition}, {headers: {'Authorization': token}})
        .then(res => {
            setDone(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    if(done) {
        return(
            <div className={classes.container}>
                <h1>Competition has been created.</h1>
            </div>
        )
    } else {
        return(
            <div className={classes.root}>
                <form noValidate autoComplete="off">
                    <div className={classes.field}>
                        <TextField fullWidth id="standard-basic" label="Enter competition entry fee" type='text' onChange={handleChange("entryFee")}/>
                        <TextField fullWidth id="standard-basic" label="Enter competition prize" type='text' onChange={handleChange("prize")}/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Competition start date"
                            value={competition.startDate}
                            onChange={handleDateChange('startDate')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            <KeyboardDatePicker
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Competition end date"
                            value={competition.endDate}
                            onChange={handleDateChange('endDate')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </Grid>
                        </MuiPickersUtilsProvider>
                        <Button onClick={handleSave} className={classes.button}>Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewCompetition;