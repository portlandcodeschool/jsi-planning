function useMustacheTemplates() {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,
        evaluate:    /\{\[(.+?)\]\}/g
    };
}
useMustacheTemplates();

var Router = (function(){

var statusValues =   ['unassigned','claimed','in progress','done'];

function makeOption(opt) {
	return '<option>'+opt+'</option>'
};
function makeUserOptions(coll) {
	var usernames = coll.pluck('username');
	usernames.unshift('');
	return usernames.reduce(function(all,next){
		return all+makeOption(next);
	},'');
}
function makeStatusOptions() {
	return statusValues.reduce(function(all,next){
		return all+makeOption(next);
	},'');
}
function normalizeStatus(status) {
	return status.replace(/ +/g,''); //omit spaces
}

var IssueView = Backbone.View.extend({
	tagName: 'li',
	className: 'issue',
	template: _.template(
		 '<div><span class="issueTitle">{{title}}</span><span class="issueCreator"><em>Creator: </em>{{creator}}</span></div>'
		+'<div>{{description}}</div>'
		+'<select class="issueStatus" value="{{status}}">'+makeStatusOptions()+'</select>'
		+'{[if (assignee)]}<span class="issueAssignee"><em>Assigned to: </em>{{assignee}}</span>'
	),
	events: {
		'change .issueStatus': 'changeStatus'
	},
	initialize: function(opts) {
		this.user = opts.user;
		//this.listenTo(this.model,'change',this.render); //not needed; all views will be remade
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('select',this.$el).val(this.model.get('status'));// shouldn't be needed, but...
		this.showStatus(this.model);
	},
	changeStatus: function(evt) {
		var status = evt.target.value,
			assignee = this.user;
		this.model.update(status,assignee);
	},
	showStatus: function(model,status) {
		var prev = model.previous('status') || '',
			curr = status || model.get('status');
		this.$el.removeClass(normalizeStatus(prev));
		this.$el.addClass(normalizeStatus(curr));
	}
})

var IssueListView = Backbone.View.extend({
	//className:'issueList',
	template: _.template(
		'<div class="issueList"><span class="issueListHeader">{{header}}</span>'+
		'<ul></ul>{{footer}}</div>'	
	),
	initialize: function(opts) {
		//console.log(this.el);
		this.username = this.model.get('username');
		this.listenTo(this.collection,'add',this.render);
		this.listenTo(this.collection,'change',this.render);
		this.render();
	},
	render: function() {
		var username  = this.model.get('username');
		this.$el.html(this.template(this.dataObj));
		var $ul = $("ul",this.$el);
		this.filterCollection().forEach(function(model){
			var subview = new IssueView({model:model, user:username});
			$ul.append(subview.$el);
		})
	}
})

var UnassignedIssuesView = IssueListView.extend({
	el:'#unassignedIssues',
	dataObj:{
		header:'Available Tasks:',
		footer:'<button id="createIssue">Create New Task</button>'
	},
	events: {
		'click #createIssue': 'createIssue'
	},
	filterCollection: function() {
		var username = this.username;
		return this.collection.where({status:'unassigned'});
	},
	createIssue: function() {
		new CreateIssueView({model:this.model, collection:this.collection})
	},
})

var UserIssuesView = IssueListView.extend({
	el:'#myIssues',
	dataObj:{
		header:'My Tasks:',
		footer:''
	},
	
	filterCollection: function() {
		var username = this.username;
		return this.collection.filter(function(model){
			return (model.get('creator')===username ||
					model.get('assignee')===username)
		})
	}
})

var UserView = Backbone.View.extend({
	className: 'userView',
	template: _.template(
		'<div class="userHeader">Welcome, <span class="username">{{username}}</span>!<button id="logout">Log Out</button></div>'+
		'<div id="unassignedIssues"></div>'+
		'<div id="myIssues"></div>'
	),
	events: {
		'click #logout': 'logout'
	},
	initialize: function() {
		//this.username = this.model.get('username');
		if (app.currentView)
			app.currentView.remove();
		this.$el.appendTo('#app');
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		var miniMe = _.pick(this,'model','collection');
		new UserIssuesView(miniMe);
		new UnassignedIssuesView(miniMe);
	},
	logout: function() {
		app.navigate('login',{trigger:true});
	}
})



var CreateIssueView = Backbone.View.extend({
	className:'newIssueForm',
	template: _.template(
		 '<div class="input"><label for="newTitle">Title</label><br><input type="text" id="newTitle" autofocus/></div>'
		+'<div class="input"><label for="newDesc">Description</label><br><textarea id="newDesc"></textarea></div>'
		+'<div class="createIssue"><button id="add">Create</button><button id="cancel">Cancel</button></div>'
	),
	events: {
		'click #add': 'create',
		'click #cancel': 'cancel'
	},
	initialize: function() {
		this.$el.appendTo(document.body);
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
	},
	create: function() {
		var title = $('#newTitle',this.$el).val(),
			desc = $('#newDesc',this.$el).val(),
			creator = this.model.get('username');
		if (title)
			this.collection.add({title:title,description:desc,creator:creator});
		this.remove();
	},
	cancel: function() {
		this.remove();
	}
})




var LoginView = Backbone.View.extend({
	template: _.template(
		'Please log in by selecting your name: '+
		'<select id="userList" value="select">{{users}}</select>'+
		'<br>or register a new name:<br>'+
		'<input type="text" id="registerName">'+
		'<button id="registerBtn">Register</button>'+
		'<br>{{message}}'
	),
	events: {
		'change #userList': 'login',
		'click #registerBtn': 'register'
	},
	initialize: function() {
		if (app.currentView)
			app.currentView.remove();
		this.render();
	},
	render: function(msg) {
		this.$el.html(this.template({
			users:makeUserOptions(this.collection),
			message:(msg || '')
		})).appendTo('#app');
	},
	login: function(evt) {
		//var userModel = users.findWhere({username:evt.target.value});
		//new UserView({collection:issues, model: userModel});
		//this.remove();
		//app.navigate("users/"+evt.target.value,{trigger:true});
		app.showUser(evt.target.value);
	},
	register: function() {
		var name = $('#registerName').val();
		if (name) {
			var found = this.collection.findWhere({username:name});
			if (!found) {
				this.collection.add({username:name});
				app.showUser(name);
			} else {
				this.render('That username already exists!');
			}
		}
	}
})

var Router = Backbone.Router.extend({
	routes: {
		'': 'login',
		'login':'login',
		'users/:name': 'showUser'
	},
	initialize: function(opts) {
		this.currentView = null;
		this.users = opts.users;
		this.issues= opts.issues;
	},
	login: function() {
		app.navigate('login');
		this.currentView = new LoginView({collection:this.users});
	},
	showUser: function(name) {
		//console.log('showUser')
		app.navigate("users/"+name);
		var userModel = this.users.findWhere({username:name});
		this.currentView = new UserView({collection:this.issues, model:userModel});
	}
})

return Router;
}())