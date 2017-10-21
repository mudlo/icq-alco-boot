var request = require('request');
var uuid = require('uuid/v1');
var querystring = require('querystring')

module.exports = function (req, res, next) {
  var botPayload = {};
  console.log('send');

  sendIM('таааак', function() { });
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

  console.log(url + method + '?' +
      querystring.stringify({
        'aimsid': sid,
        't': to,
        'r': uuid(),
        'message': payload
      }));
 
  request({
    uri: url + '?' +
      querystring.stringify({
        'aimsid': sid,
        't': to,
        'r': uuid(),
        'message': payload
      }),
    method: 'POST'
  }, function (error, response, body) {
    if (error) {
      console.log(error);
      console.log(response);
      console.log(body);
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}

