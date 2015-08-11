'use strict';

// We just use the generic app to make it more portable/usable
module.exports = function(app) {
  app.controller('userController', ['$scope', 'RESTResource', function($scope, resource) {
    // As a part of the initialization we set $scope.users to an empty array so
    // we can use array methods on it later if the http.get method comes back
    // with an array.
    $scope.users = [];
    $scope.errors = [];
    var User = new resource('users');

    // We wrap it so we can control when we call it, and more specifially, we
    // put it in a function so we can put it in an ng-init tag on the
    // controller, and there will be times when we want to do a full getAll
    // from the database.
    $scope.getAll = function() {
      // The $http library uses promises which are based on the q library
      User.getAll(function(err, data) {
        // "Cleaner" way of doing an if/else block by doing an early return
        if (err) return $scope.errors.push({msg: 'error getting users'});
        $scope.users = data;
      });
    };

    $scope.edit = function(user) {
      // Here we are exploiting mongo by locally adding properties to our user
      // that aren't prescribed in our model, so these properties are never
      // actually saved to our database.  Still, we can manipulate our view by
      // by creating, accessing, and manipulating these properties on the user
      // object
      user.editing = true;
      user.oldEmail = user.email;
    };

    $scope.cancel = function(user) {
      user.editing = false;
      user.email = user.oldEmail;
    };

    // We are making this with a user object so we can use it in other places
    $scope.create = function(user) {
      // We set $scope.user to null here to reset the input field to empty
      // after a new user is submitted
      $scope.user = null;
      // We set $scope.user to null here to reset the input field to empty
      // after a new note is submitted
      User.save(user, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could note save note: ' + note.noteBody});
        $scope.users.push(data);
        user = null;
      });
    };

    $scope.destroy = function(user) {
      User.destroy(user, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not delete user: ' + user.username});
        $scope.users.splice($scope.users.indexOf(user), 1);
      });
    };

    $scope.update = function(user) {
      User.update(user, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not update user: ' + user.username});
        // We expliot mongoose/mongo by adding a field to the model that
        // won't actually be saved, so we can use it TEMPORARILY client-side
        user.editing = false;
      });
    };
  }]);
};
