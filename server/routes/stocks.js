const router = require('express').Router();   
require('dotenv').config();
const axios = require('axios');
const baseUrl = 'https://cloud.iexapis.com/stable'
const mongoose = require('mongoose');
const Stock = mongoose.model('Stock');
const stocks = require('../jobs/stocks');

router.get('/:ticker/:date', async (request, response, next) => {
  const {ticker, date} = request.params;
  const historicalUrl = `${baseUrl}/stock/${ticker}/chart/date/${date}?chartByDay=true&token=${process.env.IEXPublishable}`
  const historicalData = await axios.get(historicalUrl);
  const todaysUrl = `${baseUrl}/stock/${ticker}/quote?token=${process.env.IEXPublishable}`
  const todaysData = await axios.get(todaysUrl);
  response.json({
    todaysData: todaysData.data,
    historicalData: historicalData.data[0]
  })
})

router.get('/', (request, response, next) => {
  const {created_at} = request.query;
  Stock.find({created_at}, function(err, stock) {
    if (err) next(err)

    response.json({stock: stock[0]})
  })
})

router.get('/all', (request, response, next) => {
  Stock.find({}, null, {sort: {timeStamp: -1}}, function(err, stocks) {
    if (err) next(err)

    response.json(stocks)
  })
})

router.get('/single', (req, res, next) => {
  const {id} = req.query;
  Stock.find({_id: id}, function(err, stock) {
    if (err) next(err);

    res.json(stock[0])
  })
})

router.post('/new-stock', (req, res, next) => {
  const {id, newArr} = req.body;
  Stock.findByIdAndUpdate({_id: id}, {
    "$set":{stocks: newArr}
  },
  {"new": true, "upsert": true},
  function(err, stock) {
    if(err) return next(err)

    stocks.getData()
    res.json(stock)
  })
})

router.post

module.exports = router;