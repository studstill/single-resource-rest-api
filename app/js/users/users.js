'use strict';

// This is where I'm doing all the dependecy management for notes, so I can
// just include a single file in my main application and require it into
// this function
module.exports = exports = function(app) {
  // We use the underscore to make to account for operating systems that don't
  // handle case (camel case, upper case, lower case, etc.)
  require('./controllers/user-controller')(app);
};
