var domain = 'http://www.zhihu.com';
var cheerio = require('cheerio');
var queue = require('./queue.js');
var db = require('./db.js');
exports.question = function($) {
    if (!$) return
    var obj = {}
    var objT = {}
    obj.question = '';
    obj.topic = '';
    $('.question_link').map(function(i, e) {
        url = domain + $(e).attr('href')
        obj.question = $(e).text();
        queue.question.push(url); //push question link
    })
    $('.zm-item-tag').map(function(j, k) {
        topId = $(k).attr('data-topicid')
        url = domain + "/topic/" + topId
        obj.topic = obj.topic.concat(topId, "/")
        queue.topic.push(url); //push topic link
    })
    $('.zm-item-answer').map(function(j, k) {
        obj.count = $(k).find('.up .count').text()
        if (obj.count.indexOf('K') > -1) {
            obj.count = parseInt(obj.count.split('K')[0]) * 1000
        } else if (obj.count.indexOf('M') > -1) {
            obj.count = parseInt(obj.count.split('M')[0]) * 1000000
        } else {
            obj.count = parseInt(obj.count)
        }
        if (obj.count > 1000) {
            obj.answer = $(k).find('.zm-editable-content').html()
            obj.userName = $(k).find('.zm-item-answer-author-wrap a').eq(1).text();
            obj.userDescribe = $(k).find('.zm-item-answer-author-wrap strong').eq(0).text();
            obj.userAvatar = $(k).find('.zm-item-answer-author-wrap a img').attr('src');
            obj.userHome = domain + $(k).find('.zm-item-answer-author-wrap a').eq(0).attr('href');
            obj.answerTime = $(k).find('.answer-date-link').text().split(' ')[1];
            obj.answerUrl = domain + $(k).find('.answer-date-link').attr('href');
            console.log(obj);
            db.writeQuestion(obj)
            queue.user.push(obj.userHome) //push user link
        }
    })
}

exports.user = function($) {
    var obj = {}
    obj.name = $('.title-section .name').text();
    obj.describe = $('.title-section .bio').text();
    obj.avatar = $('.zm-profile-header-avatar-container img').attr('src')
    obj.location = $('.info-wrap .location').text();
    obj.bussiness = $('.info-wrap .business').text();
    if ($('.info-wrap .gender').html() != null) {
        obj.sex = $('.info-wrap .gender').html().toString().indexOf('female') > -1 ? 0 : 1;
    }
    obj.home = domain + $('.profile-navbar a').eq(0).attr('href')
    obj.agree = $('.zm-profile-header-user-agree strong').eq(0).text()
    obj.thanks = $('.zm-profile-header-user-thanks strong').eq(0).text()
    obj.asks = $('.profile-navbar a').eq(1).find('.num').text()
    obj.answers = $('.profile-navbar a').eq(2).find('.num').text()
    obj.posts = $('.profile-navbar a').eq(3).find('.num').text()
    obj.collections = $('.profile-navbar a').eq(4).find('.num').text()
    obj.logs = $('.profile-navbar a').eq(5).find('.num').text()
    obj.focus = $('.zm-profile-side-following a strong').eq(0).text()
    obj.follow = $('.zm-profile-side-following a strong').eq(1).text()
    obj.focusTopics = $('.zm-profile-side-section-title strong').text().toString().split(' ')[0]
    obj.see = $('.zm-profile-side-section .zg-gray-normal strong').text()
    console.log(obj)
    db.writeUser(obj)
}

exports.topic = function($) {
    var obj = {}
    obj.thumb = $('.topic-avatar .zm-entry-head-avatar-link img').attr('src')
    obj.name = $('.topic-avatar .zm-entry-head-avatar-link img').attr('alt')
    obj.home = domain + $('.topic-avatar .zm-entry-head-avatar-link').attr('href')
    obj.topId = String($('.topic-avatar .zm-entry-head-avatar-link').attr('href')).split('/')[2]
    obj.describe = $('#zh-topic-desc .zm-editable-content').text()
    obj.follow = $('.zm-topic-side-followers-info strong').eq(0).text()
    console.info(obj)
    db.writeTopic(obj)
}
