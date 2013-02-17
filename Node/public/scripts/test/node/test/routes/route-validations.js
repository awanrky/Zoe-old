var m;
var expect = require('chai').expect;

exports = module.exports = initialize;

function initialize(mocks) {
    m = mocks;
}

exports.getGetRoute = function(routeName) {
    return validateRoute(m.app.getRoutes.findRoute(routeName), routeName);
};

exports.getPostRoute = function(routeName) {
    return validateRoute(m.app.postRoutes.findRoute(routeName), routeName);
};

exports.getDeleteRoute = function(routeName) {
    return validateRoute(m.app.deleteRoutes.findRoute(routeName), routeName);
};

function validateRoute(route, routeName) {
    expect(route, 'could not find route "' + routeName + '"').to.be.an('object');
    expect(route.route, 'found wrong route').to.equal(routeName);
    expect(route.action, 'route does not have an action').to.be.a('function');

    return route;
};

exports.callAction = function(action, requestParams) {
    var request = new m.app.Request(requestParams);
    var response = new m.app.Response();

    action(request, response);

    return { request: request, response: response };
};

exports.hasNoCacheHeader = function(response) {
    var noCacheHeader = response.getHeader('Cache-Control', 'no-cache');

    return (typeof noCacheHeader === 'object') && (noCacheHeader.header === 'Cache-Control') && (noCacheHeader.value === 'no-cache');
};