var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./user');

var scoreSchema = new Schema({
  date_played: {type: String, required: true},
  course: {type: String, required: true},
  slope: {type: Number, required: true},
  rating: {type: Number, required: true},
  score: {type: Number, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Score', scoreSchema);