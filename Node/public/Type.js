﻿function Type(typeMeta, person) {
    "use strict";
    var self = this;

    this.meta = ko.observable(new TypeMeta(typeMeta || {}));
    this.data = ko.observableArray();
    this.current = ko.observable(new TypeData(self.meta));
    this.name = ko.computed(function () {
        return self.meta().type();
    });
    this.prettyName = ko.computed(function () {
        return self.meta().prettyName();
    });

    this.refresh = function () {
        self.data.removeAll();
        person.getTypeData(this.name(), function (data) {
            $.each(data, function (index, value) {
                if (value.typeMeta !== self.name()) {
                    self.data.push(new TypeData(self.meta, value));
                }
            });
        });
        $('.alert').alert('close');
    };

    this.add = function () {
        person.add(this.current().setModifiedOn(), function (jqXhr, status) {
            self.refresh();
            self.current(new TypeData(self.meta));
        });
    };

    this.delete = function(data) {
        person.delete(data._id(), function() {
            self.refresh();
        });
    };

    /**
	 * Gets the id of the correct template to use for this type, or the default template if
	 * this type does not have a template
	 */
    this.getTypeTemplate = function () {
        var templateName = 'type-template-' + this.name();
        if ($('#' + templateName).length === 0) {
            return 'type-template-default';
        }
        return templateName;
    };
}