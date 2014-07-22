GitHubStats.controller('UsersStatsCtrl', function UsersStatsCtrl($scope, users) {
    function groupBy(items, prop) {
        var grouped = {};
        items.forEach(function group(item) {
            grouped[item[prop]] = (grouped[item] || 0) + 1;
        });
        return grouped;
    }

    function prepareForChart(items, prop) {
        var grouped = groupBy(items, prop);
        return Object.keys(grouped).map(function convert(key) {
            return {
                c: [
                    {v: key},
                    {v: grouped[key]}
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
        'rows': prepareForChart(users, 'followers')
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
        'rows': prepareForChart(users, 'following')
    };
    $scope.userFollowing.type = 'BarChart';
    $scope.userFollowing.options = {
        'title': 'How many users are following the user'
    };

    $scope.userRepos = {};
    $scope.userRepos.data = {
        'cols': [
            {id: 'u', label: 'Username', type: 'string'},
            {id: 'f', label: 'Following', type: 'number'}
        ],
        'rows': prepareForChart(users, 'repos')
    };
    $scope.userRepos.type = 'BarChart';
    $scope.userRepos.options = {
        'title': 'How many repos has the user'
    };
});
