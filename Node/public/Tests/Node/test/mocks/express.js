var _ = require('underscore');

exports.getRoutes = [];
exports.putRoutes = [];
exports.postRoutes = [];
exports.deleteRoutes = [];

exports.get = function(r, a) {
    exports.getRoutes.push({ route: r, action: a });
};

exports.put = function(r, a) {
    exports.putRoutes.push({ route: r, action: a });
};

exports.post = function(r, a) {
    exports.postRoutes.push({ route: r, action: a });
};

exports.delete = function(r, a) {
    exports.deleteRoutes.push({ route: r, action: a });
};

exports.getRoutes.findRoute = function(route) {
    return _.find(exports.getRoutes, function(routeObject) {
        return routeObject.route === route;
    });
};

exports.putRoutes.findRoute = function (route) {
    return _.find(exports.putRoutes, function (routeObject) {
        return routeObject.route === route;
    });
};

exports.postRoutes.findRoute = function (route) {
    return _.find(exports.postRoutes, function (routeObject) {
        return routeObject.route === route;
    });
};

exports.deleteRoutes.findRoute = function (route) {
    return _.find(exports.deleteRoutes, function (routeObject) {
        return routeObject.route === route;
    });
};

exports.Request = function(c) {
    this.params = c.params || {};
};

exports.Response = function () {
    this.send = function(response) { this.response = response; };
    this.set = function(header, value) {
    };
};