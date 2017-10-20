var request = require('request');
var uuid = require('uuid/v1');

module.exports = function (req, res, next) {
  var botPayload = {};
}

function send (payload, callback) {
  var uid = process.env.UID;
  var sid = process.env.SID;
  var to = process.env.TO;
 
  request({
    uri: 'https://botapi.icq.net/im/sendIM' +
         '?aimsid=' + sid +
         '&t=' + to +
         '&r=' + uuid() +
         '&message=kryjoopyl',
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}
