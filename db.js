var request = require('request');
exports.writeQuestion = function(obj) {
    var postUrl = 'http://127.0.0.1:3010/api/zhihus';
    request.post({
        json: true,
        url: postUrl,
        body: obj
    }, function(error, response, body) {
        if (error) {
            console.error(error)
        }
        if (!error && response.statusCode == 200) {
            console.info('success Question!')
        }
    })
}

exports.writeUser = function(obj) {
    var postUrl = 'http://127.0.0.1:3010/api/zhihuusers';
    request.post({
        json: true,
        url: postUrl,
        body: obj
    }, function(error, response, body) {
        if (error) {
            console.error(error)
        }
        if (!error && response.statusCode == 200) {
            console.info('success User!')
        }
    })
}

exports.writeTopic = function(obj) {
    var postUrl = 'http://127.0.0.1:3010/api/zhihutopics';
    request.post({
        json: true,
        url: postUrl,
        body: obj
    }, function(error, response, body) {
        if (error) {
            console.error(error)
        }
        if (!error && response.statusCode == 200) {
            console.info('success Topic!')
        }
    })
}
