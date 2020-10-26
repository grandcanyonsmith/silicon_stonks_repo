const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const routes = require('./routes');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();
const expressValidator = require('express-validator');
const dev = app.get('env') !== 'production';
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;

app.use(express.static(path.join(__dirname, "../build")));
app.use(cookieparser())
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use((err, req, res, next) => {
  res.json(err);
});

// // Handle Sessions
app.use(session({
  secret: process.env.sessionSecret
}));

app.use(bodyParser.urlencoded({ extended: false }));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// if (!dev) {
//   app.use(express.static(path.resolve(__dirname, '../build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
//   });
// };

app.use('/api', routes);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));