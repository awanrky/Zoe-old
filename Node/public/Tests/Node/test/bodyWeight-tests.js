describe('zoe/routes/person/bodyWeight', function () {

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

    function getGetRoute(routeName) {
        return validateRoute(settings.app.getRoutes.findRoute(routeName), routeName);
    }
    
    function getPostRoute(routeName) {
        return validateRoute(settings.app.postRoutes.findRoute(routeName), routeName);
    }

    function getDeleteRoute(routeName) {
        return validateRoute(settings.app.deleteRoutes.findRoute(routeName), routeName);
    }

    function validateRoute(route, routeName)
    {
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

                var route = getGetRoute('/:person/body-weight/range/:from/:to');
                var requestData = { params: { person: 1, from: '2012-01-01', to: '2012-02-01' } };
                var action = callAction(route.action, requestData);

                it('should get all weights for a person by date range', function() {
                    expect(action.response.response[0].person).to.equal(requestData.params.person );
                });

                it('should return a no cache header', function() {
                    expect(hasNoCacheHeader(action.response)).to.equal(true);
                });
                
            });

            describe('get by page (page size and page number)', function() {
                var route = getGetRoute('/:person/body-weight/page/:page/:pageSize');
                var requestData = { params: { person: 1, page: 2, pageSize: 10 } };
                var action = callAction(route.action, requestData);

                it('should get weights 11 - 20 for a person', function () {
                    expect(action.response.response[0].person, 'querying for wrong person').to.equal(requestData.params.person);
                    expect(action.response.response[1].skip, 'getting wrong page').to.equal(requestData.params.page * requestData.params.pageSize);
                    expect(action.response.response[1].limit, 'returning incorrect number of records').to.equal(requestData.params.pageSize);
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

            describe('insert weight', function () {
                var value = 235.54;
                var date = new Date(2011, 1, 1);

                var route = getPostRoute('/:person/body-weight');
                var requestData = {
                    params: {
                        'person': 1
                    },
                    body: {
                        data: JSON.stringify([{
                            value: value,
                            date: date
                        }])
                    }
                };
                var action = callAction(route.action, requestData);

                it('should return a 200 result', function() {
                    expect(action.response.statusCode).to.equal(200);
                });
                
                it('should return a no cache header', function () {
                    expect(hasNoCacheHeader(action.response)).to.equal(true);
                });

            });

        });

        describe('delete routes', function() {

            it('should have 1 delete route', function() {
                expect(settings.app.deleteRoutes).to.have.length(1);
            });

            describe('delete weight', function() {

                var route = getDeleteRoute('/:person/body-weight');
                var requestData = {
                    params: {
                        'person': 1
                    },
                    body: {
                        data: JSON.stringify([{
                            _id: 2
                        }])
                    }
                };
                var action = callAction(route.action, requestData);

                it('should return a 200 result', function() {
                    expect(action.response.statusCode).to.equal(200);
                });

                it('should return a no cache header', function() {
                    expect(hasNoCacheHeader(action.response)).to.equal(true);
                });
            });
        });

    });

});