var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var courseSchema = new Schema({
  name: {type: String, required: true},
  slope: {type: Number, required: true},
  rating: {type: Number, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Course', courseSchema);