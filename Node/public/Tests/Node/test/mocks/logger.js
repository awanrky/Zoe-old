var log = [];


exports.log = function(message) {
    log.push(message);
};

exports.clear = function() {
    log = [];
};

exports.get = function(item) {
    if (log.length < 1) {
        return undefined;
    }

    if (typeof item === "undefined") {
        item = log.length - 1;
    }

    return log[item];
};

exports.size = function() {
    return log.length;
};