'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $location, VNCClient) {
    $scope.host = {
      proxyUrl: 'http://localhost:8090'
    };

    $scope.login = function login() {
      if ($scope.loginForm.$valid) {
        VNCClient.connect($scope.host).then(function () {
          debugger
          $location.path('/vnc');
        });
      } else {
        $scope.loginForm.$dirty = true;
        $scope.errorMessage = "Connection timeout. Please, try again.";
      }
    };
  });
