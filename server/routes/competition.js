const router = require('express').Router();  
const mongoose = require('mongoose');
const Competition = mongoose.model('Competition');
require('dotenv').config();


// Get comp
router.get('/', (request, response, next) => {
    Competition.find({status: 'active'}, function(err, comp) {
        response.json(comp)
    })
})

// Create new comp
router.post('/create', (req, res, next) => {
    const {entryFee, startDate, endDate, prize} = req.body.competition;
    const newCompetition = new Competition({
        entryFee,
        startDate,
        endDate,
        prize
    })
    newCompetition.save()
        .then(competition => {
            res.json({success: true})
        })
        .catch(err => next(err))
})

module.exports = router;