const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: {
        type: String,
        unique: true
    },
    phone: String,
    stripeCustomerId: String,
    subscribed: {
        type: Boolean,
        default: false
    },
    hash: String,
    salt: String
});

mongoose.model('User', UserSchema);