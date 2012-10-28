(function() {
    "use strict";

	var indexViewModel = new IndexViewModel();

	$(document).ready(function() {

		ko.applyBindings(indexViewModel);
		
	});

}());