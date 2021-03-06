var express = require('express');
var Space = require('../models/space');
var router = express.Router();

/*
 * GET /spaces route to retrieve all the spaces.
 */
router.get('/', function(req, res){
    Space.find()
        .populate('bookings')
        .exec(function (err, spaces) {
            if(err) return console.log(err);
            res.render('spaces/index', { spaces: spaces });
        });
});

router.get('/addspace', function(req, res){
    res.render('spaces/addspace');
});

router.post('/', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    Space.create({ title: title, description: description, price: price }, function(err) {
        if(err) return console.log(err);
        res.redirect('/spaces');
    });
});

module.exports = router;
