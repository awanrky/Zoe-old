describe('oauth', function () {

    var expect = require('chai').expect,
        oauth = require('oauth').OAuth,
        _ = require('underscore'),
        twitterKeys = require('../../../../../../oauth/twitter-private').settings
    ;

    var testOauth;


//    it('should fail', function () {
//        expect(1).to.equal(2);
//        });

    beforeEach(function() {
        testOauth = new oauth(
            "http://twitter.com/oauth/request_token",
            "http://twitter.com/oauth/access_token",
            twitterKeys.consumerKey,
            twitterKeys.consumerSecret,
            '1.0A',
            null,
            'HMAC-SHA1'
        );
    });

    it('should have a twitter configuration object', function() {
        expect(twitterKeys).to.be.an('object');
    });

    it('should create an oauth object', function() {
        expect(testOauth).to.be.an('object');
    });

    it('should get statuses', function(done) {
        testOauth.get(
          "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=ZoeTrackerApp",
          twitterKeys.zoe.accessToken, twitterKeys.zoe.accessTokenSecret,
          function (error, data) {
              if (error) done(require('sys').inspect(error));
              var firstTweet = JSON.parse(data)[0];
              expect(firstTweet.text).to.equal('I am. I think. I will.');
              done();
          }
        );
    });
    
//    it('should post to twitter', function (done) {
//        testOauth.post(
//          "http://api.twitter.com/1/statuses/update.json",
//          twitterKeys.zoe.accessToken, twitterKeys.zoe.accessTokenSecret,
//          { "status": "I am.  I think.  I will." },
//          function (error, data) {
//              if (error) throw require('sys').inspect(error);
//              done();
//          }
//        );
//    });

});