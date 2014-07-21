GitHubStats.factory('User',
    function (GITHUB_API, CachableModel, storage, $q, Repo) {
    'use strict';

    var usernamesList = storage.get('users') || [];

    function User(config) {
        this.username = config.login;
        this.avatarUrl = config.avatar_url;
        this.createdAt = config.created_at;
        this.followers = config.followers;
        this.following = config.following;
        this.publicReposCount = config.public_repos;
        this.type = config.type;
        this.htmlUrl = config.html_url;
        Object.defineProperty(this, 'repos', {
            get: function () {
                return Repo.getAllForUser(this.username);
            }
        });
    }

    User.get = function get(username) {
        return CachableModel.get({
            url: GITHUB_API +  '/users/{{username}}',
            context:  {username: username },
            isArray: false,
            constructor: User
        });
    };
    User.getUsernames = function getUsernames() {
        return usernamesList;
    };
    User.addUsername = function addUsername(username) {
        usernamesList.push(username);
        storage.put(usernamesList);
    };
    User.removeUsername = function removeUsername(username) {
        usernamesList = usernamesList.filter(function (un) {
            return un !== username;
        });
        storage.put(usernamesList);
    };
    User.all = function all() {
        return $q.all(usernamesList.map(function (un) {
            return User.get(un);
        }));
    };

    return User;
});
