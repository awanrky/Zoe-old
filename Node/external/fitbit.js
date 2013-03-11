var _ = require('underscore'),
	Oauth = require('oauth').OAuth;

_.string = require('underscore.string');
_.mixin(_.string.exports());

module.exports = function (fitbitSettings) {
	"use strict";
	var that = this;
	var s = fitbitSettings;

	var oauth = new Oauth(
		s.requestTokenUrl,
		s.accessTokenUrl,
		s.consumerKey,
		s.consumerSecret,
		s.version,
		s.callbackUrl,
		s.signatureMethod
	);

	this.getUrl = function (path) {
		return _.join(s.baseUrl, path);
	};

	this.formatDate = function (date) {
		return _.strLeft(date.toISOString(), 'T');
	};

	/**
	 * returns a date or a period denoted by 'day', 'week', or 'month' in a format
	 * that can be used in a route (return value will start with the '/' character
	 *
	 * returns undefined if undefined is passed as the period
	 *
	 * @param period
	 * @returns {string}
	 */
	this.formatPeriod = function(period) {
		if (_.isUndefined(period)) { return ''; }

		if (_.isDate(period)) { return '/' + that.formatDate(period); }

		switch(period) {
			case 'day':
			case '1d':
				return '/1d';

			case 'week':
			case '1w':
			case '7d':
				return '/1w';

			case 'month':
			case '30d':
			case '1m':
				return '/1m';

			default:
				return '';
		}
	};

	/**
	 * returns a resource url to get all the user's body weight entries for a given day
	 *
	 * @param date {Date}
	 * @param period {Date} or {string}
	 * @param user {string}
	 * @returns {string}
	 */
	this.getBodyWeightUrl = function () {
		var date = that.formatDate(arguments[0] || new Date());
		var period = that.formatPeriod(arguments[1]);
		var user = arguments[2] || '-';

		return that.getUrl('user/' + user + '/body/log/weight/date/' + date + period + '.json');
	};

	this.getBodyWeight = function () {
		var callback, period;
		var date = that.formatDate(arguments[0]);
		if (arguments.length === 1) {
			callback = arguments[1];
		} else {
			callback = arguments[2];
			period = arguments[1];
			if (typeof period !== 'string') {
				period = that.formatDate(period);
			}
			date = date + '/' + period;
		}


		var url = that.getBodyWeightUrl(arguments);
		oauth.get(
			url,
			s.accessToken,
			s.accessTokenSecret,
			callback
		);
	};
};


//testOauth.get(
//          "http://api.fitbit.com/1/user/-/foods/log/date/2012-01-01.json",
//          fitbitKeys.awanrky.accessToken, fitbitKeys.awanrky.accessTokenSecret,
//          function (error, data) {
//              if (error) done(require('sys').inspect(error));
//              var response = JSON.parse(data);
//              expect(response.summary.calories).to.equal(0);
//              done();
//          }
//        );