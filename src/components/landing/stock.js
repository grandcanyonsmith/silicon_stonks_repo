import React, {useState, useEffect} from 'react';
import './landing.css';
import './landing.scss';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import Description from './description';

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

function Stock(props) {
    const [loading, setLoading] = useState(true)
    const [stock, setStock] = useState([])
    const [lastUpdated, setLastUpdated] = useState(moment(new Date).format("MMMM") + " " + "1st")
    const classes = useStyles();
    const {key, url, name} = props;

    useEffect(() => {
        function onLoad() {
            const todaysDate = new Date;
            const todaysDateFormatted = moment(todaysDate).format("MM/YYYY");
            axios.get(`/api/stocks`, {params: {created_at: todaysDateFormatted}})
            .then(res => {
                sortArr(res.data.stock.stocks)
            })
            .catch(err => {
                console.log(err)
            })
        }
        onLoad()
      }, [props])

      const sortArr = (arr) => {
          function compare(a,b) {
              if (Number(a.percentChange) > Number(b.percentChange)) {
                  return -1;
              } 
              if (Number(a.percentChange) < Number(b.percentChange)) {
                return 1;
              }
              return 0;
          }
          setStock(arr.sort(compare))
          setLoading(false)
      }

      const displayStock = (s) => {
          if(Number(s.priceChange) > 0) {
            //   Positive
              return(
                <div className={classes.container} key={s.name}>
                    <a className={classes.link} href={s.url} target='_blank' rel="noopener noreferrer"><li>{s.name}</li></a>
                    <ArrowDropUpIcon viewBox="-5 -5 24 24" className={classes.positiveIcon}/>
                    <p className={classes.positiveText}>+${s.priceChange}</p>                   
                    <p className={classes.positiveText}>({s.percentChange}%)</p>  
                    {
                        s.description ? 
                        <Description name={s.name} description={s.description} /> :
                        null
                    }
                </div>
              )
          } else {
            //   Negative
              return(
                <div className={classes.container} key={s.name}>
                    <a className={classes.link} href={s.url} target='_blank' rel="noopener noreferrer"><li>{s.name}</li></a>
                    <ArrowDropDownIcon viewBox="-5 -5 24 24" className={classes.negativeIcon}/>
                    <p className={classes.negativeText}>${s.priceChange}</p>                   
                    <p className={classes.negativeText}>({s.percentChange}%)</p>                     
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
                    {lastUpdated} recommendation
                </div>
                </div>
                {stock.map(s => {
                    return displayStock(s)
                })}
            </div>
        )
      }
}

export default Stock;