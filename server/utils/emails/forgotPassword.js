require('dotenv').config();
var request = require("request");
const baseUrl = process.env.resetUrl;

function forgotPassword(token, first, email) {
    var options = { method: 'POST',
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: 
     { 'content-type': 'application/json',
       authorization: `Bearer ${process.env.SENDGRID_API_KEY}` },
    body: 
     { personalizations: 
        [ { to: [ { email: email, name: first } ],
            dynamic_template_data: { name: first, url: `${baseUrl}${token}` },
            subject: 'Forgot Password' } ],
       from: { email: 'investments@siliconstonks.com', name: 'Silicon Stonks' },
       reply_to: { email: 'investments@siliconstonks.com', name: 'Silicon Stonks' },
       template_id: 'd-880f8314fdba485e9f7154b6cec06d48' },
    json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
}

module.exports = {
    forgotPassword
}