describe('external.fitbit', function () {
	"use strict";

	var expect = require('chai').expect,

	// TODO: replace the Fitbit object with a mock that doesn't hit the fitbit site
		Fitbit = require('../../../../../../external/fitbit'),

		fitbitKeys = require('../../../../../../oauth/fitbit-private').settings
		;

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

//    it('should get the current user\'s body weight', function() {
//        fitbit.getBodyWeight()
//    });
	});


});