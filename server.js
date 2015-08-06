var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var userRouter = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users');

require('./routes/user-router')(userRouter);

app.use(express.static(__dirname + '/build'));
app.use('/api', userRouter);

app.all('*', function(req, res) {
  res.status(404).send('404 Not Found');
});

app.listen(port, function() {
  console.log('Server started on ' + port);
});
