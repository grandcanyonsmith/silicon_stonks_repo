import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
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
    }
  }));

function Overall() {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(true)
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
                      <Link to={`/performance/${s.created_at}`} className={classes.link}>
                         <Button className={classes.button}>{createdAtFormatted}</Button>
                      </Link>
                  </div>
              )
          })
      }

    if(loading) {
        return(
            <div className={classes.loader}>
                <LinearProgress />
            </div>
        )
    } else {
        return(
            <div className={classes.container}>
                <h1>Past Performance</h1>
                {displayStocks()}
            </div>
        )
    }
}

export default withRouter(Overall);