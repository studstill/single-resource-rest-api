'use strict';

module.exports = function(app) {
// Followed example code found here:
// http://www.ng-newsletter.com/posts/directives.html
  app.directive('weather', function() {
    return {
      restrict: 'A',
      templateUrl: './templates/weather.html',
      scope: {
        city: '=',
      },
      controller: ['$scope', '$http', function($scope, $http) {
        $scope.queriedCity = $scope.queriedCity || 'Seattle';
        $scope.city = $scope.city || 'Seattle';
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=7&callback=JSON_CALLBACK&q="

        $scope.getTemp = function(city) {
          $scope.queriedCity = $scope.city;
          $http({
            method: 'JSONP',
            url: url + $scope.city
          }).then(function(data) {
            $scope.highTemp = data.data.list[0].temp.max;
            $scope.lowTemp = data.data.list[0].temp.min;
            $scope.weather = data.data.list[0].weather[0].description;
          });
          $scope.city = null;
        };
      }],
      link: function(scope, iElement, iAttrs, ctrl) {
        scope.getTemp(iAttrs.city);
      }
    };
  });
};
