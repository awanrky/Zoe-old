/**
 * Wrapper around all the 'person' api calls
 * 
 * @constructor
 * @param {string} name Name of the person to use in the api calls
 * @param {ObservableArray} dataLogArray raw data will be put at the beginning of this array
 *
 */
function PersonMock(name, dataLogArray) {
    "use strict";

    var data = {
        personMeta: {
            "_id": "508420acb49f2cc6059584f4",
            "name": { "first": "Mark", "middle": "Gilbert", "last": "Ott" },
            "birthday": new Date("1967-03-13T07:30:00Z"),
            "type": "meta",
            "collectionMeta": "collectionMeta",
            "createdOn": new Date("2012-10-21T16:19:56.507Z"),
            "source": "SetupZoe.js"
        },
        typeMeta: [{
            "_id": "508420ac8d447cb4f5bf3fc2",
            "prettyName": "Body Weight",
            "type": "bodyWeight",
            "typeMeta": "bodyWeight",
            "tags": [
            "health",
            "nutrition"
            ],
            "createdOn": "2012-10-21T16:19:56.877Z",
            "source": "SetupZoe.js"
        }, {
            "_id": "508420ac8d447cb4f5bf3fc1",
            "prettyName": "Gasoline Purchase",
            "type": "gasolinePurchase",
            "typeMeta": "gasolinePurchase",
            "createdOn": "2012-10-21T16:19:56.877Z",
            "source": "SetupZoe.js"
        }],
        typeData: {
            bodyWeight: [{
                "createdOn": "2012-11-01T00:49:07.883Z",
                "date": "2012-11-01T00:49:07.883Z",
                "type": "bodyWeight",
                "value": "333",
                "_id": "5091c703d14dc1f421000001"
            }, {
                "createdOn": "2012-10-30T10:59:10.876Z",
                "date": "2012-10-30T10:59:10.876Z",
                "type": "bodyWeight",
                "value": "217.7",
                "_id": "508fb2f9ce52f08c10000004"
            }, {
                "createdOn": "2012-10-29T11:01:38.265Z",
                "date": "2012-10-29T11:01:38.265Z",
                "type": "bodyWeight",
                "value": "218.8",
                "_id": "508e6208ce52f08c10000003"
            }, {
                "_id": "508420ac8d447cb4f5bf3fc2",
                "prettyName": "Body Weight",
                "type": "bodyWeight",
                "typeMeta": "bodyWeight",
                "tags": [
                  "health",
                  "nutrition"
                ],
                "createdOn": "2012-10-21T16:19:56.877Z",
                "source": "SetupZoe.js"
            }],
            gasolinePurchase: [

            ]
        }
    };

    this.getMeta = function (callback) {
        callback(data.personMeta);
    };

    this.getTypeData = function (type, callback) {
        callback(data.typeData[type]);
    };
    
    this.getDistinctTypes = function (callback) {
        callback(data.typeMeta);
    };

//    this.add = function (data, callback) {
//        $.ajax("/person/" + name, {
//            data: ko.toJSON(data),
//            type: "post",
//            contentType: "application/json",
//            complete: callback
//        });
//    };
//
//    this.delete = function (id, callback) {
//        $.ajax("/person/" + name + '/' + id, {
//            type: "delete",
//            complete: callback
//        });
//    };
}