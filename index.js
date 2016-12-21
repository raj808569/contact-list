var express = require('express');
var app=express();

var mongojs=require('mongojs');
var db=mongojs('mongodb://root:root@ds141098.mlab.com:41098/contactlist',["contacts"]);
console.log('connected to db');
var bodyParser=require('body-parser');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
  db.contacts.find(function(err,docs){
    console.log(docs);
    res.json(docs);
  });
});
app.post('/contactlist',function(req,res){
  console.log(req.body);
  db.contacts.insert(req.body,function(err,doc){
    res.json(doc);
  });
});

app.delete('/contactlist/:id',function(req,res){
  var id=req.params.id;
  console.log(id);
  db.contacts.remove({_id:mongojs.ObjectId(id)},function(err,doc){
    if (err) throw err;
    res.json(doc);
  });
});

app.get('/contactlist/:id',function(req,res){
  var id=req.params.id;
  console.log(id);
  db.contacts.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
    console.log(doc);
    res.json(doc);
  });
});

app.put('/contactlist/:id',function(req,res){
  var id=req.params.id;
  db.contacts.findAndModify({query: {_id:mongojs.ObjectId(id)},
    update:{$set: {name:req.body.name,email:req.body.email,number:req.body.number}},
    new:true},function(err,doc){
      res.send(doc);
    });
});

app.listen(3000);
console.log('listening on port 3000');
