var queue = require('./queue.js');
var db = require('./db.js');

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("get avatar success,total " + body.length);
        body = JSON.parse(body);
        for (i = 0; i < body.length; i++) {
            // console.log(body[i].avatar);
            queue.avatar.push(body[i].avatar)
        }
    }
}

db.getAvatar(callback)
