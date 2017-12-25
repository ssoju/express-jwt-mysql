var router = require('express').Router();
var config = require('../config');
var allowOnly = require('../services/routesHelper').allowOnly;

router.use(function (req, res, next) {
  console.log(req.originalUrl);
  next();
});

function authenticate(passport) {
  return function () {
    var result = passport.authenticate('jwt', {session: false}).apply(this, arguments);
    //console.log('1111!!!', arguments, result);
    return result;
  };
}

var APIRoutes = function (passport) {

  router.post('/signup', require('../controllers/authController').signUp);
  router.post('/signin', require('../controllers/authController').authenticateUser);

  // GET Routes.
  router.get('/profile',
    authenticate(passport),
    allowOnly(config.accessLevels.user, require('../controllers/userController').index)
  );
  router.get('/admin',
    authenticate(passport),
    allowOnly(config.accessLevels.admin, require('../controllers/adminController').index)
  );

  return router;
};

module.exports = APIRoutes;
