GitHubStats.directive('ghSpiner', function ($rootScope) {
    return {
        scope: {
            imgsrc: '@'
        },
        replace: true,
        template: '<img ng-src="{{imgsrc}}" class="loading-image" ng-show="loading">',
        link: function link(scope, element, attrs) {
            $rootScope.$on('$routeChangeSuccess', function onRouteChangeSuccess() {
                scope.loading = false;
            });
            $rootScope.$on('$routeChangeStart', function onRouteChangeStart() {
                scope.loading = true;
            });
            $rootScope.$on('$routeChangeError', function onRouteChangeError() {
                scope.loading = false;
            });
        }
    };
});
