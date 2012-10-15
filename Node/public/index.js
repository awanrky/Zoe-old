(function() {
	$(document).ready(function() {

		

		ko.applyBindings(new IndexViewModel());

	});

	// function getDistinctTypes(distinctTypesObservableArray, dataLogObservableArray) {
	// 	$.getJSON("/person/get-distinct-types/Mark", function(data) {
	// 		if (dataLogObservableArray) {
	// 			dataLogObservableArray.unshift({d: JSON.stringify(data)});
	// 		}

	// 		distinctTypesObservableArray.removeAll();
	// 		$.each(data, function(index, value) {
	// 			distinctTypesObservableArray.push(value);
	// 		});
	// 	});
	// }

}());