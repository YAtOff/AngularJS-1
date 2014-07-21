// Define the github.stats module and export is as the global GitHubStats
(function (window, angular) {
    var GitHubStats = angular.module('github.stats',
                                     ['ngRoute', 'utils', 'ngGrid', 'googlechart']);

    GitHubStats.constant('GITHUB_API', 'https://api.github.com');
    GitHubStats.config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html', 
            controller: 'HomeCtrl'
        })
        .when('/users/:username', {
            templateurl: 'partials/user.html', 
            controller: 'UserCtrl',
            resolve: {
                user: function (User, $route) {
                    return User.get($route.current.params.username);
                }
            }
        })
        .when('/repos/:username', {
            templateurl: 'partials/user-repos.html', 
            controller: 'UserReposCtrl',
            resolve: {
                user: function (User, $route) {
                    return User.get($route.current.params.username);
                },
                repos: function (user) {
                    return user.repos;
                },
            }
        })
        .when('/repos/:username/:repository', {
            templateurl: 'partials/repo.html', 
            controller: 'RepoCtrl',
            resolve: {
                user: function (User, $route) {
                    return User.get($route.current.params.username);
                },
                repo: function (Repo, $route) {
                    return Repo.get($route.current.params.username,
                                   $route.current.params.repository);
                }
            }
        })
        .when('/stats/users', {
            templateurl: 'partials/users-stats.html', 
            controller: 'UsersStatsCtrl',
            resolve: {
                users: function (User) {
                    return User.all();
                }
            }
        })
        .when('/stats/users/:username', {
            templateurl: 'partials/users-repo-stats.html', 
            controller: 'UserRepoStatsCtrl',
            resolve: {
                repos: function (Repo, $route) {
                    return Repo.getAllForUser($route.current.params.username);
                }
            }
        })
        .otherwise({redirectTo: '/home'});
    });

    GitHubStats.config(function($httpProvider) {
        $httpProvider.interceptors.push({
            request: function (config) {
                config.url = config.url + '?client_id=8f3b8d572129632cf422&client_secret=f0669941c23378c30fb89f6c37be9075a5628bba';
                return config;
            }
        });
    });

    window.GitHubStats = GitHubStats;
}(window, angular));
