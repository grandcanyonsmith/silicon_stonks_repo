const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');
require('dotenv').config();
const stripe = require('stripe')(process.env.stripeToken);
const axios = require('axios');
const {forgotPassword} = require('../utils/emails/forgotPassword');

// TODO
router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({ success: true, msg: 'You are authorized!'});
});

router.post('/login', function(req, res, next){
    const {email, password} = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            const isValid = utils.validPassword(password, user.hash, user.salt);

            if (isValid) {
                const tokenObject = utils.issueJWT(user);
                res.status(200).json({ success: true, user, token: tokenObject.token, expiresIn: tokenObject.expires })
            } else {
                res.status(401).json({ success: false, msg: 'you entered the incorrect password'})
            }
        })
        .catch((err) => {
            next(err);
        })
});

router.post('/register', function(req, res, next){
    const {first, last, email, phone, password} = req.body;
    const saltHash = utils.genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        first,
        last,
        email,
        phone,
        hash,
        salt
    })

    newUser.save()
        .then((user) => {
            const jwt = utils.issueJWT(user);
            axios.post("https://hooks.zapier.com/hooks/catch/1739571/oqwdn6u/", user)
                .then(response => {
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
            res.json({success: true, user, token: jwt.token, expiresIn: jwt.expires});
        })
        .catch(err => next(err));
});

router.get('/profile', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const {first, last, email, phone, stripeCustomerId, subscribed} = req.user;
    if (stripeCustomerId) {
        const returnUrl = process.env.returnUrl;
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: stripeCustomerId,
          return_url: returnUrl
        });
        res.json({user: {
            first,
            last,
            email,
            phone,
            stripeCustomerId, 
            subscribed,
            manageUrl: portalSession.url
        }})
    }else {
        res.json({user: {
            first,
            last, 
            email,
            phone,
            stripeCustomerId,
            subscribed,
            manageUrl: ''
        }})
    }
}) 

router.post('/forgotpassword', (req, res, next) => {
    const {email} = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
                const tokenObject = utils.issueForgotPasswordJWT(user);
                forgotPassword(tokenObject.token, user.first, user.email)
                res.status(200).json({ success: true })
        })
        .catch((err) => {
            next(err);
        })
})

router.post('/changepassword', passport.authenticate('jwt', {session: false}), (request, response, next) => {
    const {user} = request;
    const {password} = request.body;
    const saltHash = utils.genPassword(password.password1);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    User.findByIdAndUpdate({_id: user._id}, {
        salt,
        hash
      }, function(err, res) {
        if(err) {
          console.log(err)
        } else {
          response.json({success: true})
        }
     });
     
});

router.get('/validate-token', passport.authenticate('jwt', {session: false}), (request, response, next) => {
    response.json({user: request.user})
})

module.exports = router;