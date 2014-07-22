GitHubStats.controller('HeaderCtrl', function HeaderCtrl($scope) {
    $scope.$on('$routeChangeSuccess', function onRouteChangeSuccess() {
        $scope.loading = true;
    });
    $scope.$on('$routeChangeStart', function onRouteChangeStart() {
        $scope.loading = false;
    });
    $scope.$on('$routeChangeError', function onRouteChangeError() {
        $scope.loading = false;
    });
});
