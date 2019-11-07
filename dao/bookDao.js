var db = require('./db');

exports.getAllBooks = function(cb){
    db.query('select * from library.tbl_book', function(err, result) {
        cb(err, result);
      });
};

exports.addBook = function(book, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
        db.query('INSERT INTO library.tbl_book(bookId, title, authId, pubId) VALUES(?,?,?,?)', [book.bookId,book.title, book.authId, book.pubId], function(err, res){
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

exports.removeBook = function(bookId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from library.tbl_book where bookId = ?', [bookId], function(err, res){
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

  exports.updateBook = function(book, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
      
          db.query('update library.tbl_book set title = ?, authId = ?, pubId = ? where bookId = ?', [book.title, book.authId, book.pubId,book.bookId], function(err, res){
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
  
