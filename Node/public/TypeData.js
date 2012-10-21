function TypeData(typeMeta, data) {
    "use strict";
    var self = this;

    this._id = ko.observable();
    this.createdOn = ko.observable();
    this.modifiedOn = ko.observable();
    this.date = ko.observable();
    this.type = ko.observable();
    this.name = ko.observable();
    this.description = ko.observable();
    this.source = ko.observable();
    this.value = ko.observable();

    function initialize(value) {
        self.type(typeMeta().type());
        if (!value) {
            return;
        }
        self._id(value._id);
        self.createdOn(value.createdOn);
        self.modifiedOn(value.modifiedOn);
        self.date(value.date);
        self.name(value.name);
        self.description(value.description);
        self.source(value.source);
        self.value(value.value);
    };
    
    this.setModifiedOn = function (date) {
        if (typeof date === 'undefined') {
            date = new Date();
        }

        if (self.createdOn()) {
            self.modifiedOn(date);
        } else {
            self.createdOn(date);
        }
        if (!self.date()) {
            self.date(date);
        }
        return self;
    };

    initialize(data);
}
