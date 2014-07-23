GitHubStats.controller('UserReposCtrl', function UserReposCtrl($location, $scope, repos, user) {
    $scope.repos = repos;
    $scope.user = user;

    $scope.gridOptions = {
        data: 'repos',
        columnDefs: [
            {field: 'name', displayName: 'Name'},
            {field: 'starsCount', displayName: 'Stars'},
            {field: 'createdAt', displayName: 'Create at'}
        ],
        beforeSelectionChange: function onBeforeSelectionChange(row, ev) {
            $location.path($location.path() + '/' + row.entity.name);
        }
    };
});
