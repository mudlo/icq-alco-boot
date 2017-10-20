var request = require('request');
var uuid = require('uuid/v1');

module.exports = function (req, res, next) {
  var botPayload = {};
  console.log('send');

  send(botPayload, function (error, status, body) {
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
