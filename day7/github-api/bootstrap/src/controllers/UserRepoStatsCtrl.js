GitHubStats.controller('UserRepoStatsCtrl', function UserRepoStatsCtrl($scope, repos) {
    function groupBy(items, prop) {
        var grouped = {};
        items.forEach(function group(item) {
            grouped[item[prop]] = (grouped[item] || 0) + 1;
        });
        return grouped;
    }

    function prepareForPieChart(items, prop) {
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

    function prepareForBarChart(items, first, second) {
        return items.map(function (item) {
            return {
                c: [
                    {v: item[first]},
                    {v: item[second]}
                ]
            };
        });
    }

    $scope.languageStats = {};
    $scope.languageStats.data = {
        'cols': [
            {id: 'l', label: 'Language', type: 'string'},
            {id: 'p', label: 'Projects', type: 'number'}
        ],
        'rows': prepareForPieChart(repos, 'language')
    };
    $scope.languageStats.type = 'PieChart';
    $scope.languageStats.options = {
        'title': 'How many projects of each language has the user'
    };

    $scope.starsStats = {};
    $scope.starsStats.data = {
        'cols': [
            {id: 'l', label: 'Language', type: 'string'},
            {id: 'p', label: 'Projects', type: 'number'}
        ],
        'rows': prepareForBarChart(repos.filter(function condition(repo) {
            return 100 < repo.starsCount;
        }), 'name', 'starsCount')
 
    };
    $scope.starsStats.type = 'BarChart';
    $scope.starsStats.options = {
        'title': 'How many projects with more than 100 stars has the user'
    };
});
