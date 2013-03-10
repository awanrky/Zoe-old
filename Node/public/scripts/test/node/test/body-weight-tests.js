describe('zoe/routes/person/bodyWeight', function () {

    var expect = require('chai').expect,
        bodyWeight = require('../../../../../routes/person/bodyWeight'),
        validate = require('./routes/route-validations'),
        _ = require('underscore');

    var settings = {
        app: require('../mocks/express'),
        mongo: require('../mocks/mongo'),
        baseRoute: '/:person',
        configuration: {},
        logger: require('../mocks/logger')
    };

    validate(settings);
    bodyWeight(settings);

    describe('routes', function () {

        describe('get routes', function () {

//            it('should have 2 get routes', function() {
//                expect(settings.app.getRoutes).to.have.length(2);
//            });
            
            describe('date range', function() {

                var route = validate.getGetRoute('/:person/body-weight/range/:from/:to');
                var requestData = { params: { person: 1, from: '2012-01-01', to: '2012-02-01' } };
                var action = validate.callAction(route.action, requestData);

                it('should get all weights for a person by date range', function() {
                    expect(action.response.response[0].person).to.equal(requestData.params.person );
                });

                it('should return a no cache header', function() {
                    expect(validate.hasNoCacheHeader(action.response)).to.equal(true);
                });
                
            });

            describe('get by page (page size and page number)', function() {
                var route = validate.getGetRoute('/:person/body-weight/page/:page/:pageSize');
                var requestData = { params: { person: 1, page: 2, pageSize: 10 } };
                var action = validate.callAction(route.action, requestData);

                it('should get weights 11 - 20 for a person', function () {
                    expect(action.response.response[0].person, 'querying for wrong person').to.equal(requestData.params.person);
                    expect(action.response.response[1].skip, 'getting wrong page').to.equal(requestData.params.page * requestData.params.pageSize);
                    expect(action.response.response[1].limit, 'returning incorrect number of records').to.equal(requestData.params.pageSize);
                });

                it('should return a no cache header', function () {
                    expect(validate.hasNoCacheHeader(action.response)).to.equal(true);
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

                var route = validate.getPostRoute('/:person/body-weight');
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
                var action = validate.callAction(route.action, requestData);

                it('should return a 200 result', function() {
                    expect(action.response.statusCode).to.equal(200);
                });
                
                it('should return a no cache header', function () {
                    expect(validate.hasNoCacheHeader(action.response)).to.equal(true);
                });

            });

        });

        describe('delete routes', function() {

            it('should have 1 delete route', function() {
                expect(settings.app.deleteRoutes).to.have.length(1);
            });

            describe('delete weight', function() {

                var route = validate.getDeleteRoute('/:person/body-weight');
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
                var action = validate.callAction(route.action, requestData);

                it('should return a 200 result', function() {
                    expect(action.response.statusCode).to.equal(200);
                });

                it('should return a no cache header', function() {
                    expect(validate.hasNoCacheHeader(action.response)).to.equal(true);
                });
            });
        });

    });

});