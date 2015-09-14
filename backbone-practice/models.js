var UserModel = Backbone.Model.extend({
	defaults: {
		username:'',
		creations:[],
		assignments:[]
	}
})

var IssueModel = Backbone.Model.extend({
	defaults: {
		title:'',
		description:'',
		creator:'',
		assignee:'',
		status:'unassigned',
		//actions:[]
	},
	update: function(status,username) {
		if (status==='unassigned')
			username = '';
		this.set({
			status:status,
			assignee:username
		});
	}
})

var ActionModel = Backbone.Model.extend({
	defaults: {
		issueCID:undefined,
		status:'',
		time: function() {
			return new Date();
		}
	}
})

var UserCollection = Backbone.Collection.extend({
	model:UserModel
})

var IssueCollection = Backbone.Collection.extend({
	model:IssueModel
})

var ActionCollection = Backbone.Collection.extend({
	action:ActionModel
})