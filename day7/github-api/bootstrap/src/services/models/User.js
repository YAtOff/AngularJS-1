GitHubStats.factory('User',
    function UserFactory(GITHUB_API, CachableModel, storage, $q, Repo) {
    'use strict';

    var usernamesList = storage.get('usernames') || [];

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
            get: function get() {
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
        storage.put('usernames', usernamesList);
    };
    User.removeUsername = function removeUsername(username) {
        usernamesList.splice(usernamesList.indexOf(username), 1);
        storage.put('usernames', usernamesList);
    };
    User.all = function all() {
        return $q.all(usernamesList.map(function convert(un) {
            return User.get(un);
        }));
    };

    return User;
});
