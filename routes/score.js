var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var User = require('../models/user');
var Score = require('../models/score');

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret123', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.get('/scores', function (req, res, next) {
  var userId = mongoose.Types.ObjectId(req.query.userid);
  Score.find({user : userId})
    .exec(function(err, scores) {
       if (err) {
         return res.status(500).json({
           title: 'An error occurred',
           error: err
         });
       }
       res.status(200).json({
         message: 'Success',
         obj: scores
       });
    });
});

router.post('/addscore', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var userId = mongoose.Types.ObjectId(req.query.userid);
    var score = new Score({
        date_played: req.body.date_played,
        course: req.body.course,
        slope: req.body.slope,
        rating: req.body.rating,
        score: req.body.score,
        user: userId
    });
    score.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved message',
            obj: result
        });
    });
});

module.exports = router;