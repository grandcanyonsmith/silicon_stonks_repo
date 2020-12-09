import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: '150px auto',
          width: '90%',
          height: 'auto',
          padding: '100px'
        },
    },
    loader: {
        margin: '10vw'
    },
    container: {
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'grey',
        width: '70vw',
        fontSize: '20px',
        margin: '15px auto'
    },
    link: {
        textDecoration: 'none'
    },
    newButton: {
        backgroundColor: 'green',
        color: 'white'
    },
    saveButton: {
        backgroundColor: 'green',
        margin: '15px'
    },
    cancelButton: {
        backgroundColor: '#FF1C00',
        margin: '15px'
    }
  }));

function AllStocks() {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [date, setDate] = useState(new Date)
    const classes = useStyles();
    
    useEffect(() => {
        function onLoad() {
            axios.get('/api/stocks/all')
            .then(res => {
                setStocks(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
        }
        onLoad()
      }, [])

      const displayStocks = () => {
          return stocks.map(s => {
            const split = s.created_at.split("/");
            const month = split[0];
            const year = split[1];
            const fullDate = new Date(month + "/" + "01" + "/" + year);
            const createdAtFormatted = moment(fullDate).format("MMMM YYYY")
              return(
                  <div key={s._id}>
                      <Link to={`/all-stocks/${s._id}`} className={classes.link}>
                         <Button className={classes.button}>{createdAtFormatted}</Button>
                      </Link>
                  </div>
              )
          })
      }

    const handleDateChange = name => date => {
        setDate(date)
    }

    const handleSave = () => {
        const dateFormatted = moment(date).format("MM/YYYY")
        setLoading(true)
        axios.post('/api/stocks/new', {date: dateFormatted})
        .then(res => {
            const {id} = res.data;
            window.location.replace(`/all-stocks/${id}`)
        })
        .catch(err => console.log(err))
    }

    if(loading) {
        return(
            <div className={classes.loader}>
                <LinearProgress />
            </div>
        )
    } else if (adding) {
        return (
            <div className={classes.root}>
                <Paper elevation={0}>
                    <div className={classes.container}>
                        <h1>Select Recommendation Month</h1>
                        <form noValidate autoComplete="off">
                            <div className={classes.field}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Recommendation Month"
                                            value={date}
                                            onChange={handleDateChange('date')}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <Button onClick={handleSave} className={classes.saveButton}>Save</Button>
                                <Button onClick={() => setAdding(false)} className={classes.cancelButton}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </Paper>
            </div>
        )
    } else {
        return(
            <div className={classes.container}>
                <h1>All Stocks</h1>
                <div>
                    <Button className={classes.newButton} align='right' onClick={() => setAdding(true)}>Add New Stock</Button>
                </div>
                {displayStocks()}
            </div>
        )
    }
}

export default withRouter(AllStocks);