function IndexViewModel(person) {
    "use strict";
	var self = this;
    
    this.receivedData = person.receivedData;
    
	this.current = ko.observable(new Type());
    this.types = ko.observableArray();

	/**
	 * An object that holds information about the current person
	 */
	this.personMeta = getPersonMeta();

    this.getTypeTemplate = function(type) {
        return type.getTypeTemplate();
    };

    this.onClickTab = function(data) {
        self.current(data);
        data.refresh();
    };

	getPersonMetaData(this.personMeta);
	getDistinctTypes(this.types);

	function getDistinctTypes(types) {
	    types.removeAll();
	    person.getDistinctTypes(function (typesArray) {
	        $.each(typesArray, function (index, typeMeta) {
	            types.push(Type.getNewType(typeMeta, person));
	        });
	    });
	};

	function getPersonMetaData(personMeta) {
	    person.getMeta(function(meta) {
	        personMeta.firstName(meta.name.first);
	        personMeta.middleName(meta.name.middle);
	        personMeta.lastName(meta.name.last);
	    });
	}

	function getPersonMeta() {
	    var meta = {
	        firstName: ko.observable(),
	        middleName: ko.observable(),
	        lastName: ko.observable()
	    };
		meta.fullName = ko.computed(function() {
			return meta.firstName() + ' ' + meta.middleName() + ' ' + meta.lastName();
		});
		return meta;
	}
}