var mongoose = require('mongoose');
var fs = require('fs');

// read db location from file (this is relative to your setup)
fs.readFile('./config', function(err, data) {
  if (err) throw err;
  var db = data.toString();

  var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL || db;

  mongoose.connect(mongoUri, function (err, res) {
  if (err) {
    console.log('Error connect to: ' + mongoUri + '. ' + err);
  } else {
    console.log('Succeeded and connected to: ' + mongoUri);
  }
});


});

var schema = new mongoose.Schema({
  title: String,
  text: String 
});

module.exports = mongoose.model('Post', schema);
