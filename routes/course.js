var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

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

router.get('/courses', function (req, res, next) {
  var userId = mongoose.Types.ObjectId(req.query.userid);
  console.log(userId);
  Course.find({user : userId}, function(err, courses) {
       if (err) {
         return res.status(500).json({
           title: 'An error occurred',
           error: err
         });
       }
       res.status(200).json({
         message: 'Success',
         obj: courses
       });
  });
});

router.post('/addcourse', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Course.findById(decoded.user._id, function (err, course) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var course = new Course({
          name: req.body.name,
          slope: req.body.slope,
          rating: req.body.rating,
          user: user          
        });
        course.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.courses.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    });
});

router.get('/course', function(req, res, next) {
  Course.findOne({'course.name' : `\"${req.params.courseName}\"`, 'course.user' : `\"${req.params.userId}\"`}, function (err, course) {
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
    if (course.user != decoded.user._id) {
      return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
    }
    course.name = req.body.name;
    course.save(function(err, selectedCourse) {
      if (err) {
        return res.status(500).json({
           title: 'An error occurred',
           error: err 
        });
      }
      res.status(200).json({
          message: 'Returned selected course',
          obj: selectedCourse
      });
    });
  });
});

module.exports = router;