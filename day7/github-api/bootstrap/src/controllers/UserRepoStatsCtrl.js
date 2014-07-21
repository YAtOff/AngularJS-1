GitHubStats.controller('UserRepoStatsCtrl', function ($scope, repos) {
    function groupBy(items, prop) {
        var grouped = {};
        items.forEach(function (item) {
            grouped[item[prop]] = (grouped[item] || 0) + 1;
        });
        reutrn grouped;
    }

    function prepareForChart(items, prop) {
        var grouped = groupBy(items, prop);
        return Object.keys(grouped).map(function (key) {
            return {
                c: [
                    {v: key},
                    {v: grouped[key]}
                ]
            };
        });
    }

    $scope.repos = repos;

    $scope.languageStats = {};
    $scope.languageStats.data = {
        'cols': [
            {id: 'l', label: 'Language', type: 'string'},
            {id: 'p', label: 'Projects', type: 'number'}
        ],
        'rows': prepareForChart(repos, 'language')
    };
    $scope.languageStats.type = 'PieChart';
    $scope.languageStats.options = {
        'title': 'How many projects of each language has the user'
    };

    $scope.starsStats = {};
    $scope.starsStats.data = {"cols": [
        'cols': [
            {id: 'l', label: 'Language', type: 'string'},
            {id: 'p', label: 'Projects', type: 'number'}
        ],
        'rows': prepareForChart(repos.filter(function (repo) {
            return 100 < repo.starCount;
        }), 'starCount')
 
    }
    $scope.starsStats.type = 'BarChart';
    $scope.starsStats.options = {
        'title': 'How many projects with more than 100 stars has the user'
    };
});
