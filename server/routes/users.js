const { Router } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');

const User = require('../models/user');

const router = Router();

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
      res.json({user: req.user})
  });

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
    function(username, password, done) {
    User.getUserByEmail(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'Unknown Email'})
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) return done(err);
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: "Invalid Password"})
            }
        })
    })
}))

router.post('/register', [
    body('first').notEmpty(),
    body('last').notEmpty(),
    body('phone').isMobilePhone(),
    body('email').isEmail(),
    body('first').notEmpty(),
], (req, res, next) => {
    const {first, last, phone, email, password1, password2} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
        const newUser = new User({
            first,
            last,
            phone, 
            email, 
            password: password1
        });

        User.createUser(newUser, (err, user) => {
            if(err) throw err;
            
            res.json(user)
        })
    }
})


module.exports = router;