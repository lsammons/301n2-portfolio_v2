(function(module) {
  var contactController = {};

  contactController.index = function() {
    $('.tab-content').hide();
    $('#contact').fadeIn();
  };

  module.contactController = contactController;
})(window);
