'use strict';
require('../../app/js/client.js');
require('angular-mocks');

describe('Users controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('usersApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var userController = $ControllerConstructor('userController', {$scope: $scope});
    expect(typeof userController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
    expect(Array.isArray($scope.users)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('userController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll is called', function() {
      $httpBackend.expectGET('/api/users').respond(200, [{username: 'testy',
        email: 'test@email.com', _id: 1}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.users.length).toBe(1);
      expect($scope.users[0].email).toBe('test@email.com');
      expect($scope.users[0]._id).toBe(1);
    });

    it('should make a post request when create is called', function() {
      var testUser = {username: 'testy', email: 'test@email.com'};
      $scope.newUser = testUser;
      expect($scope.users.length).toBe(0);
      $httpBackend.expectPOST('/api/users', testUser).respond(200, {username:
        'testy', email: 'test@email.com'});
      $scope.create({username: 'testy', email: 'test@email.com'});
      $httpBackend.flush();
      expect($scope.users.length).toBe(1);
      expect($scope.users[0].email).toBe('test@email.com');
    });

    it('should make a put request when update is called', function() {
      var user = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/users/1', user).respond(200);
      $scope.update(user);
      $httpBackend.flush();
      expect(user.editing).toBe(false);
    });

    it('should make a delete request when destroy is called', function() {
      var user = {_id: 1, username: 'testy', email: 'test@email.com'};
      $scope.users = [{username: 'tester2', email: 'some@email.com', _id: 2},
        user, {username: 'tester3', email: 'another@email.com', _id: 3}];
      $httpBackend.expectDELETE('/api/users/1').respond(200);
      $scope.destroy(user);
      $httpBackend.flush();
      expect($scope.users.length).toBe(2);
      expect($scope.users.indexOf(user)).toBe(-1);
      expect($scope.users[0].email).toBe('some@email.com');
      expect($scope.users[1].email).toBe('another@email.com');
    });
  });
});


