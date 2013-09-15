var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/angular_express');
var schema = new mongoose.Schema({
  title: String,
  text: String 
});

module.exports = mongoose.model('Post', schema);
