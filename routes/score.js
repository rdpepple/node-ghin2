var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

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

router.get('/', function (req, res, next) {
  Score.find()
    .populate('name')
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

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var score = new Score({
          course: req.body.name,
          slope: req.body.slope,
          rating: req.body.rating,
          score: req.body.score,
          user: user          
        });
        score.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.scores.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    });
});

module.exports = router;