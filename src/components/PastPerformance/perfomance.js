import React, {useState, useEffect} from 'react';
import '../landing/landing.css'
import '../landing/landing.scss';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import BackgroundVideo from '../background-video/BackgroundVideo';

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

function Stock(props) {
    const [loading, setLoading] = useState(true)
    const [stock, setStock] = useState([])
    const {month, year} = props.match.params;
    const [lastUpdated, setLastUpdated] = useState(new Date(`${month}/01/${year}`))
    const classes = useStyles();
    const {key, url, name} = props;

    useEffect(() => {
        function onLoad() {
            const {month, year} = props.match.params;
            const todaysDateFormatted = `${month}/${year}`
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
                    <a className={classes.link} href="#" target='_blank' rel="noopener noreferrer"><li>{s.name}</li></a>
                    <ArrowDropUpIcon viewBox="-5 -5 24 24" className={classes.positiveIcon}/>
                    <p className={classes.positiveText}>+${s.priceChange}</p>                   
                    <p className={classes.positiveText}>({s.percentChange}%)</p>                   
                </div>
              )
          } else {
            //   Negative
              return(
                <div className={classes.container} key={s.name}>
                    <a className={classes.link} href="#" target='_blank' rel="noopener noreferrer"><li>{s.name}</li></a>
                    <ArrowDropDownIcon className={classes.negtiveIcon}/>
                    <p className={classes.negativeText}>${s.priceChange}</p>                   
                    <p className={classes.negativeText}>(-{s.percentChange}%)</p>                     
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
            <BackgroundVideo className='nav-wrapper__video'/>
            <div className="landing">
                <div className="landing__titles">
                <div className="column"></div>
                <div className="column">
                    <div className="title">{moment(lastUpdated).format("MMMM YYYY")}</div>
                </div>
                </div>
                <ul className='landing__stock-list'>
                <div>
                    <div className="percent-change-title">
                        <div className="percent-change-column-1"></div>
                        <div className="percent-change-column-2">% change during<br></br>
                        {moment(lastUpdated).format("MMMM YYYY")} recommendation
                    </div>
                    </div>
                    {stock.map(s => {
                        return displayStock(s)
                    })}
                </div>
                </ul>
        </div>
        </div>
        )
      }
}

export default Stock;