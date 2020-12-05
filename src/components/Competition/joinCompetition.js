import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: '100px auto',
        padding: "50px",
        width: '90%',
        height: '225px',
        backgroundColor: 'white',
        textAlign: 'center'
      }
    },
    button: {
        margin: '25px',
        backgroundColor: 'green'
    },
    container: {
        textAlign: 'center'
    },
    profile: {
        margin: '150px auto'
    },
  }));

function JoinCompetition(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [competition, setCompetition] = useState({
        entryFee: 0,
        startDate: new Date,
        endDate: new Date,
        prize: 0,
        entries: [],
        userCount: 0
    });

    useEffect(() => {
        function onLoad() {
            const token = localStorage.getItem('token');
            axios.get('/api/competition', {headers: { 'Authorization': token}})
            .then(res => {
                const {entryFee, startDate, endDate, prize, entries, userCount} = res.data[0]
                setCompetition({
                    entryFee,
                    startDate,
                    endDate,
                    prize,
                    entries,
                    userCount
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
        onLoad()
      }, [])

    if(loading) {
        return (
            <div className={classes.container}>
                <div className={classes.profile}>
                    <LinearProgress />
                </div>
            </div>
        )
    } else {
        return(
            <div>
                <h1>Join now</h1>
            </div>
        )
    }
}

export default JoinCompetition;