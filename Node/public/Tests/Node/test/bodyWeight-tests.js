describe('zoe/routes/person/bodyWeight', function () {

    var expect = require('chai').expect,
        bodyWeight = require('../../../../routes/person/bodyWeight'),
        _ = require('underscore');

    var settings = {
        app: require('./mocks/express'),
        baseRoute: '/person/:id',
        configuration: {},
        logger: require('./mocks/logger')
    };

    bodyWeight(settings);

    describe('routes', function () {

        describe('get routes', function() {

            it('should have 1 get route', function() {
                expect(settings.app.getRoutes).to.have.length(1);
            });

            it('should get all data for a person by person id', function () {
                var routeName = '/person/:id/body-weight';
                var route = settings.app.getRoutes.findRoute(routeName);

                expect(route, 'could not find route "' + routeName + '"').to.be.an('object');
                expect(route.route, 'found wrong route').to.equal(routeName);

                expect(route.action, 'route does not have an action').to.be.a('function');

                var request = new settings.app.Request({ params: { id: 1 } });
                var response = new settings.app.Response();
                route.action(request, response);
                expect(response.response).to.equal('test 1');
            });

        });

        describe('put routes', function() {

            it('should have 0 put routes', function() {
                expect(settings.app.putRoutes).to.have.length(0);
            });

        });

        describe('post routes', function() {

            it('should have 0 post routes', function() {
                expect(settings.app.postRoutes).to.have.length(0);
            });

        });

        describe('delete routes', function() {

            it('should have 0 delete routes', function() {
                expect(settings.app.deleteRoutes).to.have.length(0);
            });

        });

    });

});