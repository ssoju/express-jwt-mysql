var utils = module.exports = {};

utils.jsonError = function (req, res) {
  res.status(500).json({success: false, message: 'error!!'});
};
