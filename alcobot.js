var request = require('request');
var uuid = require('uuid/v1');

module.exports = function (req, res, next) {
  var botPayload = {};
  console.log('send');

  sendIM(req.body, function() { });
}


function sendIM(payload, callback)
{
  return send('/im/sendIM', payload, callback);
}

function send(method, payload, callback) {
  var uid = process.env.UID;
  var sid = process.env.SID;
  var to = process.env.TO;
  var url = process.env.URL;
 
  request({
    uri: url + method +
         '?aimsid=' + sid +
         '&t=' + to +
         '&r=' + uuid() +
         '&message=' + payload,
    method: 'POST'
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}
