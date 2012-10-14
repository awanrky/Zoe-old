(function() {
	$(document).ready(function() {
		//$('#person').load('Mark');

		function IndexViewModel() {
			var self = this;
			this.firstName = ko.observable("");
			this.middleName = ko.observable("");
			this.lastName = ko.observable("");
			this.fullName = ko.computed(function() {
				return this.firstName() + ' ' + this.middleName() + ' ' + this.lastName();
			}, this);

			this.receivedData = ko.observableArray([{d:''}]);

			$.getJSON("/person/Mark", function(data) {
				self.receivedData.unshift({d: JSON.stringify(data)});
				var person = data[0];
				self.firstName(person.name.first);
				self.middleName(person.name.middle);
				self.lastName(person.name.last);
			});

			this.distinctTypes = ko.observableArray();

			$.getJSON("/person/get-distinct-types/Mark", function(data) {
				self.receivedData.unshift({d: JSON.stringify(data)});
				self.distinctTypes.removeAll();
				$.each(data, function(index, value) {
					self.distinctTypes.push({type: value});
				});
			});
		}

		ko.applyBindings(new IndexViewModel());

	});
}());