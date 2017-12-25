exports.allowOnly = function(accessLevel, callback) {
  function checkUserRole(req, res) {

    //console.log('access', accessLevel, 'role', req.user.role);

    if(!(accessLevel & req.user.role)) {
      res.sendStatus(403);
      return;
    }

    callback(req, res);
  }

  return checkUserRole;
};
