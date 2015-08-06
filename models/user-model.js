'use strict';

var mongoose = require('mongoose');

// Citation: validateEmail function and reqex come from
// http://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax#answer-24214767

var validateEmail = function(email) {
    var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegEx.test(email);
};

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required'
  },
  email: {
    type: String,
    validate: [function(email) {
      var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegEx.test(email);
      }, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    'Please fill a valid email address']
  },
  age: Number
});

module.exports = mongoose.model('User', userSchema);
