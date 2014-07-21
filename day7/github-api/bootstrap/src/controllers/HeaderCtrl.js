GitHubStats.controller('HeaderCtrl', function ($scope) {
    $scope.on('$routeChangeSuccess', function () {
        $scope.loading = true;
    });
    $scope.on('$routeChangeStart', function () {
        $scope.loading = false;
    });
    $scope.on('$routeChangeError', function () {
        $scope.loading = false;
    });
});
