function useMustacheTemplates() {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,
        evaluate:    /\{\[(.+?)\]\}/g
    };
}
useMustacheTemplates();


var statusValues =   ['unassigned','assigned','in progress','done'];

function makeOption(opt) {
	return '<option>'+opt+'</option>'
};
function makeOptions() {
	return statusValues.reduce(function(all,next){
		return all+makeOption(next);
	},'');
}
function normalizeStatus(status) {
	return status.replace(/ /g,'');
}
//var lastView = null;

var IssueView = Backbone.View.extend({
	tagName: 'li',
	className: 'issue',
	template: _.template(
		 '<div><span class="issueTitle">{{title}}</span><span class="issueCreator"><em>Creator: </em>{{creator}}</span></div>'
		+'<div>{{description}}</div>'
		+'<select class="issueStatus" value="{{status}}">'+makeOptions()+'</select>'
		+'{[if (assignee)]}<span class="issueAssignee"><em>Assigned to: </em>{{assignee}}</span>'
	),
	events: {
		'change .issueStatus': 'changeStatus'
	},
	//status_template: _.template('')
	initialize: function(opts) {
		this.user = opts.user;
		//this.listenTo(this.model,'change',this.render);
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		$('select',this.$el).val(this.model.get('status'));// shouldn't be needed, but...
		//lastView = this;
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

var UserView = Backbone.View.extend({
	//el:'#app',
	className:'userView', 
	header_template: _.template(
		'<div class="userHeader">Welcome, <span class="username">{{username}}</span>!<button id="logout">Log Out</button></div>'
	),
	unassigned_template: _.template(
		 '<div class="issuePanel">All Unassigned Issues:'
		+'<ul class="issueList unassigned"></ul>'
		+'<button class="createIssue">Create Issue</button></div>'
	),
	myjobs_template: _.template(
		'<div class="issuePanel">My Issues:'
		+'<ul class="issueList mine"></ul></div>'
	),
	events: {
		'click .createIssue': 'addIssue',
		'click #logout': 'logout'
	},
	initialize: function() {
		//this.$el.addClass('userView');
		this.listenTo(this.collection,'add',this.redraw);
		this.listenTo(this.collection,'change',this.redraw);
		this.redraw();
		this.$el.appendTo('#app');
	},
	redraw: function() {
		//console.log('redrawing...');
		var username = this.model.get('username');
		this.$el.html(this.header_template({username:username})
					 +this.unassigned_template()
					 +this.myjobs_template());
		var unassignedIssues = this.collection.where({status:'unassigned'}),
			myIssues = this.collection.models.filter(function(model){
				return model.get('assignee')===username
					|| model.get('creator')===username;
			});
		//console.log(myIssues);
		var $unassignedIssues = $('.unassigned.issueList',this.$el);
		$unassignedIssues.html('');
		unassignedIssues.forEach(function(model) {
			var subview = new IssueView({model:model, user:username});
			$unassignedIssues.append(subview.$el);
		});
		var $myIssues = $('.mine.issueList',this.$el);
		$myIssues.html('');
		myIssues.forEach(function(model) {
			var subview = new IssueView({model:model, user:username});
			$myIssues.append(subview.$el);
		});
	},
	addIssue: function() {
		new CreateIssueView({model:this.model, collection:this.collection})
	},
	logout: function() {
		new LoginView({collection:users});
		this.remove();
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


function makeUserOptions(coll) {
	var usernames = coll.pluck('username');
	usernames.unshift('select');
	return usernames.reduce(function(all,next){
		return all+makeOption(next);
	},'');
}

var LoginView = Backbone.View.extend({
	template: _.template(
		'Please log in by selecting your username:'
		+'<select id="userList" value="select">{{users}}</select>'
	),
	events: {
		'change #userList': 'login'
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({users:makeUserOptions(this.collection)}))
			.appendTo('#app');
	},
	login: function(evt) {
		var userModel = users.findWhere({username:evt.target.value});
		new UserView({collection:issues, model: userModel});
		this.remove();
	}
})