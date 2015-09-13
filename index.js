var request = require('request'),
    cheerio = require('cheerio'),
    async = require('async'),
    seen = {};

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
        console.log(url);
        var $ = cheerio.load(body);
        queue.push($('.question_link').map(function(i, e) {
            console.log($(e).attr('href') + "," + $(e).text())
            return $(e).attr('href');
        }));
        console.log(queue.length())
        next();
    });
}, 2);

queue.drain = function() {
    console.log('all items have been processed');
}

queue.push('http://www.zhihu.com');
