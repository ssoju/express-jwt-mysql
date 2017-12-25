var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  sequelize = require('sequelize'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  path = require('path');

var hookJWTStrategy = require('./services/passportStrategy');
var app = express();

// parse as urlencode and json
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// hook up the HTTP logger
app.use(morgan('dev'));

// hook up passport
app.use(passport.initialize());

// hook the passport jwt strategy
hookJWTStrategy(passport);

// set the static files location
app.use(express.static(__dirname + '/../public'));

// bundle api routes
var router = require('./routes/api')(passport);
app.use('/api', router);

// home route
app.get('*', function (req, res) {
  ///res.send('Nice meeting you.');
  res.sendFile(path.join(__dirname, '../public/app/views/index.html'));
});

// start the server
app.listen('8888', function () {
  console.log('Magic happens at http://localhost:8888/! We are all now doomed!');
});
