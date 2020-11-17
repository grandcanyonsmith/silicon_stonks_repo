const router = require('express').Router();   
require('dotenv').config();
const axios = require('axios');
const baseUrl = 'https://cloud.iexapis.com/stable'

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

module.exports = router;