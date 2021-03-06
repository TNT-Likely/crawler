var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var deal = require('./deal.js')
var seen = {};

exports.question = async.queue(function crawl(url, next) {
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
        console.log("queue-question:" + url);
        deal.question(cheerio.load(body))

        next()
    });
}, 5);

exports.user = async.queue(function crawl(url, next) {
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
        console.log("queue-user:" + url);
        deal.user(cheerio.load(body))

        next()
    });
}, 5);


exports.topic = async.queue(function crawl(url, next) {
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
        console.log("queue-topic:" + url);
        deal.topic(cheerio.load(body))

        next()
    });
}, 5);

exports.avatar = async.queue(function crawl(url, next) {
    var newName = url.split('/')[2] + "-" + url.split('/')[3]
    request.get('http://api.youths.cc/api/containers/zhihuuser/files/' + newName, function(err, response, body) {
        if (JSON.parse(body).error || JSON.parse(body).size == 0) {
            console.log('yes');
            request.get('http://api.youths.cc/update?url=' + url, function(err, data) {

            })
        }
        next()
    })
}, 5);
