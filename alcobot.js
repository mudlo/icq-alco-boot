var request = require('request');

module.exports = function (req, res, next) {
  console.log(req);
  console.log(res);
  console.log(next);
}
