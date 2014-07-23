GitHubStats.factory('Repo', function RepoFactory($rootScope, GITHUB_API, CachableModel) {

    function Repo(config) {
        this.name = config.name;
        this.createdAt = config.created_at;
        this.forksCount = config.forks_count;
        this.language = config.language;
        this.starsCount = config.stargazers_count;
        this.url = config.url;
        this.fork = config.fork;
        this.htmlUrl = config.html_url;
    }

    Repo.getAllForUser = function getAllForUser(username) {
        return CachableModel.get({
            url: GITHUB_API +  '/users/{{username}}/repos',
            context:  {username: username },
            isArray: true,
            constructor: Repo
        }).then(function (res) {
            $rootScope.$broadcast('alert', {
                text: 'Some repos maight be missing',
                type: 'warning'
            });
            return res;
        });
    };

    Repo.get = function get(username, reponame) {
        return Repo.getAllForUser(username).then(function (repos) {
            return repos.filter(function (repo) {
                return repo.name === reponame;
            })[0];
        });
    };
    return Repo;
});

