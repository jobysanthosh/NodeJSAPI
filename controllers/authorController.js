var routes = require('express').Router(); //require is the same as import because we need express modules to develop the cb's
var db = require('../dao/db');
var authorDao = require('../dao/authorDao');

//every call needs a request and response; error goes first in convention for cb's
routes.get('/author',function(req,res){
    authorDao.getAllAuthors(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/author', function(req, res){
  var author = req.body;
  authorDao.addAuthor(author, function(err, result){
    if(err){
      res.status(400);
      res.send('Add author Failed!');
    }
    res.status(201);
    res.send('Added Author Successfully!');
  });

});

routes.put('/author/:id', function(req, res){
  var author = req.body;
  author.authorId=req.params.id;
  authorDao.updateAuthor(author, function(err, result){
    if(err){
      res.status(400);
      res.send('Update Author Failed!');
    }
    res.status(201);
    res.send('update Author Successful!');
  });

});

routes.delete('/author/:id',function(req,res){
  authorDao.deleteAuthor(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Deleting Author Failed!');
    }
    res.send('Deleted Author Successfully!');
  });
});



//this changes to a module to be used for import and code reusability
module.exports = routes;
