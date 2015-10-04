var config = require('./config');
var orch = require('orchestrate');
var db = orch(config.dbkey);
var dbPrefix = config.prefix || '';

var database = {
	users:[
		{id:0, username:'Dan'},
		{id:1, username:'Tom'},
		{id:2, username:'Shackleton'}
	],
	issues:[
		{id:0, title:'Do some work', description:'Finish all the things', creator:'Dan'},
		{id:1, title:'go kat fud stor', description:'', creator:'Shackleton'},
		{id:2, title:'ticl dog', description:'deserv itt', creator:'Shackleton', status:'claimed', assignee:'Shackleton'}
	]
};

function resetCollection(collname) {
	if (!(collname in database)) {
		console.log('Unknown collection: '+dbPrefix+collname);
		return;
	}
	console.log("Resetting collection "+dbPrefix+collname);
	db.deleteCollection(dbPrefix+collname).then(function(){
		database[collname].forEach(function(obj) {
			// EITHER let Orchestrate assign ids:
			delete obj.id;
			db.post(dbPrefix+collname,obj)
			// OR use existing ids:
			//db.put(dbPrefix+collname,String(obj.id),obj)
				.then(function(result){
					console.log(obj,result.path);
				})
		})
	})
}

if (process.argv.length<3) {
	console.log("You must list the names of the collections to be reset");
}
process.argv.slice(2).forEach(resetCollection);
