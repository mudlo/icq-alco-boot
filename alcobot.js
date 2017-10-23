var request = require('request');
var uuid = require('uuid/v1');
var querystring = require('querystring')

module.exports = function (req, res, next) {
  var botPayload = {};
  console.log('send');

  sendIM('таааак', next);
}

function sendIM(payload, next)
{
  return send('/im/sendIM', payload, function (error, status, body) {
    if (error) {
      return next(error);

    } else if (status !== 200) {
      // inform user that our Incoming WebHook failed
      return next(new Error('Incoming WebHook: ' + status + ' ' + body));
    } else {
      return res.status(200).end();
    }
  });
}

function send(method, payload, callback) {
  var uid = process.env.BOT_UID;
  var sid = process.env.BOT_SID;
  var to = process.env.TO_UID;
  var url = process.env.BOT_API_URL;

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

