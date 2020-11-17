import React, {useState, useEffect} from 'react';
import './landing.css';
import './landing.scss';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    link: {
      textDecoration: 'none',
      color: 'white',
      display: 'inline-block'
    },
    positiveIcon: {
        color: 'green',
        display: 'inline-block',
        fontSize: 65,
        verticalAlign: 'bottom'
    },
    negativeIcon: {
        color: 'red',
        display: 'inline-block',
        fontSize: 65,
        verticalAlign: 'bottom'
    },
    container: {
    },
    positiveText: {
        color: 'green',
        fontSize: 25,
        display: 'inline-block',
        margin: 3
    },
    negativeText: {
        color: 'red',
        fontSize: 25,
        display: 'inline-block',
        margin: 3
    },
    loader: {
        margin: 60
    }
  }));

function Stock(props) {
    const [loading, setLoading] = useState(true)
    const [stock, setStock] = useState({
        positive: null,
        priceChange: '',
        percentChange: ''
    })
    const classes = useStyles();
    const {key, url, name} = props;

    useEffect(() => {
        const {ticker, date} = props;
        function onLoad() {
            axios.get(`/api/stocks/${ticker}/${date}`)
            .then(res => {
                findChange(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        onLoad()
      }, [props])

      const findChange = (data) => {
          if(data.todaysData.latestPrice > data.historicalData.low) {
            //   Positive Change
            const price = Number.parseFloat(data.todaysData.latestPrice - data.historicalData.low).toFixed(2);
            const percent = Number.parseFloat((data.todaysData.latestPrice - data.historicalData.low) / data.todaysData.latestPrice * 100).toFixed(2);
            setStock({
                positive: true,
                priceChange: price,
                percentChange: percent

            })
            setLoading(false)
          } else {
            //   Negative Change
            const price = Number.parseFloat(data.historicalData.low - data.todaysData.latestPrice).toFixed(2);
            const percent = Number.parseFloat((data.historicalData.low - data.todaysData.latestPrice) / data.historicalData.low * 100).toFixed(2);
            setStock({
                positive: false,
                priceChange: price,
                percentChange: percent

            })
            setLoading(false)
          }
      }

      const displayStock = () => {
          if(stock.positive) {
            //   Positive
              return(
                <div className={classes.container}>
                    <a key={key} className={classes.link} href={url} target='_blank' rel="noopener noreferrer"><li>{name}</li></a>
                    <ArrowDropUpIcon className={classes.positiveIcon}/>
                    <p className={classes.positiveText}>+${stock.priceChange}</p>                   
                    <p className={classes.positiveText}>({stock.percentChange}%)</p>                   
                </div>
              )
          } else {
            //   Negative
              return(
                <div>
                    <a key={key} className={classes.link} href={url} target='_blank' rel="noopener noreferrer"><li>{name}</li></a>
                    <ArrowDropDownIcon className={classes.negtiveIcon}/>
                    <p className={classes.negativeText}>-${stock.priceChange}</p>                   
                    <p className={classes.negativeText}>(-{stock.percentChange}%)</p>                     
                </div>
              )
          }
      }

      if(loading) {
          return(
              <div className={classes.loader}>
                  <LinearProgress />
              </div>
          )
      } else {
        return(
            <div>
                {displayStock()}
            </div>
        )
      }
}

export default Stock;