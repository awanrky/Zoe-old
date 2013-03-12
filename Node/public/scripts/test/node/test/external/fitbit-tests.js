describe('external.fitbit', function () {
	'use strict';

	var expect = require('chai').expect,

	// TODO: replace the Fitbit object with a mock that doesn't hit the fitbit site
		Fitbit = require('../../../../../../external/fitbit'),

		fitbitKeys = require('../../../../../../oauth/fitbit-private').settings
		;

	fitbitKeys.currentUser = fitbitKeys.awanrky;

	var fitbit = new Fitbit(fitbitKeys);

	it('should have a fitbit object to work with', function () {
		expect(fitbit).to.be.an('object');
	});

	describe('utility methods', function() {

		describe('formatDate()', function () {
			it('should format a date correctly', function() {
				expect(fitbit.formatDate(new Date(1967, 2, 13))).to.equal('1967-03-13');
			});
		});

		describe('formatPeriod()', function () {

			it('should get an empty string if the period is undefined', function () {
				expect(fitbit.formatPeriod(undefined)).to.equal('');
				expect(fitbit.formatPeriod()).to.equal('');
			});

			it('should get the correct period string for a day', function () {
				expect(fitbit.formatPeriod('day')).to.equal('/1d');
				expect(fitbit.formatPeriod('1d')).to.equal('/1d');
			});

			it('should get the correct period string for a week', function () {
				expect(fitbit.formatPeriod('week')).to.equal('/1w');
				expect(fitbit.formatPeriod('1w')).to.equal('/1w');
				expect(fitbit.formatPeriod('7d')).to.equal('/1w');
			});

			it('should get the correct period string for a month', function () {
				expect(fitbit.formatPeriod('month')).to.equal('/1m');
				expect(fitbit.formatPeriod('1m')).to.equal('/1m');
				expect(fitbit.formatPeriod('30d')).to.equal('/1m');
			});

			it('should get the correct period string for a date', function () {
				expect(fitbit.formatPeriod(new Date(2013, 2, 10))).to.equal('/2013-03-10');
			});
		});
	});

	describe('body weight', function () {

		it('should get a body weight url for the current user', function () {
			var url = fitbit.getBodyWeightUrl();
			expect(url).to.contain('user/-/body/log/weight');
		});

		it('should get a body weight url for a date range', function () {
			var url = fitbit.getBodyWeightUrl([new Date(2013, 0, 1), new Date(2013, 0, 2)]);
			expect(url).to.contain('user/-/body/log/weight/date/2013-01-01/2013-01-02');
		});

		it('should get a body weight url for a period of a week', function () {
			var url = fitbit.getBodyWeightUrl([new Date(2013, 2, 13), 'week']);
			expect(url).to.contain('user/-/body/log/weight/date/2013-03-13/1w');

			url = fitbit.getBodyWeightUrl([new Date(2013, 2, 13), '1w']);
			expect(url).to.contain('user/-/body/log/weight/date/2013-03-13/1w');

			url = fitbit.getBodyWeightUrl([new Date(2013, 2, 13), '7d']);
			expect(url).to.contain('user/-/body/log/weight/date/2013-03-13/1w');
		});

		it('should get a body weight url for a period of a day', function () {
			var url = fitbit.getBodyWeightUrl([new Date(2013, 2, 13), 'day']);
			expect(url).to.contain('user/-/body/log/weight/date/2013-03-13/1d');

			url = fitbit.getBodyWeightUrl([new Date(2013, 2, 13), '1d']);
			expect(url).to.contain('user/-/body/log/weight/date/2013-03-13/1d');
		});

		it('should get a body weight url for a period of a month', function () {
			var url = fitbit.getBodyWeightUrl([new Date(2013, 2, 13), 'month']);
			expect(url).to.contain('user/-/body/log/weight/date/2013-03-13/1m');

			url = fitbit.getBodyWeightUrl([new Date(2013, 2, 13), '30d']);
			expect(url).to.contain('user/-/body/log/weight/date/2013-03-13/1m');

			url = fitbit.getBodyWeightUrl([new Date(2013, 2, 13), '1m']);
			expect(url).to.contain('user/-/body/log/weight/date/2013-03-13/1m');
		});

		it('should get the current user\'s body weight', function(done) {
			fitbit.getBodyWeight(function(error, data) {
				expect(error).to.be.null;
				expect(JSON.parse(data).weight).to.be.an('array');
				done();
			});
		});
	});

	describe('body fat', function () {
		it('should get the current user\'s body fat', function(done) {
			fitbit.getBodyFat(function(error, data) {
				expect(error).to.be.null;
				expect(JSON.parse(data).fat).to.be.an('array');
				done();
			});
		});
	});

	describe('user profile', function () {
		it('should get the current user\'s profile', function(done) {
			fitbit.getUserProfile(function(error, data) {
				expect(error).to.be.null;
				expect(JSON.parse(data).user).to.be.an('object');
				done();
			});
		});
	});

	describe('heart rate', function () {
		it('should get the current user\'s heart rate', function(done) {
			fitbit.getHeartRate(function(error, data) {
				expect(error).to.be.null;
				var heartRateInformation = JSON.parse(data);
				expect(heartRateInformation).to.be.an('object');
				expect(heartRateInformation.average).to.be.an('array');
				expect(heartRateInformation.heart).to.be.an('array');
				done();
			});
		});
	});

	describe('blood pressure', function () {
		it('should get the current user\'s blood pressure', function(done) {
			fitbit.getBloodPressure(function(error, data) {
				expect(error).to.be.null;
				var bloodPressureInformation = JSON.parse(data);
				expect(bloodPressureInformation).to.be.an('object');
//				expect(bloodPressureInformation.average).to.be.an('object');
				expect(bloodPressureInformation.bp).to.be.an('array');
				done();
			});
		});
	});

	describe('glucose', function () {
		it('should get the current user\'s glucose', function(done) {
			fitbit.getGlucose(function(error, data) {
				expect(error).to.be.null;
				var glucoseInformation = JSON.parse(data);
				expect(glucoseInformation).to.be.an('object');
				expect(glucoseInformation.glucose).to.be.an('array');
//				expect(glucoseInformation.hba1c).to.be.a('string');
				done();
			});
		});
	});

});