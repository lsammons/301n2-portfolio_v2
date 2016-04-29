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

// prototype function using jQuery to fill in the template with properties
// from this particular Project instance.
Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.attr('data-category', this.category);
  //Use jQuery to fill in the template with properties
  // from this particular Project instance.
  $newProject.find('h1').html(this.title);
  $newProject.find('address a').html(this.author);
  $newProject.find('section.article-body').html(this.body);
  $newProject.find('address a').attr('href', this.authorUrl);
  // Include the publication date as a 'title' attribute to show on hover:
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  // Display the date as a relative number of "days ago":
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newProject.append('<hr>');
  // Cloned article is no longer a template, remove template class
  // so new  project will show on page:
  $('article').removeClass('template');
  return $newProject;
};

// Find how long ago, from today, this project was created.
rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// Push each new project into an array
rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

// Append each project to the #projects element in index.html
projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
