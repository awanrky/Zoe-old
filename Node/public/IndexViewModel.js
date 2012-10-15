function IndexViewModel() {
	var self = this;

	this.receivedData = ko.observableArray([{d:''}]);

	this.distinctTypes = ko.observableArray();

	this.personMeta = getPersonMeta();

	var person = new Person('Mark', this.receivedData);

	getPersonMetaData(this.personMeta);
	getDistinctTypes(this.distinctTypes);


	this.getTypeTemplate = function(distinctType) {
		var templateName = 'type-template-' + distinctType.type;
		if ($('#' + templateName).length === 0) {
			return 'type-template-default';
		}
		return templateName;
	}

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