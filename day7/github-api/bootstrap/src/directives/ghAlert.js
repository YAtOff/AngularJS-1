GitHubStats.directive('ghAlert', function ($timeout, $rootScope) {
    return {
        scope: {
            timeout: '@'
        },
        replace: true,
        template: '<div class="alert" role="alert" ng-bind="message"></div>',
        link: function link(scope, element, attrs) {
            var alertClasses = {
                error: 'alert-danger',
                warning: 'alert-warning'
            };
            
            scope.$on('$routeChangeStart', function () {
                $(element).hide();
            });
            $rootScope.$on('alert', function (ev, message) {
                scope.message = message.text;
                $(element).addClass(alertClasses[message.type]).show();
                $timeout(function () {
                    $(element).removeClass(alertClasses[message.type]).hide();
                }, parseInt(scope.timeout) || 8000);
            });
        }
    };
});
