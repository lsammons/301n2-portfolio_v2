// Configure routes for this app with page.js,
//  by registering each URL your app can handle,
// linked to a a single controller function to handle it:
page('/', aboutController.index);
page('/projects', projectController.index);
page('/contact', contactController.index);
page('/github', repoController.index);

// activate page.js
page();
