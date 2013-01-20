﻿describe('zoe/routes/person/bodyWeight', function () {

    var expect = require('chai').expect,
        bodyWeight = require('../../../../routes/person/bodyWeight'),
        _ = require('underscore');

    var settings = {
        app: require('./mocks/express'),
        mongo: require('./mocks/mongo'),
        baseRoute: '/:person',
        configuration: {},
        logger: require('./mocks/logger')
    };
    
    function getRoute(routeName) {
        var route = settings.app.getRoutes.findRoute(routeName);
        
        expect(route, 'could not find route "' + routeName + '"').to.be.an('object');
        expect(route.route, 'found wrong route').to.equal(routeName);
        expect(route.action, 'route does not have an action').to.be.a('function');

        return route;
    }

    function callAction(action, requestParams) {
        var request = new settings.app.Request(requestParams);
        var response = new settings.app.Response();

        action(request, response);

        return { request: request, response: response };
    }
    
    function hasNoCacheHeader(response) {
        var noCacheHeader = response.getHeader('Cache-Control', 'no-cache');

        return (typeof noCacheHeader === 'object') && (noCacheHeader.header === 'Cache-Control') && (noCacheHeader.value === 'no-cache');
    }

    bodyWeight(settings);

    describe('routes', function () {

        describe('get routes', function () {

            it('should have 2 get routes', function() {
                expect(settings.app.getRoutes).to.have.length(2);
            });
            
            describe('date range', function() {

                var route = getRoute('/:person/body-weight/range/:from/:to');
                var requestParams = { params: { person: 1, from: '2012-01-01', to: '2012-02-01' } };
                var action = callAction(route.action, requestParams);

                it('should get all weights for a person by date range', function() {
                    expect(action.response.response[0].person).to.equal(requestParams.params.person );
                });

                it('should return a no cache header', function() {
                    expect(hasNoCacheHeader(action.response)).to.equal(true);
                });
                
            });

            describe('get by page (page size and page number)', function() {
                var route = getRoute('/:person/body-weight/page/:page/:pageSize');
                var requestParams = { params: { person: 1, page: 2, pageSize: 10 } };
                var action = callAction(route.action, requestParams);

                it('should get weights 11 - 20 for a person', function () {
                    expect(action.response.response[0].person, 'querying for wrong person').to.equal(requestParams.params.person);
                    expect(action.response.response[1].skip, 'getting wrong page').to.equal(requestParams.params.page * requestParams.params.pageSize);
                    expect(action.response.response[1].limit, 'returning incorrect number of records').to.equal(requestParams.params.pageSize);
                });

                it('should return a no cache header', function () {
                    expect(hasNoCacheHeader(action.response)).to.equal(true);
                });
            });

        });

        describe('put routes', function() {

            it('should have 0 put routes', function() {
                expect(settings.app.putRoutes).to.have.length(0);
            });

        });

        describe('post routes', function() {

            it('should have 1 post route', function() {
                expect(settings.app.postRoutes).to.have.length(1);
            });

        });

        describe('delete routes', function() {

            it('should have 0 delete routes', function() {
                expect(settings.app.deleteRoutes).to.have.length(0);
            });

        });

    });

});