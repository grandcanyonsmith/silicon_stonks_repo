const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: {
        type: String,
        unique: true
    },
    phone: String,
    hash: String,
    salt: String
});

mongoose.model('User', UserSchema);