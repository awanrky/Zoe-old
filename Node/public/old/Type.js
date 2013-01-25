function Type(typeMeta, person) {
    "use strict";
    var self = this;

    this.meta = ko.observable(new TypeMeta(typeMeta || {}));
    this.data = ko.observableArray();
    this.current = ko.observable(TypeData.getNewTypeData(self.meta()));
    this.name = ko.computed(function () {
        return self.meta().type();
    });
    this.prettyName = ko.computed(function () {
        return self.meta().prettyName();
    });

    this.refresh = function () {
        self.data.removeAll();
        person.getTypeData(self.name(), function (data) {
            $.each(data, function (index, value) {
                if (value.typeMeta !== self.name()) {
                    self.data.push(TypeData.getNewTypeData(self.meta(), value));
        self.onRefresh();
                }
            });
        });
    };

    this.onRefresh = function() {

    };

    this.add = function () {
        person.add(self.current().setModifiedOn(), function (jqXhr, status) {
            self.refresh();
            self.current(TypeData.getNewTypeData(self.meta()));
        });
    };

    this.delete = function(data) {
        person.delete(data._id(), function() {
            self.refresh();
        });
    };

    this.getDataRangeByDate = function(numberOfDays, fromBeginning) {
        var returnValue = [];
        
        if (self.data().length < 1) {
            return returnValue; 
        }
        
        for (var i = 0; i < self.data().length; i++) {
            returnValue.push(self.data()[i]);
        }

        returnValue.sort(function(a, b) {
            return a.date() < b.date() ? -1 : 1;
        });
        
        if (!fromBeginning) {
            returnValue.reverse();
        }

        var endDate = new Date(returnValue[0].date().getTime() + (1000 * 60 * 60 * 24 * numberOfDays));

        for (i = 0; i < returnValue.length; i++) {
            if (returnValue[i].date() > endDate) { break; }
        }

        returnValue = returnValue.slice(0, i);
        
        if (!fromBeginning) {
            returnValue.reverse();
        }

        return returnValue;
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

Type.getNewType = function (typeMeta, person) {
    switch (typeMeta.type) {
        case 'bodyWeight':
            return new BodyWeightType(typeMeta, person);
//        case 'gasolinePurchase':
//            return new GasolinePurchaseTypeData(typeMeta, data);
        default:
            return new Type(typeMeta, person);
    }
};