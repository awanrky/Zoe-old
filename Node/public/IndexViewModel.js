
function PersonData() {
	var self = this;

	this.id = ko.observable();
	this.date = new Date();
	this.type = ko.observable();
	this.name = ko.observable();
	this.description = ko.observable();
	this.source = ko.observable();
	this.value = ko.observable();

	this.setDefault = function(value) {
		self.id(undefined);
		self.date = new Date();
		self.type(undefined);
		self.name(undefined);
		self.description(undefined);
		self.source(undefined);
		self.value(value);
		return self;
	}

	this.setWeight = function(value) {
		if (typeof value === 'undefined') { value = 0; }
		self.setDefault(value);
		self.type("bodyWeight");
		return self;
	}

	this.setType = function(type, value) {
		switch(type) {
			case 'bodyWeight':
				return self.setWeight(value);
			default:
				return self.setDefault(value);
		}
	}

	this.setDefault();
}

function IndexViewModel() {
	"use strict;"
	var self = this;

	var personData = new PersonData();

	this.currentType = ko.observable();
	this.currentTypeData = ko.observableArray();
	this.currentTypeMeta = ko.observableArray();
	this.currentTypeCurrentValue = new PersonData();

	/**
	 * An ObservableArray that holds one element for each ajax call made
	 */
	this.receivedData = ko.observableArray([{d:''}]);

	/**
	 * An ObservableArray that holds all categories currently in the database
	 */
	this.distinctTypes = ko.observableArray();

	/**
	 * An object that holds information about the current person
	 */
	this.personMeta = getPersonMeta();

	/**
	 * Gets the id of the correct template to use for this type, or the default template if
	 * this type does not have a template
	 */
	this.getTypeTemplate = function(distinctType) {
		var templateName = 'type-template-' + distinctType.type;
		if ($('#' + templateName).length === 0) {
			return 'type-template-default';
		}
		return templateName;
	}

	this.refreshTypeData = function() {
		var type = self.currentType()
		self.currentTypeMeta.removeAll();
		self.currentTypeData.removeAll();
		person.getTypeData(self.currentType(), function(data) {
			$.each(data, function(index, value) {
				if (value.typeMeta === type) {
					self.currentTypeMeta.push(value)
				} else {
					self.currentTypeData.push(value);
				}
			});
		});		
	}

	this.setCurrentType = function(type) {
		self.currentType(type);
		self.currentTypeCurrentValue = personData.setType(type);
		self.refreshTypeData();
	}

	this.updateCurrentValue = function() {
		person.add(self.currentTypeCurrentValue, function(jqXHR, status) {
			self.refreshTypeData();
		});
	}

	this.handleAfterPillRender = function(elements, data) {
		// TODO: this is not efficient.  Should add the handler to the element just added instead of removing all the handlers and re-adding them all
		$('a[data-toggle="pill"]').off('show');
		$('a[data-toggle="pill"]').on('show', function(e) {
			var tab = e.target;
			var dataType = $(tab).attr('data-type');
			self.setCurrentType(dataType);
		});			
	}


	var person = new Person('Mark', this.receivedData);

	getPersonMetaData(this.personMeta);
	getDistinctTypes(this.distinctTypes);

	function getDistinctTypes(types) {
		types.removeAll();
		person.getDistinctTypes(function(typesArray) {
			$.each(typesArray, function(index, value) {
				types.push(value);
			});
		});
	}

	function getPersonMetaData(personMeta) {
		person.getMeta(function(meta) {
			personMeta.firstName(meta.name.first);
			personMeta.middleName(meta.name.middle);
			personMeta.lastName(meta.name.last);
		})
	}

	function getPersonMeta() {
		var meta = {
			firstName: ko.observable(),
			middleName: ko.observable(),
			lastName: ko.observable()
		}
		meta.fullName = ko.computed(function() {
			return meta.firstName() + ' ' + meta.middleName() + ' ' + meta.lastName();
		});
		return meta;
	}
}