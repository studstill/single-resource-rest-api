'use strict';

var bodyParser = require('body-parser');
var User = require('../models/user-model');

module.exports = function(router) {
  router.use(bodyParser.json());

/************************************************************
/   Handle GET requests
/************************************************************/

  // Handle Root URL GET request
  router.get('/users', function(req, res) {
    // Serve the entire users database
    User.find({}, function(err, data) {
      if (err)
        res.status(400).json({msg: 'Error finding data'});
      else
        res.json(data);
    });
  });

  // Handle ANY OTHER GET Request
  router.get('/users/:id', function(req, res) {
    var user = req.params.id;
    // Return document that matches username
    User.find({'_id': req.params.id}, function(err, data) {
      if (!err) {
        res.json(data);
      } else {
        res.status(500).json({msg: 'No record found for ' + user});
      }
    });
  });

  /************************************************************
  /   Handle POST requests
  /************************************************************/

  router.post('/users', function(req, res) {
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

  router.put('/users/:id', function(req, res) {
    var updatedUser = req.body;

    User.update({'_id': req.params.id}, updatedUser, {runValidators: true},
      function(err, updateMessageObj) {
      if (!err) {
        res.json({msg: 'Successfully updated user'});
      } else {
        res.status(500).json({msg: err.toString(), error: 'Input does not match schema',
          userSchema: {'username': 'String', 'email': 'String'}
        });
      }
    });
  });

  /************************************************************
  /   Handle DELETE requests
  /************************************************************/

  router.delete('/users/:id', function(req, res) {
    User.remove({'_id': req.params.id}, function(err, data) {
      if (!err) {
        res.json({msg: 'user has been deleted or no ' +
          'longer exists'});
      } else {
        res.status(500).json({msg: 'No record found for that user'});
      }
    });
  });
};
