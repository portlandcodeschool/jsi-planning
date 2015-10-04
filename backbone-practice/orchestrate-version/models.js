var UserModel = Backbone.Model.extend({
	defaults: {
		username:''
	}
})

var IssueModel = Backbone.Model.extend({
	defaults: {
		title:'',
		description:'',
		creator:'',
		assignee:'',
		status:'unassigned'
	},
	update: function(status,username) {
		if (status==='unassigned')
			username = '';
		this.set({
			status:status,
			assignee:username
		});
		this.save();
	},
	editableBy: function(username) {
		return (this.get('assignee') === username ||
				this.get('status') === 'unassigned');
	}
})

var UserCollection = Backbone.Collection.extend({
	url:'/users',
	model:UserModel
})

var IssueCollection = Backbone.Collection.extend({
	url:'/issues',
	model:IssueModel
})
