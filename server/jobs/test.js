const moment = require('moment');
const axios = require('axios');

function test() {
    const date = new Date;
    const dateFormatted = moment(date).format('MMMM Do YYYY, h:mm:ss a');
    axios.post('https://hooks.zapier.com/hooks/catch/4616385/oek287d/', {timeStamp: dateFormatted})
    .then(res => console.log("Cron job success"))
    .catch(err => console.log(err))
}

module.exports= {test}