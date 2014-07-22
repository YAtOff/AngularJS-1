GitHubStats.factory('Repo', function RepoFactory(GITHUB_API, CachableModel) {

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
        });
    };

    Repo.get = function get(username, reponame) {
        return CachableModel.get({
            url: GITHUB_API +  '/users/{{username}}/repos/{{reponame}}',
            context:  {
                username: username,
                reponame: reponame
            },
            isArray: false,
            constructor: Repo
        });
    };
    return Repo;
});

