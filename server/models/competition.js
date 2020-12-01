const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
    entryFee: Number,
    startDate: Date,
    endDate: Date,
    userCount: {
        type: Number,
        default: 0
    },
    prize: Number,
    status: {
        type: String,
        default: 'active'
    },
    entries: []

});

mongoose.model('Competition', CompetitionSchema);