'use strict';

var bodyParser = require('body-parser');
var User = require('./user-model');

module.exports = function(router) {
  router.use(bodyParser.json());

/************************************************************
/   Handle GET requests
/************************************************************/

  // Handle Root URL GET request
  router.get('/', function(req, res) {
    // Serve the entire users database
    User.find({}, function(err, data) {
      if (err)
        res.status(400).json({msg: 'Error finding data'});
      else
        res.json(data);
    });
  });

  // Handle ANY OTHER GET Request
  router.get('/:id', function(req, res) {
    var user = req.params.id;
    // Return document that matches username
    User.find({username: user}, function(err, data) {
      if (!err && data[0]) {
        res.json(data);
      } else {
        res.status(404).json({error: 'No record found for ' + user});
      }
    });
  });

  /************************************************************
  /   Handle POST requests
  /************************************************************/

  router.post('/', function(req, res) {
    // Unsure that data exists && there is a username property
    // source: http://stackoverflow.com/questions/4994201/is-object-empty#answer-4994244
    if (Object.getOwnPropertyNames(req.body).length > 0 &&
        req.body.username) {
      var newUser = new User(req.body);
        newUser.save(function(err, newUser) {
          if (err) return console.error(err.errors);
          res.json(newUser);
        });
      } else {
        res.json({error: 'Input does not match schema',
          userSchema: {'username': 'String', 'email': 'String', 'age': 'Number'}
        });
      }
  });

  /************************************************************
  /   Handle PUT requests
  /************************************************************/

  router.put('/:id', function(req, res) {
    var user = req.params.id;

    User.update({username: user}, {$set: req.body}, {runValidators: true},
      function(err, updateMessageObj) {
      if (!err) {
        updateMessageObj.msg = 'Successfully created or updated username "' +
        user + '"" with ' + JSON.stringify(req.body);
        res.json(updateMessageObj);
      } else {
        res.status(404).json({err: err.toString(), error: 'Input does not match schema',
          userSchema: {'username': 'String', 'email': 'String', 'age': 'Number'}
        });
      }
    });
  });

  /************************************************************
  /   Handle DELETE requests
  /************************************************************/

  router.delete('/:id', function(req, res) {
    var user = req.params.id;
    User.remove({username: user}, function(err, data) {
      if (!err) {
        res.json({msg: 'username: "' + user + '" has been deleted or no ' +
          'longer exists'});
      } else {
        res.status(404).json({error: 'No record found for ' + user});
      }
    });
  });
};
