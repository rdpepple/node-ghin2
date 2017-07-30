var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var User = require('../models/user');
var Course = require('../models/course');

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

router.get('/coursenames', function (req, res, next) {
    var userId = mongoose.Types.ObjectId(req.query.userid);
    Course.find({user : userId}, function(err, courses) {
        if (err) {
           return res.status(500).json({
               title: 'An error occurred',
               error: err
           });
        }
       res.status(200).json({
         message: 'Course names fetched',
         obj: courses
       });
  });
});

router.post('/addcourse', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var userId = mongoose.Types.ObjectId(req.query.userid);
    // Course.findById(decoded.user._id, function (err, course) {
    //     if (err) {
    //         return res.status(500).json({
    //             title: 'An error occurred',
    //             error: err
    //         });
    //     }
        var course = new Course({
          name: req.body.name,
          slope: req.body.slope,
          rating: req.body.rating,
          user: userId          
        });
        course.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved course',
                obj: result
            });
        });
    // });
});

router.get('/course', function(req, res, next) {
  var userId = mongoose.Types.ObjectId(req.query.userid);
  Course.findOne({name : req.query.coursename, user : userId}, function (err, course) {
    if (err) {
      return res.status(500). json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!course) {
      return res.status(500).json({
        title: 'No course found!',
        error: {message: 'Course not found'}
      });
    }
    res.status(200).json({
        message: 'Returned selected course',
        obj: course
    });
  });
});

module.exports = router;