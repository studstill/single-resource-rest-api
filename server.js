var express = require('express');

module.exports = function startServer() {
  var app = express(),
    userRouter = require('./user-router'),
    port = process.env.PORT || 3000;

  app.listen(port);
  app.use('/', userRouter);
  console.log('Server started on ' + port);
};

/**************************************************
/  Server is being started within 'server-test.js'
/  during testing phase (i.e. NOW)
/**************************************************/


