var _ = require('underscore');

function Result(query, options) {
    this.toArray = function(callback) {
        callback(undefined, [query, options]);
    };
}

function Collection (name) {
    this.name = name;

    this.find = function(query, options) {
        return new Result(query, options);
    };

    this.insert = function(record, callback) {
        callback();
    };
}

exports.db = {
    collection: function(collectionName, callback) {
        callback(undefined, new Collection(collectionName));
    }  
};