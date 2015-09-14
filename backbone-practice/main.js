var users = new UserCollection([
	{username:'Dan'},
	{username:'Tom'},
	{username:'Shackleton'}
]);

var issues = new IssueCollection([
	{title:'Do some work', description:'Finish all the things', creator:'Dan'},
	{title:'go kat fud stor', description:'', creator:'Shackleton'}
]);

var app = new Router({users:users, issues:issues});
Backbone.history.start();