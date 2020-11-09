const mongoose = require('mongoose');
const router = require('express').Router();
const stripe = require('stripe')(process.env.stripeToken);
const User = mongoose.model('User');
const passport = require('passport');
const bodyParser = require('body-parser');
require('dotenv').config();

router.post('/create-checkout-session',(passport.authenticate('jwt', {session: false})), async (req, res) => {
  const priceId = 'price_1HimtzBDP0NXXJ55suerwZ8z'

    // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      metadata: {userId: req.user.id},
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${process.env.successUrl}{CHECKOUT_SESSION_ID}`,
      cancel_url: 'https://example.com/canceled.html',
    });

    res.json({
      id: session.id,
    });
  } catch (e) {
    res.status(400);
    return res.json({
      error: {
        message: e.message,
      }
    });
  }
  });

  router.post('/save-stripe-customer',(passport.authenticate('jwt', {session: false})), async (request, response, next) => {
    const {sessionId} = request.body;
    const checkoutsession = await stripe.checkout.sessions.retrieve(sessionId);
    const userId = request.user.id;
    User.findByIdAndUpdate({_id: userId}, {
      stripeCustomerId: checkoutsession.customer,
      subscribed: true
    }, function(err, res) {
      if(err) {
        console.log(err)
      } else {
        console.log(checkoutsession)
        response.json({received: true})
      }
   });
  });

  router.post('/create-portal-session', async (req, res, next) => {
    const returnUrl = process.env.returnUrl;
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutsession.customer,
      return_url: returnUrl
    });
  });

  router.get('/get-subscriptions', (passport.authenticate('jwt', {session: false})), (req, res, next) => {
    const user = req.user;
    console.log(user)
  })

  router.post('/webhook', (request, response, next) => {
    let event;
  
    try {
      event = request.body;
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        User.findByIdAndUpdate({_id: event.data.object.metadata.userId}, {
          stripeCustomerId: event.data.object.customer,
          subscribed: true
        }, function(err, res) {
          if (err) {
            console.log(err)
          } else {
            console.log(`User ${event.data.object.metadata.userId} updated!`)
          }
        })
        console.log("Customer created after Checkout")
        break;
      case 'customer.subscription.updated':
            // When the satus is updated to active or trial
        const subscription = event.data.object;
        User.findOneAndUpdate({stripeCustomerId: event.data.object.customer},{
          subscribed: true
        },
          function(err, res) {
            if(err) {
              console.log(err)
            } else {
              console.log(res)
            }
          })
          console.log("Customer is now active")
        break;
      case 'customer.subscription.deleted':
            // When the satus is updated to canceled
        User.findOneAndUpdate({stripeCustomerId: event.data.object.customer},{
          subscribed: false
        },
          function(err, res) {
            if(err) {
              console.log(err)
            } else {
              console.log(res)
            }
          })
          console.log("Customer canceled")
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a response to acknowledge receipt of the event
    response.json({received: true});
  });

module.exports = router;