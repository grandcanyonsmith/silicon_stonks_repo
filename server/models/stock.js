const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    stocks: [],
    created_at: String, //MM/YYYY
    refreshed: Date,
    timeStamp: {
        type: Date,
        default: new Date
    }
});

mongoose.model('Stock', StockSchema);