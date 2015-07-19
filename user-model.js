'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection:error'));

db.once('open', function() {

  var userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number
  });

  module.exports = mongoose.model('User', userSchema);
});
