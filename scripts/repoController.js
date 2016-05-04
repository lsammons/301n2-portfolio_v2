(function(module) {
  var repoController = {};

  repoController.index = function() {
    // hide other sections on index
    $('#github').show().siblings().hide();

    // Call a function to 'request' repo data.
    // Pass in a view function as a callback, so repos will render after the data is loaded.
    repos.requestRepos(repoView.index);
    // fade in the repo listings
    $('#github').fadeIn();
  };

  module.repoController = repoController;
})(window);
