var users = new UserCollection([
	{id:0, username:'Dan'},
	{id:1, username:'Tom'},
	{id:2, username:'Shackleton'}
]);

var issues = new IssueCollection([
	{id:0, title:'Do some work', description:'Finish all the things', creator:'Dan'},
	{id:1, title:'go kat fud stor', description:'', creator:'Shackleton'},
	{id:2, title:'ticl dog', description:'deserv itt', creator:'Shackleton', status:'claimed', assignee:'Shackleton'}
]);

var app;
function go() {
	app = new Router({users:users, issues:issues});
	Backbone.history.start();
}
$(go);
