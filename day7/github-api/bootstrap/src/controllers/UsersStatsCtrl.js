GitHubStats.controller('UsersStatsCtrl', function UsersStatsCtrl($scope, users) {
    function prepareForChart(items, first, second) {
        return items.map(function (item) {
            return {
                c: [
                    {v: item[first]},
                    {v: item[second]}
                ]
            };
        });
    }

    $scope.userFollowers = {};
    $scope.userFollowers.data = {
        'cols': [
            {id: 'u', label: 'Username', type: 'string'},
            {id: 'f', label: 'Followers', type: 'number'}
        ],
        'rows': prepareForChart(users, 'username', 'followers')
    };
    $scope.userFollowers.type = 'BarChart';
    $scope.userFollowers.options = {
        'title': 'How many followers has the user'
    };

    $scope.userFollowing = {};
    $scope.userFollowing.data = {
        'cols': [
            {id: 'u', label: 'Username', type: 'string'},
            {id: 'f', label: 'Following', type: 'number'}
        ],
        'rows': prepareForChart(users, 'username', 'following')
    };
    $scope.userFollowing.type = 'BarChart';
    $scope.userFollowing.options = {
        'title': 'How many users are following the user'
    };

    $scope.userRepos = {};
    $scope.userRepos.data = {
        'cols': [
            {id: 'u', label: 'Username', type: 'string'},
            {id: 'f', label: 'Repos', type: 'number'}
        ],
        'rows': prepareForChart(users, 'username', 'publicReposCount')
    };
    $scope.userRepos.type = 'BarChart';
    $scope.userRepos.options = {
        'title': 'How many repos has the user'
    };
});
