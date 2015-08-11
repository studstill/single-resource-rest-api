'use strict';

module.exports = function(app) {
  // We're not using the .service method because it's "crazy".
  // .factory works the way that you expect it to, .service does not
  // Check the docs.angularjs.org/guide/services
  app.factory('RESTResource', ['$http', function($http) {
    var handleError = function(callback) {
      return function(res) {
        // If we get an error from our $http connection:
        console.log(res.data);
        callback(res.data);
      };
    };

    var handleSuccess = function(callback) {
      return function(res) {
        // First argument is null because err will be null in a success
        callback(null, res.data);
      };
    };

    return function(resourceName) {
      var handleRequest = function(method, data, callback) {
        var url = '/api/' + resourceName;
        if (data && data._id) url += '/' + data._id;
        $http({
          method: method,
          url: url,
          data: data
        })
          .then(handleSuccess(callback), handleError(callback));
      };

      return {
        getAll: function(callback) {
          handleRequest('GET', null, callback);
        },

        save: function(data, callback) {
          handleRequest('POST', data, callback);
        },

        update: function(data, callback) {
          handleRequest('PUT', data, callback);
        },

        destroy: function(data, callback) {
          handleRequest('DELETE', data, callback);
        }
      }
    };
  }]);
};
