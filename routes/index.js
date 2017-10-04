var express = require('express');
var router = express.Router();



// const initOptions = {
//     connect: (client, dc, isFresh) => {
//         const cp = client.connectionParameters;
//         console.log('Connected to database:', cp.database);
//     } 
// };
var pg = require("pg");
var connectionString = "postgres://postgres:kkbbcute@localhost:5432/postgres";
// var pgp = require('pg-promise')(initOptions)
// var db = pgp('postgres://postgres:kkbbcute@localhost:5432/Project1')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/:id/', function(req, res, next) {
  res.send('Hi id, here you links' + req.params.abd);
});

router.get('/dbtest/', function(req, res, next) {
  console.log("DOING STUFF")

  pg.connect(connectionString,function(err,client,done) {
     if(err){
         console.log("not able to get connection "+ err);
         res.status(400).send(err);
     } 
     client.query('SELECT * FROM book', [] ,function(err,result) {
         done(); // closing the connection;
         if(err){
             console.log(err);
             res.status(400).send(err);
         }
         res.status(200).send(result.rows);
     });
  });

  // db.one('SELECT * from book')
  // .then(function (data) {
  //   console.log('DATA:', data)

  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(JSON.stringify({ a: 1 }));
  // })
  // .catch(function (error) {
  //   console.log('ERROR:', error)

  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(JSON.stringify({ a: 1 }));
  // })
  // res.setHeader('Content-Type', 'application/json');
  //   res.send(JSON.stringify({ a: 1 }));
   




  
});

module.exports = router;
