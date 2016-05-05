(function(module) {
  var projectController = {};

  Project.fetchAll(projectView.initIndexPage);

  projectController.index = function() {
    $('.tab-content').hide();
    $('#projects').fadeIn();
  };

  module.projectController = projectController;
})(window);
