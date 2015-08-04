'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

var notesController = notesApp.controller('notesController', ['$scope', function($scope) {
  $scope.username = 'Your Username';
  $scope.appName = 'Virtual Trapper Keeper';
  $scope.appDescription = 'This app saves notes for a specific username';
  $scope.greeting = 'hello world';
  $scope.saveNote = function() {
    alert('In the final version of this program, your note will saved to a ' +
    'database: \n\n' + '{"username":"' + $scope.username + '", "note":"' +
    $scope.appDescription + '"}');
  };

}]);
