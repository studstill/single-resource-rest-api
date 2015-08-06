'use strict';

require('angular/angular');

var usersApp = angular.module('usersApp', []);

require('./users/users')(usersApp);

