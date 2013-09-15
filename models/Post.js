var mongoose = require('mongoose');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/angular_express';


mongoose.connect(mongoUri, function (err, res) {
  if (err) {
    console.log('Error connect to: ' + mongoUri + '. ' + err);
  } else {
    console.log('Succeeded and connected to: ' + mongoUri);
  }
});

var schema = new mongoose.Schema({
  title: String,
  text: String 
});

module.exports = mongoose.model('Post', schema);
