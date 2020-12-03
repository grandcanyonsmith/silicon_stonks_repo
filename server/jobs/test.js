const moment = require('moment');

function test() {
    const date = new Date;
    const dateFormatted = moment(date).format('MMMM Do YYYY, h:mm:ss a');
    console.log("Test sucessfully ran on: ",dateFormatted)
}

module.exports= {test}