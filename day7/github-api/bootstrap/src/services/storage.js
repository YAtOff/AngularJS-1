/* global utils */
(function (utils) {
    utils.provider('storage', function storage() {
        'use strict';
        var keyName = 'github-stats';
        this.setKey = function setKey(key) {
            keyName = key;
        };
        this.$get = function $get() {
            var data = JSON.parse(localStorage.getItem(keyName)) || {};
            return {
                put: function put(key, value) {
                    data[key] = value;
                    localStorage.setItem(keyName, JSON.stringify(data));
                },
                get: function get(key) {
                    return data[key];
                }
            };
        };
    });
}(utils));
