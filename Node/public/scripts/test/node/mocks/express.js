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
    this.body = c.body || {};
};

exports.Response = function () {
    var self = this;
    var headers = [];
    
    this.send = function () {
        if (arguments.length === 2) {
            self.statusCode = arguments[0];
            self.response = arguments[1];
            return;
        } 
        self.statusCode = 200;
        self.response = arguments[0];
    };
    
    this.set = function (header, value) {
        headers.push({ header: header, value: value });
    };
    
    this.getHeader = function(header, value) {
        return _.find(headers, function(h) {
            return (h.header === header) && (h.value === value);
        });
    };
};