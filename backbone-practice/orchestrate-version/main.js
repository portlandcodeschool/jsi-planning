var users = new UserCollection();
users.fetch().then(gotUsers);

var issues = new IssueCollection();
issues.fetch();

var app;
function gotUsers() {
	app = new Router({users:users, issues:issues});
	Backbone.history.start();
}