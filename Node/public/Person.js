/**
 * Wrapper around all the 'person' api calls
 * 
 * @constructor
 * @param {string} name Name of the person to use in the api calls
 * @param {ObservableArray} dataLogArray raw data will be put at the beginning of this array
 *
 */
function Person(name, dataLogArray) {
    "use strict";
//	var self = this;

	function log(data) {
		if (!dataLogArray) { return; }
		dataLogArray.unshift({d: JSON.stringify(data)});
	}

	/**
	 * Gets meta data about the current person
	 *
	 * @param {function} callback
	 */
    this.getMeta = function(callback) {
        $.getJSON("/person/" + name, function(data) {
            log(data);
            callback(data[0]);
        });
    };

    this.getTypeData = function(type, callback) {
        $.getJSON('person/get-type-data/' + name + '/' + type, function(data) {
            log(data);
            callback(data);
        });
    };

	/**
	 * Fills an array with a list of all the types of data that exist for this user
	 *
	 * @param {function} callback function to call after array is filled
	 *
	 */
    this.getDistinctTypes = function(callback) {
        $.getJSON("/person/get-distinct-types/" + name, function(data) {
            log(data);
            callback(data);
        });
    };

    this.add = function(data, callback) {
        $.ajax("/person/" + name, {
            data: ko.toJSON(data),
            type: "post",
            contentType: "application/json",
            complete: callback
        });
    };
}