'use strict';

require('angular/angular');
require('./services/services');
require('./directives/directives');

var usersApp = angular.module('usersApp', ['services', 'directives']);

require('./users/users')(usersApp);
