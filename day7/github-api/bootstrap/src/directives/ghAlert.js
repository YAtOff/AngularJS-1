GitHubStats.directive('ghAlert', function ($timeout, $rootScope) {
    return {
        scope: true,
        replace: true,
        template: '<div class="alert alert-danger" role="alert" ng-bind="message"></div>',
        link: function link(scope, element, attrs) {
            scope.$on('$routeChangeStart', function () {
                angular.element(element).attr('ng-show', 'false');
            });
            $rootScope.$on('error', function (ev, data) {
                scope.message = data;
                angular.element(element).attr('ng-show', 'true');
                $timeout(function () {
                    angular.element(element).attr('ng-show', 'false');
                }, 4000);
            });
        }
    };
});
