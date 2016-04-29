var projectView = {};

projectView.populateFilter = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

projectView.handleCategoryFilter = function() {
  // $('article').show();
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      // grab the option "value", which is the category name
      var targetCategory = $(this).val();
      $('article').hide();

      $('article').each(function() {
        var name = $(this).attr('data-category');
        if (name === targetCategory) {
          $(this).show();
        };
      });

    } else {
      $('article').show();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

projectView.handleMainNav = function() {
  $('.main-nav').on('click','li.tab', function(){
    $('.tab-content').hide();
    $('#'+ $(this).data('content')).show();
  });

  $('.main-nav .tab:first').click();
};

projectView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('#projects').on('click',function(ev){
    var $evTarget = $(ev.target);
    ev.preventDefault();

    if($evTarget.hasClass('read-on')){
      $evTarget.prev().children().show();
      $evTarget.hide();
    }
  });
};

$(document).ready(function() {
  projectView.populateFilter();
  projectView.handleCategoryFilter();
  projectView.handleMainNav();
  projectView.setTeasers();
});
