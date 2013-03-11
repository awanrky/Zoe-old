describe('oauth', function () {

    var expect = require('chai').expect,
        oauth = require('oauth').OAuth,
        _ = require('underscore'),
        fitbitKeys = require('../../../../../../oauth/fitbit-private').settings
        ;

    var testOauth;

    beforeEach(function () {
        testOauth = new oauth(
            fitbitKeys.requestTokenUrl,
            fitbitKeys.accessTokenUrl,
            fitbitKeys.consumerKey,
            fitbitKeys.consumerSecret,
            fitbitKeys.version,
            fitbitKeys.callbackUrl,
            fitbitKeys.signatureMethod
        );
    });

    it('should get statuses', function (done) {
        testOauth.get(
            "http://api.fitbit.com/1/user/-/foods/log/date/2012-01-01.json",
            fitbitKeys.awanrky.accessToken, fitbitKeys.awanrky.accessTokenSecret,
            function (error, data) {
                if (error) done(require('sys').inspect(error));
                var response = JSON.parse(data);
                expect(response.summary.calories).to.equal(0);
                done();
            }
        );
    });


});