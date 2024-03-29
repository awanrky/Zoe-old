﻿describe('zoe/routes/person', function() {
    var expect = require('chai').expect,
        _ = require('underscore'),
        validate = require('./route-validations'),
        person = require('../../../../../../routes/person.js');

    var settings = {
        app: require('../../mocks/express'),
        mongo: require('../../mocks/mongo'),
        configuration: {},
        logger: require('../../mocks/logger')
    };

    validate(settings);
    person(settings);

    describe('routes', function() {

        describe('get routes', function() {

//            it('should have 2 get routes', function() {
//                expect(settings.app.getRoutes).to.have.length(2);
//            });

            describe('get by id', function() {
                var route = validate.getGetRoute('/person/byid/:id');
                var requestData = { params: { id: '50fadd24f1f4ee6fed459a6f' } };
                var action = validate.callAction(route.action, requestData);

                it('should retreive the person record from the Person collection', function () {
                    expect(action.response.response[0]._id.toString()).to.equal(new settings.mongo.BSONPure.ObjectID(requestData.params.id).toString());
                });

                it('should return a no cache header', function () {
                    expect(validate.hasNoCacheHeader(action.response)).to.equal(true);
                });
            });
            
            describe('get by name', function () {
                var route = validate.getGetRoute('/person/byname/:first/:middle/:last');
                var requestData = { params: { first: 'Mark', middle: 'Gilbert', last: 'Ott' } };
                var action = validate.callAction(route.action, requestData);

                it('should retreive the person record from the Person collection', function () {
                    expect(action.response.response[0].name.first).to.equal(requestData.params.first);
                    expect(action.response.response[0].name.middle).to.equal(requestData.params.middle);
                    expect(action.response.response[0].name.last).to.equal(requestData.params.last);
                });

                it('should return a no cache header', function () {
                    expect(validate.hasNoCacheHeader(action.response)).to.equal(true);
                });
            });

        });
    });
});