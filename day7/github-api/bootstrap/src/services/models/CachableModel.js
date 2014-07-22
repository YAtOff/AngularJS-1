GitHubStats.factory('CachableModel', function CachableModelFactory($interpolate, $cacheFactory, $q, req) {
    'use strict';

    var cache = {};

    function createObject(constructor, data) {
        var o = Object.create(constructor.prototype);
        constructor.call(o, data);
        return o;
    }

    function CachableModel() {
    }

    CachableModel.get = function get(config) {
        var cachedObject = cache[config.url],
            url = $interpolate(config.url)(config.context),
            data;
        if (!cachedObject) {
            cachedObject = $cacheFactory(config.url);
            cache[config.url] = cachedObject;
        }
        data = cachedObject.get(url);
        if (data) {
            return $q.when(data);
        } else {
            req.get(url).then(function success(res) {
                var result;
                if (config.isArray) {
                    result = res.data.map(function convert(d) {
                        return createObject(config.constructor, d);
                    });
                } else {
                    result = createObject(config.constructor, res.data);
                }
                cachedObject.put(url, result);
                return result;
            });
        }
    };

    return CachableModel;
});
