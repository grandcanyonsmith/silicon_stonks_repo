const { Router } = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
const users = require('./users');
const stripe = require('./stripe');
const stocks = require('./stocks');

const router = Router();

router.use('/users', users);
router.use('/stripe', stripe);
router.use('/stocks', stocks);

module.exports = router;