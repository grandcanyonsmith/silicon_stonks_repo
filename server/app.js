const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const routes = require('./routes');
const cronTest = require('./jobs/test');
var CronJob = require('cron').CronJob;
const PORT = process.env.PORT || 5000;
var CronJob = require('cron').CronJob;
const stocks = require('./jobs/stocks');
require('./models/user')

require('dotenv').config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Must first load the models
require('./models/user');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cron jobs
var job = new CronJob('45 * * * *', function() {
  stocks.update()
}, null, true, 'America/Denver');
job.start();

stocks.getData()

// Allows our React application to make HTTP requests to Express application
app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

app.use('/api', routes);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));