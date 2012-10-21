
function TypeMeta(type) {
    var self = this;

    this.id = ko.observable(type._id);
    this.createdOn = ko.observable(type.createdOn);
    this.type = ko.observable(type.type);
    this.name = ko.observable(type.name);
    this.description = ko.observable(type.description);
    this.source = ko.observable(type.source);
    this.value = ko.observable(type.value);
    this.typeMeta = ko.observable(type.typeMeta);
    this.tags = ko.observableArray(type.tags);
}

function TypeData(type) {
    var self = this;
    var raw;
    var rawData;

	this._id = ko.observable();
    this.createdOn = ko.observable();
	this.type = ko.observable();
	this.name = ko.observable();
	this.description = ko.observable();
	this.source = ko.observable();
	this.value = ko.observable();
    
    switch (typeof type) {
        case 'string':
            raw = type;
            rawData = parseType();
            setDefault(rawData);
            break;
        case 'object':
            raw = undefined;
            rawData = type;
            setDefault(rawData);
            break;
        default:
            raw = undefined;
            rawData = undefined;
            setType();
            break;
    }
    
    function parseType() {
        return ko.parseJSON(type);
    }

    function setDefault(value) {
        self._id(value._id);
        self.createdOn(value.createdOn);
        self.type(value.type);
        self.name(value.name);
        self.description(value.description);
        self.source(value.source);
        self.value(value.value);
    };

    function setType(typeName) {
        setDefault({});
        self.createdOn(new Date());
        self.type(typeName);
    };

    this.setDate = function(date) {
        if (typeof date === 'undefined') {
            date = new Date();
        }

        self.createdOn(date);
        return self;
    };

}

function Type(name, person) {
    var self = this;
    
    this.name = ko.observable(name);
    this.meta = ko.observableArray();
    this.data = ko.observableArray();
    this.current = ko.observable(new TypeData({type:'bodyWeight'}));
    
    this.refresh = function () {
        self.meta.removeAll();
        self.data.removeAll();
        person.getTypeData(this.name(), function (data) {
            $.each(data, function (index, value) {
                if (value.typeMeta === self.name()) {
                    self.meta.push(new TypeMeta(value));
                } else {
                    self.data.push(new TypeData(value));
                }
            });
        });
    };
    
    this.add = function () {
        person.add(this.current().setDate(), function (jqXhr, status) {
            self.refresh();
        });
    };
    
}

function IndexViewModel() {
    "use strict";
	var self = this;

	/**
	 * An ObservableArray that holds one element for each ajax call made
	 */
	this.receivedData = ko.observableArray([{ d: '' }]);
    
	var person = new Person('Mark', this.receivedData);
    
	this.current = ko.observable(new Type());
    this.types = ko.observableArray();

	/**
	 * An object that holds information about the current person
	 */
	this.personMeta = getPersonMeta();

	/**
	 * Gets the id of the correct template to use for this type, or the default template if
	 * this type does not have a template
	 */
    this.getTypeTemplate = function(distinctType) {
        var templateName = 'type-template-' + distinctType.name();
        if ($('#' + templateName).length === 0) {
            return 'type-template-default';
        }
        return templateName;
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
	        $.each(typesArray, function (index, value) {
	            types.push(new Type(value.type, person));
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