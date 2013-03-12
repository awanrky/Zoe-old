var _ = require('underscore'),
	Oauth = require('oauth').OAuth;

_.string = require('underscore.string');
_.mixin(_.string.exports());

module.exports = function (fitbitSettings) {
	'use strict';
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

	function splitArguments() {
		var args = _.toArray(arguments[0]);
		var callback = args.pop();
		return {
			callback: callback,
			args: args
		};
	}

	function get(url, callback) {
		oauth.get(
			url,
			s.currentUser.accessToken,
			s.currentUser.accessTokenSecret,
			callback
		);
	}

	function getResource(urlFunction, args) {
		var a = splitArguments(args);
		var url = urlFunction(a.args);
		get(url, a.callback);
	}

	this.getUrl = function (path) {
		return s.baseUrl + path;
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

		//noinspection FallthroughInSwitchStatementJS
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
	 * returns a resource url to get all the user's body weight entries for a given time period
	 *
	 * @param args {Array}
	 *	args[0] = date
	 *	args[1] = period
	 *	args[2] = user
	 * @returns {string}
	 */
	this.getBodyWeightUrl = function (args) {
		args = args || [];
		var date = that.formatDate(args[0] || new Date());
		var period = that.formatPeriod(args[1]);
		var user = args[2] || '-';

		return that.getUrl('user/' + user + '/body/log/weight/date/' + date + period + '.json');
	};

	/**
	 * returns a resource url to get all the user's body fat entries for a given time period
	 *
	 * @param args {Array}
	 *	args[0] = date
	 *	args[1] = period
	 *	args[2] = user
	 * @returns {string}
	 */
	this.getBodyFatUrl = function (args) {
		args = args || [];
		var date = that.formatDate(args[0] || new Date());
		var period = that.formatPeriod(args[1]);
		var user = args[2] || '-';

		return that.getUrl('user/' + user + '/body/log/fat/date/' + date + period + '.json');
	};

	/**
	 * returns a resource url to get the user's profile
	 *
	 * @param args {Array}
	 *	args[0] = user
	 * @returns {string}
	 */
	this.getUserProfileUrl = function (args) {
		args = args || [];
		var user = args[0] || '-';

		return that.getUrl('user/' + user + '/profile.json');
	};

	/**
	 * returns a resource url to get the user's heart rate
	 *
	 * @param args {Array}
	 *	args[0] = user
	 *	args[1] = date
	 * @returns {string}
	 */
	this.getHeartRateUrl = function (args) {
		args = args || [];
		var user = args[0] || '-';
		var date = that.formatDate(args[1] || new Date());

		return that.getUrl('user/' + user + '/heart/date/' + date + '.json');
	};

	/**
	 * returns a resource url to get the user's blood pressure
	 *
	 * @param args {Array}
	 *	args[0] = user
	 *	args[1] = date
	 * @returns {string}
	 */
	this.getBloodPressureUrl = function (args) {
		args = args || [];
		var user = args[0] || '-';
		var date = that.formatDate(args[1] || new Date());

		return that.getUrl('user/' + user + '/bp/date/' + date + '.json');
	};

	/**
	 * returns a resource url to get the user's glucose
	 *
	 * @param args {Array}
	 *	args[0] = user
	 *	args[1] = date
	 * @returns {string}
	 */
	this.getGlucoseUrl = function (args) {
		args = args || [];
		var user = args[0] || '-';
		var date = that.formatDate(args[1] || new Date());

		return that.getUrl('user/' + user + '/glucose/date/' + date + '.json');
	};

	//noinspection JSValidateJSDoc
	/**
	 * gets all the user's body weight entries for a given time period
	 *
	 * @param date {Date} _optional_
	 * @param period {Date} or {string} _optional_
	 * @param user {string} _optional_
	 * @param callback {function}
	 */
	this.getBodyWeight = function () {
		getResource(that.getBodyWeightUrl, arguments);
	};

	//noinspection JSValidateJSDoc
	/**
	 * gets all the user's body fat entries for a given time period
	 *
	 * @param date {Date} _optional_
	 * @param period {Date} or {string} _optional_
	 * @param user {string} _optional_
	 * @param callback {function}
	 */
	this.getBodyFat = function () {
		getResource(that.getBodyFatUrl, arguments);
	};

	//noinspection JSValidateJSDoc
	/**
	 * gets the user's profile
	 *
	 * @param user {string} _optional_
	 * @param callback {function}
	 */
	this.getUserProfile = function () {
		getResource(that.getUserProfileUrl, arguments);
	};

	//noinspection JSValidateJSDoc
	/**
	 * gets the user's heart rate
	 *
	 * @param user {string} _optional_
	 * @param date {Date} _optional_
	 * @param callback {function}
	 */
	this.getHeartRate = function () {
		getResource(that.getHeartRateUrl, arguments);
	};

	//noinspection JSValidateJSDoc
	/**
	 * gets the user's blood pressure
	 *
	 * @param user {string} _optional_
	 * @param date {Date} _optional_
	 * @param callback {function}
	 */
	this.getBloodPressure = function () {
		getResource(that.getBloodPressureUrl, arguments);
	};

	//noinspection JSValidateJSDoc
	/**
	 * gets the user's glucose
	 *
	 * @param user {string} _optional_
	 * @param date {Date} _optional_
	 * @param callback {function}
	 */
	this.getGlucose = function () {
		getResource(that.getGlucoseUrl, arguments);
	};
};