// Modularized code by wrapping the entire contents of file in an IIFE.
// Pass in to the IIFE a module, upon which objects can be attached for later access.
// the constructor function, with list of projects appended directly to the function as object.
(function(module) {
  function Project (opts) {
    this.client = opts.client;
    this.clientUrl = opts.clientUrl;
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
    this.creatives = opts.creatives;
  }

  // Tracking list of all projects directly on the constructor function.
  Project.all = [];

  // Prototype only touches one instance of an object
  Project.prototype.toHtml = function() {
    var template = Handlebars.compile($('#rawData-template').text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? '- created ' + this.daysAgo + ' days ago' : '(comp/spec)';
    this.creativeTeam = this.creatives;
    //this.body = marked(this.body); // for marked.js
    return template(this);
  };

  Project.prototype.toHtml2 = function() {
    var template2 = Handlebars.compile($('#rawData-template2').text());
    this.projectTitle = this.title;
    this.theClient - this.client;
    return template2(this);
  };

  // This function takes the JSON rawData, how ever it is provided (local or remote),
  // and use it to instantiate all the projects.
  Project.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });
    rawData.forEach(function(ele) {
      Project.all.push(new Project(ele));
    });
  };

  // This function will retrieve the data from either a local or remote source,
  // and process it, then hand off control to the View.
  Project.fetchAll = function() {
    if (localStorage.rawData) {
      Project.loadAll(
        JSON.parse(localStorage.rawData)
      );
      projectView.initIndexPage();
    } else {
      $.getJSON('../data/webProjects.json', function( data ) {
        localStorage.rawData = JSON.stringify(data);
        Project.loadAll(
          JSON.parse(localStorage.rawData)
        );
        projectView.initIndexPage();
      });
    }
  };
  module.Project = Project;
})(window);
