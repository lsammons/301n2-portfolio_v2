(function(module) {
  var repoView = {};

  // Private methods declared here live only within the scope of the wrapping IIFE.
  var ui = function() {
    // Best practice: Cache the DOM query if it's used more than once.
    var $github = $('#github');

    $github.find('ul').empty();
    $github.show().siblings().hide();
  };

  // Complile github handlebars template
  // Save the result in this `render` variable.
  var render = function(repo) {
    var template = Handlebars.compile($('#repo-template').text());
    //console.log('hello' + template(repo));
    return template(repo);
  };

  // If all the data is loaded, prep the UI and render the repos.
  repoView.index = function() {
    ui();

    // The jQuery `append` method lets us append an entire array of HTML elements at once,
    // Use FP .map method to transform  data-set into DOM nodes: (JSON array set to DOM nodes)
    $('#github ul').append(
      // added the `name` property here as initial filter property.
      // change it to see what is different:
      repos.with('name').map(render)
      // repos.with('name').map(function(a) {
      //   console.log(a);
      // });
    );
  };

  module.repoView = repoView;
})(window);
