const { Router } = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
var Competition = require('../models/competition');
var Stocks = require('../models/stock');
const users = require('./users');
const competition = require('./competition');
const stripe = require('./stripe');
const stocks = require('./stocks');

const router = Router();

router.use('/users', users);
router.use('/competition', competition)
router.use('/stripe', stripe);
router.use('/stocks', stocks);

module.exports = router;