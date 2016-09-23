var domain = 'http://www.zhihu.com';
var cheerio = require('cheerio');
var queue = require('./queue.js');
var db = require('./db.js');
var isDb = process.argv.indexOf('db') > -1 ? true : false

exports.question = function($) {
    if (!$) return
    var obj = {}
    obj.question = {
        name: $('#zh-question-title .zm-item-title').text(),
        detail: $('#zh-question-detail .zm-editable-content').html(),
        id: $('.question-page').attr('data-urltoken'),
        url: domain + '/question/' + $('.question-page').attr('data-urltoken'),
        aNum: $('.zh-answers-title h3').attr('data-num')
    };
    obj.topic = [];
    $('.question_link').map(function(i, e) {
        url = domain + $(e).attr('href')
        queue.question.push(url); //push question link
    })
    $('.zm-item-tag').map(function(j, k) {
        objT = {}
        objT.id = $(k).attr('data-token')
        objT.url = domain + '/topic/' + objT.id
        objT.name = $(k).text()
        obj.topic = obj.topic.concat(objT)
        url = domain + "/topic/" + objT.id
        queue.topic.push(url); //push topic link
    })
    $('.zm-item-answer').map(function(j, k) {
        url = domain + $(k).find('.zm-item-answer-author-wrap a').eq(0).attr('href');
        queue.user.push(url) //push user link
        obj.count = parseInt($(k).find('.zm-item-vote-info').attr('data-votecount'))
        if (obj.count > 1000) {
            obj.answer = $(k).find('.zm-editable-content').html()
            obj.user = {
                name: $(k).find('.zm-item-answer-author-info .author-link-line .author-link').text(),
                bio: $(k).find('.zm-item-answer-author-info .bio').text(),
                sAvatar: $(k).find('.zm-item-answer-author-info .zm-list-avatar.avatar').attr('src'),
                home: url
            }
            console.log("userinfo",obj.user)
            obj.answerTime = $(k).find('.answer-date-link').text().split(' ')[1];
            obj.answerUrl = domain + $(k).find('.answer-date-link').attr('href');
            console.log(obj);
            if (isDb) db.writeQuestion(obj)
        }
    })
}

exports.user = function($) {
    var obj = {}
    obj.name = $('.title-section .name').text();
    obj.bio = $('.title-section .bio').text();
    obj.weibo = $('.zm-profile-header-user-weibo').attr('href')
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
    if (isDb) db.writeUser(obj)
}

exports.topic = function($) {
    var obj = {}
    obj.follow = $('.zm-topic-side-followers-info strong').eq(0).text()
    if (obj.follow > 10000) {
        obj.thumb = $('.topic-avatar .zm-entry-head-avatar-link img').attr('src')
        obj.name = $('.topic-avatar .zm-entry-head-avatar-link img').attr('alt')
        obj.home = domain + $('.topic-avatar .zm-entry-head-avatar-link').attr('href')
        obj.id = String($('.topic-avatar .zm-entry-head-avatar-link').attr('href')).split('/')[2]
        obj.describe = $('#zh-topic-desc .zm-editable-content').text()
        console.info(obj)
        if (isDb) db.writeTopic(obj)
    }
}
