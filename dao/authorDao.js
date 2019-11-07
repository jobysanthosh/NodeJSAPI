var db = require('./db');

//define a module by module.export or export.getAllAuthors
exports.getAllAuthors = function(cb){
    db.query('select * from library.tbl_author', function(err, result) {
        cb(err, result);
      });
};

exports.deleteAuthor = function(authorId, cb){
  db.beginTransaction(function(err){
    if(err) cb(err, null);

    db.query('delete from library.tbl_author where authorId = ?', [authorId], function(err, res){
      if(err){
        db.rollback(function(err, res){
          cb(err, res);
        });
      } 
      db.commit(function(err, res){
        cb(err, res);
      });
    });
  });
}

  exports.addAuthor = function(author, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
        db.query('INSERT INTO library.tbl_author(authorId, authorName) VALUES(?,?)', [author.authorId,author.authorName], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
};

exports.updateAuthor = function(author, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);

      db.query('update library.tbl_author set authorName=? where authorId=?', [author.authorName, author.authorId], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
};

