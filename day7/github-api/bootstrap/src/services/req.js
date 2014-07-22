/* global angular */
(function (window, angular) {
    var utils = angular.module('utils', []);
    utils.factory('req', function req($http, $rootScope) {
        return {
            get: function get(url, config) {
                return $http.get(url, config).then(function success(res) {
                    return res;
                }, function error(res) {
                    $rootScope.$broadcast('error', res.data.message);
                });
            }
        };
    });

    window.utils = utils;

}(window, angular));
