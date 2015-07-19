var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = express();

function startServer(app, port) {
  app.listen(port);
  console.log('Server started on ' + port);
  app.get('/', function(req, res) {
    res.json({msg: 'GET request received at "/"'});
  });
}

startServer(app, port);
