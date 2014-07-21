GitHubStats.controller('UserReposCtrl', function ($location, $scope, repos, user) {
    $scope.repos = repos;
    $scope.user = user;

    $scope.gridOptions = {
        data: 'repos',
        columnDefs: [
            {field: 'name'},
            {field: 'starsCount'},
            {field: 'createdAt'}
        ],
        beforeSelectionChange: function (row, ev) {
            $location.path($location.path() + '/' + row.entity.name);
        }
    };
});
