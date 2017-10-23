var request = require('request');
var uuid = require('uuid/v1');
var querystring = require('querystring')

module.exports = function (req, res, next) {
  var botPayload = {};
  console.log('send');

  sendIM('таааак', res);
}

function sendIM(payload, res)
{
    send('/im/sendIM', payload, function (error, status, body) {
    if (error) {
      console.log(error);
    } else if (status !== 200) {
      // inform user that our Incoming WebHook failed
      console.log(new Error('Incoming WebHook: ' + status + ' ' + body));
    }
    return res.status(status).end();
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
    method: 'GET'
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

