const mongoose = require('mongoose');
const Stock = mongoose.model('Stock');
require('dotenv').config();
const axios = require('axios');
const baseUrl = 'https://cloud.iexapis.com/stable'
const moment = require('moment');


async function getData() {
    const todaysDate = new Date;
    const todaysDateFormatted = moment(todaysDate).format("MM/YYYY");

    Stock.find({}, async function(err, stock){
        stock.map(stocks => {
            const stocksArr = stocks.stocks;
            const fetchedData = [];
            const id = stocks._id
            stocksArr.map(s => {
                const {ticker, date} = s;
                getIexData(ticker, date)
                .then(res => {
                    const newArr = {
                        stock: s,
                        historicalData: res.historicalData,
                        todaysData: res.todaysData
                    }
                    fetchedData.push(newArr)

                    if(fetchedData.length === stocksArr.length) {
                        math(fetchedData, id)
                    }
                })
                .catch(err => console.log(err))
            })
        })
    })
}

async function getIexData(ticker, date) {
    const historicalUrl = `${baseUrl}/stock/${ticker}/chart/date/${date}?chartByDay=true&token=${process.env.IEXPublishable}`
    const historicalData = await axios.get(historicalUrl);
    const todaysUrl = `${baseUrl}/stock/${ticker}/quote?token=${process.env.IEXPublishable}`
    const todaysData = await axios.get(todaysUrl);
    return({todaysData: todaysData.data, historicalData: historicalData.data[0]})
}

function math(data, id) {
    const newArr = []
    for (var i = 0; i < data.length; i++) {
        const percentChange = Number.parseFloat((data[i].todaysData.latestPrice - data[i].historicalData.low) / data[i].historicalData.low * 100).toFixed(2);
        const priceChange = Number.parseFloat(data[i].todaysData.latestPrice - data[i].historicalData.low).toFixed(2);
        formattedArr = {
            name: data[i].stock.name,
            ticker: data[i].stock.ticker,
            date: data[i].stock.date,
            url: data[i].stock.url,
            description: data[i].stock.description,
            percentChange,
            priceChange,
        };
        newArr.push(formattedArr)
        if(newArr.length === data.length) {
            sendToDb(newArr, id)
        }
    }
};

function sendToDb(arr, id) {
    const todaysDate = new Date;
    const todaysDateFormatted = moment(todaysDate).format("MM/YYYY")
    Stock.findOneAndUpdate({_id: id}, {
        "$set":{ stocks: arr},
        refreshed: moment(todaysDate).format("LLLL")
    },
    {"new": true, "upsert": true},
    function(err, res) {
        const date = new Date;
        const dateFormatted = moment(date).format('MMMM Do YYYY, h:mm:ss a');
        if(err) {
            console.log(err)
        }
        axios.post('https://hooks.zapier.com/hooks/catch/4616385/oek287d/', {status: `Stock ID: ${id} Updated`, timeStamp: dateFormatted})
    })
}

module.exports = {getData}