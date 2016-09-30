var express= require("express");
var bodyParser=require("body-parser");
var mongojs=require("mongojs");

var db=mongojs("clubinfo",["info"]);
var app  =express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/'));

app.get("/info",function(req,res){
	db.info.find(function(err,docs){
	
		res.json(docs);
		
	});
});
app.put("/info/:id",function(req,res){
	var id=req.params.id;
	console.log("inside put");
	
	db.info.update({'_id':mongojs.ObjectId(id)},{$set:{'name':req.body.name}},
			function(err,doc){
			res.json(doc);
		});
	
});
app.get("/info/:id",function(req,res){
	var id=req.params.id;
	console.log("/info/id");
	db.info.findOne({_id:mongojs.ObjectId(id)},function(err,doc)
	{
		res.json(doc);
	});
});

app.post('/info',function(req,res){
  var user_name=req.body;
  
  db.info.insert(user_name,function(err,doc){
		console.log("saved"+user_name);
		res.json(doc);
	});

});
app.delete("/info/:id",function(req,res){
	var id=req.params.id;
	db.info.remove({_id:mongojs.ObjectId(id)},
		function(err,doc)
		{
			res.json(doc);
		});
	console.log(id);
});
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})