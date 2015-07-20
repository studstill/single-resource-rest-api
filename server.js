var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var userRouter = express.Router();

module.exports = function server() {

  mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users');

  require('./user-router')(userRouter);

  app.use('/users', userRouter);

  catchAllMessage = {msg: 'Please direct your URI to a valid endpoint.',
    endpoints: ['/users']};

  app.all(['/', '/index'], function(req, res) {
    res.json(catchAllMessage);
  });

  app.all('*', function(req, res) {
    catchAllMessage.error = '404 Not found';
    res.status(404).json(catchAllMessage);
  });

  app.listen(port);
  console.log('Server started on ' + port);
};

/**************************************************
/  Server is being started within 'server-test.js'
/  during testing phase (i.e. NOW)
/**************************************************/


