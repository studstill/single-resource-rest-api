var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('./user-model');

router.get('/', function(req, res) {
  res.json({msg: 'GET request received at path "/"'});
});

module.exports = router;



