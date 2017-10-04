var express = require('express');
var router = express.Router();



const initOptions = {
    connect: (client, dc, isFresh) => {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    } 
};

var connectionString = "postgres://postgres:kkbbcute@localhost:5432/tongpang";
var pgp = require('pg-promise')(initOptions)
var db = pgp(connectionString)


function getOneBook() {
  // This returns a promise object, you need to call .then to pass a callback
  // NOTE: .one MUST return ONLY 1 result, if not it will throw error
  return db.one('SELECT * from books LIMIT 1')
}

function getAllBooks() {
  // This returns a promise object, you need to call .then to pass a callback
  return db.any('SELECT * from books')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/:id/', function(req, res, next) {
  res.send('Hi id, here you links' + req.params.abd);
});

router.get('/dbtest/', function(req, res, next) {
  console.log("DOING STUFF")


  getAllBooks().then(function (data) {
    console.log('DATA:', data)
  
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: 'error' }));
  })





  
});

module.exports = router;
