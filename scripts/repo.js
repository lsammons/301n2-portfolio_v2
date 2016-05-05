(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // Fetch repos -- with callback / success
    $.ajax({
      url: 'https://api.github.com/user/repos',
      type: 'GET',
      headers: {
        'Authorization': authToken,
      },
      success: function(data, message, xhr) {
        repos.all = data;
        callback();
      },
    });
  };

  // Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero
  // `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      console.log('repo attr' + repo[attr]);
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
