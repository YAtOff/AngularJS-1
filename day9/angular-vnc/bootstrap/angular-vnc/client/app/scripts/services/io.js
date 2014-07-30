'use strict';

/**
 * @ngdoc service
 * @name clientApp.Io
 * @description
 * # Io
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('Io', function () {
    // Service logic
    // ...


    // Public API here
    return {
      connect: function () {
        return io.connect.apply(io, arguments);
      }
    };
  });
