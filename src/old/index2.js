var Crawler = require("crawler");
var url = require('url');
var domain = 'http://www.zhihu.com/';
var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function(error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        $('.question_link').each(function(index, a) {
            var toQueueUrl = $(a).attr('href');
            c.queue(toQueueUrl);
        });
    }
});

c.queue([{
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'http://www.zhihu.com/',
    jQuery: true,

    // The global callback won't be called
    callback: function(error, result) {
        console.log('result.body');
    }
}]);
