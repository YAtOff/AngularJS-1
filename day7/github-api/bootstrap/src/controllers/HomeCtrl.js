GitHubStats.controller('HomeCtrl', function ($scope, User) {
    $scope.users = User.getUsernames();
    $scope.add = function add(username) {
        User.addUsername(username);
    };
    $scope.remove = function remove(username) {
        User.removeUsername(username);
    };
});
