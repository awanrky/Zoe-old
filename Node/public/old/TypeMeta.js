function TypeMeta(type) {
    "use strict";
    this._id = ko.observable(type._id);
    this.createdOn = ko.observable(type.createdOn);
    this.type = ko.observable(type.type);
    this.name = ko.observable(type.name);
    this.description = ko.observable(type.description);
    this.source = ko.observable(type.source);
    this.value = ko.observable(type.value);
    this.typeMeta = ko.observable(type.typeMeta);
    this.tags = ko.observableArray(type.tags);
    this.prettyName = ko.observable(type.prettyName);
}