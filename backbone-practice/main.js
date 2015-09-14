var users = new UserCollection([{username:'dan'},{username:'tom'},{username:'shackleton'}]);

var issues = new IssueCollection([
	{title:'test', description:'Do all the things', creator:'dan'},
	{title:'kat fud', description:'', creator:'shackleton'}
]);

//var dan = users.findWhere({username:'dan'});
var mainView = new LoginView({collection:users});
