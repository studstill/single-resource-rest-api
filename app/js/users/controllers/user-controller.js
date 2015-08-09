'use strict';

// We just use the generic app to make it more portable/usable
module.exports = function(app) {
  app.controller('userController', ['$scope', '$http', function($scope, $http) {
    // As a part of the initialization we set $scope.users to an empty array so
    // we can use array methods on it later if the http.get method comes back
    // with an array.
    $scope.users = [];
    $scope.errors = [];

    // We wrap it so we can control when we call it, and more specifially, we
    // put it in a function so we can put it in an ng-init tag on the
    // controller, and there will be times when we want to do a full getAll
    // from the database.
    $scope.getAll = function() {
      // The $http library uses promises which are based on the q library
      $http.get('/api/users')
        // See what comes back in the response object here:
        // http://docs.angularjs.org/api/ng/service/$http
        .then(function(res) {
          //success
          $scope.users = res.data;
        }, function(res) {
          //error
          $scope.errors.push({msg: 'Could not retrive users from server'});
          console.log(res.data);
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
      // look up the post method in the angular $http docs
      $http.post('/api/users', user)
        .then(function(res) {
          $scope.users.push(res.data);
          // null is an object, it will set whatever was passed into this
          // function equal to null, so it will have a side-effect outside of
          // this scope
          user = null;
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.destroy = function(user) {
      $http.delete('/api/users/' + user._id)
        .then(function(res) {
          $scope.users.splice($scope.users.indexOf(user), 1);
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.update = function(user) {
      $http.put('/api/users/' + user._id, user)
        .then(function(res) {
          // We expliot mongoose/mongo by adding a field to the model that
          // won't actually be saved, so we can use it TEMPORARILY client-side
          user.editing = false;
        }, function(res) {
          user.editing = false;
        });
    };

  }]);
};
