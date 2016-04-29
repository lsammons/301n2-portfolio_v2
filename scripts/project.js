// Empty array to hold all projects
var projects = [];
// Constructor function holding all properties options in 'this'
function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

// Project prototype function uses jQuery to fill template with properties
// from this particular Project instance.
Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.removeClass('template');
  $newProject.attr('data-category', this.category);
  // Use jQuery to fill in the template with properties
  // from this particular Project instance.
  $newProject.find('h1').html(this.title);
  $newProject.find('address a').html(this.author);
  $newProject.find('section.article-body').html(this.body);
  $newProject.find('address a').attr('href', this.authorUrl);
  // Include the publication date as a 'title' attribute to show on hover:
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  // Display the date as a relative number of "days ago":
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  return $newProject;
};

// Sorting projects, new to old
rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// Push each new project into array
rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

// Append each project to the #projects element in index.html
projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
