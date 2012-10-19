
function PersonData() {
	var self = this;

	function Base() {
		this.id = ko.observable();
		this.date = new Date();
		this.type = ko.observable();
		this.name = ko.observable();
		this.description = ko.observable();
		this.source = ko.observable();
		this.value = ko.observable();
	}


	this.getBase = function() { return new Base(); }

	this.getWeight = function(weight) {
		if (typeof weight === 'undefined') { weight = 0; }
		var base = new Base();
		base.type("bodyWeight");
		base.value(weight);
		return base;
	}

	this.getType = function(type) {
		switch(type) {
			case 'bodyWeight':
				return self.getWeight();
			default:
				return self.getBase();
		}
	}
}

function IndexViewModel() {
	"use strict;"
	var self = this;

	var personData = new PersonData();

	this.currentType = ko.observable();
	this.currentTypeData = ko.observableArray();
	this.currentTypeMeta = ko.observableArray();
	this.currentTypeCurrentValue = ko.observable(personData.getBase());

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

	this.setCurrentType = function(type) {
		this.currentType(type);
		this.currentTypeMeta.removeAll();
		this.currentTypeData.removeAll();
		person.getTypeData(type, function(data) {
			$.each(data, function(index, value) {
				if (value.typeMeta === type) {
					self.currentTypeMeta.push(value)
				} else {
					self.currentTypeData.push(value);
				}
			});
		});
		self.currentTypeCurrentValue(personData.getType(type));
	}

	this.updateCurrentValue = function() {
		person.add(self.currentTypeCurrentValue, function(jqXHR, status) {
			self.setCurrentType(self.currentType());
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