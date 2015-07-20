'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  age: Number
});

module.exports = mongoose.model('User', userSchema);
