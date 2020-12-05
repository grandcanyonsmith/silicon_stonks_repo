const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config();
const axios = require('axios');

function pullContacts() {
    const query = User.find({}).select('email -_id');

    query.exec(function (err, data) {
        const emails = []
        data.map(d => {
            emails.push(d.email)

            if(emails.length === data.length) {
                sendData(emails)
            }
        })
    })
}

function sendData(emails) {
    for(var i = 0; i < emails.length; i++) {
        axios.post('https://hooks.zapier.com/hooks/catch/4616385/oes3r2o/', {email: emails[i]})
        .then(res => console.log(res.status))
        .catch(err => console.log(err))
    }
}


module.exports = {pullContacts}