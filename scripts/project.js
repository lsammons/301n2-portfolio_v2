var projects = [];

function Project (opts) {
  // Use the js object passed in - opts - to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.attr('data-category', this.category);
  //Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.
  $newProject.find('h1').html(this.title);
  $newProject.find('address a').html(this.author);
  $newProject.find('section.article-body').html(this.body);
  $newProject.find('address a').attr('href', this.authorUrl);
  // Include the publication date as a 'title' attribute to show on hover:
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  // Display the date as a relative number of "days ago":
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newProject.append('<hr>');
  // DONE: This cloned article is no longer a template, so we should remove that class...
  // Remove Project.template so that this will show on page:
  $('#theTemplate').hide();
  // for some reason the last project through doesn't get class template removed?
  // DEBUG THIS
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
