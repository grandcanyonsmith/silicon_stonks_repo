const mongoose = require('mongoose');
const Stock = mongoose.model('Stock');
require('dotenv').config();
const axios = require('axios');
const baseUrl = 'https://cloud.iexapis.com/stable'
const moment = require('moment');


async function update() {

    fetchedData = [];

    const todaysDate = new Date;
    const todaysDateFormatted = moment(todaysDate).format("MM/YYYY");

    Stock.find({created_at: todaysDateFormatted}, async function(err, stock){
        const s = stock[0];
        stocksArr = stock[0].stocks;
        for (var i = 0; i < stocksArr.length; i++) {
            const {ticker, date} = stocksArr[i];
            const historicalUrl = `${baseUrl}/stock/${ticker}/chart/date/${date}?chartByDay=true&token=${process.env.IEXPublishable}`
            const historicalData = await axios.get(historicalUrl);
            const todaysUrl = `${baseUrl}/stock/${ticker}/quote?token=${process.env.IEXPublishable}`
            const todaysData = await axios.get(todaysUrl);
            const arr = {
                stock: stocksArr[i],
                todaysData: todaysData.data,
                historicalData: historicalData.data[0],
            }
            fetchedData.push(arr)
            if(fetchedData.length === stocksArr.length) {
                math(fetchedData)
            }
        }
    })
}

function math(data) {
    const newArr = []

    for (var i = 0; i < data.length; i++) {
        const percentChange = Number.parseFloat((data[i].todaysData.latestPrice - data[i].historicalData.low) / data[i].historicalData.low * 100).toFixed(2);
        const priceChange = Number.parseFloat(data[i].todaysData.latestPrice - data[i].historicalData.low).toFixed(2);
        formattedArr = {
            name: data[i].stock.name,
            ticker: data[i].stock.ticker,
            date: data[i].stock.date,
            percentChange,
            priceChange,
        };
        newArr.push(formattedArr)
        if(newArr.length === data.length) {
            sendToDb(newArr)
        }
    }
};

function sendToDb(arr) {
    const todaysDate = new Date;
    const todaysDateFormatted = moment(todaysDate).format("MM/YYYY")
    Stock.findOneAndUpdate({created_at: todaysDateFormatted}, {
        "$set":{ stocks: arr},
        created_at: todaysDateFormatted,
        refreshed: moment(todaysDate).format("LLLL")
    },
    {"new": true, "upsert": true},
    function(err, res) {
        if(err) {
            console.log(err)
        }
        console.log(res)
    })
}

module.exports = {update}