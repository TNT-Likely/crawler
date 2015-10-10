var request = require('request')
var apiServer = process.argv.indexOf('remote') > -1 ? 'http://api.youths.cc' : 'http://127.0.0.1:3010'
var isUpdate = process.argv.indexOf('update') > -1 ? true : false
exports.writeQuestion = function(obj) {
    var postUrl = apiServer + '/api/zhihus';
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
    var postUrl = apiServer + '/api/zhihuusers';
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
    var postUrl = apiServer + '/api/zhihutopics';
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

exports.getUser = function() {
    var postUrl = apiServer + '/api/zhihuusers?filter[fields][home]=true';
    return request.get({
        url: postUrl
    }, function(error, response, body) {
        if (error) {
            console.error(error)
        }
        if (!error && response.statusCode == 200) {
            console.info('get User success!')
            data = body
        }
    })
}

exports.getAvatar = function(callback) {
    var postUrl = apiServer + '/api/zhihuusers?filter[fields][avatar]=true&filter[order]=agree%20DESC';
    request.get({
        url: postUrl
    }, callback)
}
