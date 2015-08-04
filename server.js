var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var userRouter = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users');

require('./routes/user-router')(userRouter);

app.use(express.static(__dirname + '/build'));
app.use('/users', userRouter);

catchAllMessage = {msg: 'Please direct your URI to a valid endpoint.',
  endpoints: ['/users']};

// app.all(['/', '/index'], function(req, res) {
//   res.json(catchAllMessage);
// });

// app.all('*', function(req, res) {
//   catchAllMessage.error = '404 Not found';
//   res.status(404).json(catchAllMessage);
// });

app.listen(port, function() {
  console.log('Server started on ' + port);
});
