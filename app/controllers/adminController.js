// The admin controller.
var AdminController = {
  index: function(req, res) {
    res.status(200).json({ message: 'Welcome to the admin area ' + req.user.email + '!' });
  }
};

module.exports = AdminController;
