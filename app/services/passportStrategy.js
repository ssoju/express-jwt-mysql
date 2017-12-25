var JWTStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('./../models/user'),
  config = require('./../config');

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
  var options = {};

  options.secretOrKey = config.keys.secret;
  options.jwtFromRequest = ExtractJwt.fromAuthHeader();
  options.ignoreExpiration = false;

  passport.use(new JWTStrategy(options, function (JWTPayload, callback) {
    console.log('passport hook');
    User.findOne({
      where: {
        email: JWTPayload.email
      }
    }).then(function (user) {
      if (!user) {
        callback(Error('no user!!'), false);
        return;
      }

      console.log(callback.toString())
      callback(null, user);
    });
  }));
}

module.exports = hookJWTStrategy;
