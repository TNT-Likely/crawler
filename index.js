var request = require('request'),
    cheerio = require('cheerio'),
    async = require('async'),
    _ = require('lodash-node'),
    seen = {},
    $ = {},
    domain = 'http://www.zhihu.com';

var queue = async.queue(function crawl(url, next) {
    if (!url || seen[url]) return next(null);

    request({
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: url
    }, function(err, response, body) {
        if (err) return next(err);

        seen[url] = true;
        console.log("queue:" + url);
        deal(cheerio.load(body))

        next()
    });
}, 10);


var deal = function($) {
    if (!$) return
    var question = '',
        topic = '',
        topId = '',
        topName = ''
    $('.question_link').map(function(i, e) {
        url = domain + $(e).attr('href')
        question = $(e).text();
        topic = ''
        queue.push(url);

    })
    $('.zm-item-tag').map(function(j, k) {
        topId = $(k).attr('data-topicid')
        topName = $(k).text()
            // console.log('话题Id:' + topId)
            // console.log('话题name:' + topName)
        writeTopic(topId, topName)
        topic = topic.concat(topId, "/")
    })
    $('.zm-item-answer').map(function(j, k) {
        count = $(k).find('.up .count').text()
        if (count.indexOf('K') > -1) {
            count = parseInt(count.split('K')[0]) * 1000
        } else if (count.indexOf('M') > -1) {
            count = parseInt(count.split('M')[0]) * 1000000
        } else {
            count = parseInt(count)
        }
        if (count > 1000) {
            var answer = $(k).find('.zm-editable-content').html()
            var userName = $(k).find('.zm-item-answer-author-wrap a').eq(1).text();
            var userDescribe = $(k).find('.zm-item-answer-author-wrap strong').eq(0).text();
            var userAvatar = $(k).find('.zm-item-answer-author-wrap a img').attr('src');
            var userHome = domain + $(k).find('.zm-item-answer-author-wrap a').eq(0).attr('href');
            var answerTime = $(k).find('.answer-date-link').text().split(' ')[1];
            var answerUrl = domain + $(k).find('.answer-date-link').attr('href');
            // console.log("题目:" + question)
            // console.log('答案:' + answer)
            // console.log('作者用户名:' + userName)
            // console.log('作者签名:' + userDescribe)
            // console.log('作者用头像:' + userAvatar)
            // console.log('作者用主页:' + userHome)
            // console.log('答案发布时间:' + answerTime)
            // console.log('答案url:' + answerUrl)
            // console.log('话题:' + topic)
            // console.log('赞同:' + count)
            write(question, answer, userName, userDescribe, userAvatar, userHome, answerTime, answerUrl, topic, count)
        }
    })
}

var write = function(question, answer, userName, userDescribe, userAvatar, userHome, answerTime, answerUrl, topic, count) {
    var postUrl = 'http://127.0.0.1:3010/api/zhihus';
    var obj = {
        question: question,
        answer: answer,
        userName: userName,
        userDescribe: userDescribe,
        userAvatar: userAvatar,
        userHome: userHome,
        answerTime: answerTime,
        answerUrl: answerUrl,
        topic: topic,
        count: count
    }

    request.post({
        json: true,
        url: postUrl,
        body: obj
    }, function(error, response, body) {
        if (error) {
            console.log(error)
        }
        if (!error && response.statusCode == 200) {
            console.log('success')
        }
    })
}

var writeTopic = function(topId, topName) {
    var postUrl = 'http://127.0.0.1:3010/api/zhihutopics';
    var obj = {
        id: topId,
        name: topName
    }

    request.post({
        json: true,
        url: postUrl,
        body: obj
    }, function(error, response, body) {
        if (error) {
            console.log(error)
        }
        if (!error && response.statusCode == 200) {
            console.log('success')
        }
    })
}

queue.drain = function() {
    console.log('all items have been processed');
}

queue.push('http://www.zhihu.com');
