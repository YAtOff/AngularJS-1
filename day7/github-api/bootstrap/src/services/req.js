/* global angular */
(function (window, angular) {
    var utils = angular.module('utils', []);
    utils.factory('req', function req($http, $rootScope) {
        return {
            get: function get(url, config) {
                return $http.get(url, config).then(function success(res) {
                    return res;
                }, function error(res) {
                    $rootScope.$broadcast('alert', {
                        text: res.data.message,
                        type: 'error'
                    });
                });
            }
        };
    });

    window.utils = utils;

}(window, angular));
