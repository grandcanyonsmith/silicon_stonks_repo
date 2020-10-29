const { Router } = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
const users = require('./users');

const router = Router();

router.use('/users', users);

module.exports = router;