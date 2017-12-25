var jwt = require('jsonwebtoken'),
  utils = require('../services/utils'),
  config = require('../config'),
  db = require('../services/database'),
  User = require('../models/user');

// The authentication controller.
var AuthController = module.exports = {};

// Register a user.
AuthController.signUp = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({message: 'Please provide a username and a password.'});
  } else {
    db.sync().then(function () {
      var newUser = {
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname
      };

      return User.create(newUser).then(function () {
        res.status(201).json({message: 'Account created!'});
      });
    }).catch(function (error) {
      console.log(error);
      //utils.jsonError(req, res, error);
      res.status(500).json({message: 'There was an error!'});
    });
  }
}

AuthController.authenticateUser = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(404).json({message: 'Username and password are needed!'});
  } else {
    var email = req.body.email,
      password = req.body.password;

    User.findOne({where: {email: email}}).then(function (user) {
      if (!user) {
        res.status(404).json({message: 'Authentication failed!'});
      } else {
        user.comparePasswords(password, function (error, isMatch) {
          if (isMatch && !error) {
            var token = jwt.sign(
              {email: user.email},
              config.keys.secret//,
              //{expiresIn: '30m'}
            );

            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(404).json({message: 'Login failed!'});
          }
        });
      }
    }).catch(function (error) {
      res.status(500).json({message: 'There was an error!'});
    });
  }
}

