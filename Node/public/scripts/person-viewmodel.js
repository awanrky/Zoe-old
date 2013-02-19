/*  MIT License (MIT)
    Copyright (c) 2013 Mark Ott

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
    to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
    and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
    IN THE SOFTWARE. */

define(['knockout'], function (ko) {
    "use strict";

    return function ($) {
        var that = this;

        var uninitializedValue = 'this is not the value you are looking for';

        function parseName(name) {
            var a = name.split(' ');

            var returnValue = {
                first: a[0],
                last: a[a.length - 1]
            };
            a.pop();
            a.shift();
            returnValue.middle = a.join(' ');
            return returnValue;
        }

        this.parseData = function(data) {
            that.person(data[0]);
            that.name().first(that.person().name.first);
            that.name().middle(that.person().name.middle);
            that.name().last(that.person().name.last);
            that.id(that.person()._id);
            that.birthday(new Date(that.person().birthday));
            that.createdOn(new Date(that.person().createdOn));
            that.source(that.person().source);
        };

        this.getPerson = function(name, callback) {
            var person = parseName(name);
            var route = "/person/byname/:first/:middle/:last".replace(":first", person.first).replace(":middle", person.middle).replace(":last", person.last);
            $.getJSON(route, function(data) {
                if (callback) {
                    callback(data);
                } else {
                    that.parseData(data);
                }
            });
        };

        this.person = ko.observable(uninitializedValue);

        this.name = ko.observable({
            first: ko.observable(uninitializedValue),
            middle: ko.observable(uninitializedValue),
            last: ko.observable(uninitializedValue)
        });

        this.fullName = ko.computed(function() {
            return that.name().first() + " " + that.name().middle() + " " + that.name().last();
        }, that);

        this.id = ko.observable(uninitializedValue);
        this.birthday = ko.observable(uninitializedValue);
        this.createdOn = ko.observable(uninitializedValue);
        this.source = ko.observable(uninitializedValue);

    };
});