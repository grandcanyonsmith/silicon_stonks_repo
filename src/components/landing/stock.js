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
        verticalAlign: 'bottom',
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
        margin: '10vw'
    }
  }));

  const STONKS = [
    {key: 1, name: "Autodesk", url: 'https://finance.yahoo.com/quote/ADSK/', ticker: 'ADSK', date: '20201130'},
    {key: 2, name: "Appian", url: 'https://finance.yahoo.com/quote/APPN/', ticker: 'APPN', date: '20201130'},
    {key: 3, name: "Fiverr", url: 'https://finance.yahoo.com/quote/FVRR/', ticker: 'FVRR', date: '20201130'},
    {key: 4, name: "Datadog", url: 'https://finance.yahoo.com/quote/DDOG/', ticker: 'DDOG', date: '20201130'},
    {key: 5, name: "Equinix", url: 'https://finance.yahoo.com/quote/EQIX/', ticker: 'EQIX', date: '20201130'},
    // {key: 6, name: "Etsy", url: 'https://finance.yahoo.com/quote/ETSY/', ticker: 'ETSY', date: '20201130'}
]

const updatedStock = []

function Stock(props) {
    const [loading, setLoading] = useState(true)
    const [stock, setStock] = useState([])
    const classes = useStyles();
    const {key, url, name} = props;

    useEffect(() => {
        function onLoad() {
            STONKS.map(stonk => {
                axios.get(`/api/stocks/${stonk.ticker}/${stonk.date}`)
                .then(res => {
                    updatedStock.push({stock: stonk, data:res.data})
                    if (updatedStock.length === STONKS.length) {
                        sortArr(updatedStock)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })
        }
        onLoad()
      }, [props])

      const sortArr = (arr) => {
          function compare(a,b) {
              if (((a.data.todaysData.latestPrice - a.data.historicalData.low) / a.data.historicalData.low *100) > ((b.data.todaysData.latestPrice - b.data.historicalData.low) / b.data.historicalData.low *100)) {
                  return -1;
              } 
              if (((a.data.todaysData.latestPrice - a.data.historicalData.low) / a.data.historicalData.low *100) < ((b.data.todaysData.latestPrice - b.data.historicalData.low) / b.data.historicalData.low *100)) {
                return 1;
              }
              return 0;
          }
          setStock(arr.sort(compare))
          setLoading(false)
      }

      const displayStock = (s) => {
          const percentChange = Number.parseFloat((s.data.todaysData.latestPrice - s.data.historicalData.low) / s.data.historicalData.low * 100).toFixed(2);
          const priceChange = Number.parseFloat(s.data.todaysData.latestPrice - s.data.historicalData.low).toFixed(2);
          if(s.data.todaysData.latestPrice > s.data.historicalData.low) {
            //   Positive
              return(
                <div className={classes.container} key={s.stock.key}>
                    <a className={classes.link} href={s.stock.url} target='_blank' rel="noopener noreferrer"><li>{s.stock.name}</li></a>
                    <ArrowDropUpIcon viewBox="-5 -5 24 24" className={classes.positiveIcon}/>
                    <p className={classes.positiveText}>+${priceChange}</p>                   
                    <p className={classes.positiveText}>({percentChange}%)</p>                   
                </div>
              )
          } else {
            //   Negative
              return(
                <div key={s.stock.key}>
                    <a className={classes.link} href={url} target='_blank' rel="noopener noreferrer"><li>{name}</li></a>
                    <ArrowDropDownIcon className={classes.negtiveIcon}/>
                    <p className={classes.negativeText}>${priceChange}</p>                   
                    <p className={classes.negativeText}>(-{percentChange}%)</p>                     
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
                <div className="percent-change-title">
                    <div className="percent-change-column-1"></div>
                    <div className="percent-change-column-2">% change since<br></br>
                    Nov. 1st recommendation</div>
                </div>
                {stock.map(s => {
                    return displayStock(s)
                })}
            </div>
        )
      }
}

export default Stock;