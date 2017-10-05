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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/', function(req, res, next) {
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  res.send(formatted);
});

router.post('/user/:email/drive', function(req, res, next) {
  var query = "insert into trips (id, origin, dest, ride_time, space_for) values ($1, $2, $3, $4, $5)";
  var values = [req.params.email, req.body.origin, req.body.destination, req.body.time, req.body.spaces ]

  db.one(query, values).then(function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: error, query: query }));
  })
});

router.get('/riderlogin/:email', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var query = "select email from users where email = '" + req.params.email + "';";

  db.oneOrNone(query).then(function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: error, query: query }));
  })
});

router.get('/driverlogin/:email', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var query = "select email from users where license_plate is not null and email = '" + req.params.email + "';";

  db.oneOrNone(query).then(function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: error, query: query }));
  })
});

router.get('/user/:email/relevanttrips', function(req, res, next) {
  console.log(req.body)
  res.setHeader('Content-Type', 'application/json');
  var query = "select t.id, t.origin, t.dest, t.ride_time from trips t " +
  "where t.status = 'tentative' and t.id != '" + req.params.email + "' and " +
    "(select coalesce(sum(riders_so_far), 0) from " +
      "(select b.num_riders riders_so_far from bids b where b.d_id = t.id and b.d_origin = t.origin " +
      "and b.d_dest = t.dest and b.ride_time = t.ride_time and b.status = 'accepted') co_riders) + " + req.body.num_riders + " <= t.space_for " +
    "and (t.origin like '%" + req.body.origin + "%' or t.dest like '%" + req.body.dest + "%');";

  db.any(query).then(function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: error, query: query }));
  })
});

router.get('/user/:email/name', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var query = "select name from users where email = '" + req.params.email + "';";

  db.any(query).then(function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: error, query: query }));
  })
});

router.get('/user/:email/futuredrives', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var query = "select origin, dest, ride_time, space_for from trips where status = 'tentative' and id = '" + req.params.email + "';";

  db.any(query).then(function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: error, query: query }));
  })
});

router.get('/user/:email/drivehistory', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var query = "select t.origin, t.dest, t.ride_time, coalesce(sum(b.price), 0.00) earned from trips t left join bids b on " + 
  "t.id = b.d_id and t.origin = b.d_origin and t.dest = b.d_dest and t.ride_time = b.ride_time and b.status = 'completed' " +
  "where t.id = '" + req.params.email + "' and t.status = 'completed' " +
  "group by t.id, t.origin, t.dest, t.ride_time " +
  "order by t.ride_time desc";
  
  // var query = "select * from trips";
  db.any(query).then(function (data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: error, query: query }));
  })
});


module.exports = router;
