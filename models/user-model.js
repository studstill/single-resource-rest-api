'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required'
  },
  note: String
});

module.exports = mongoose.model('User', userSchema);
