(function() {
	"use strict;"

	var indexViewModel = new IndexViewModel();

	$(document).ready(function() {

		indexViewModel.distinctTypes.subscribe(function() {
			$('a[data-toggle="pill"]').on('show', function(e) {
				var tab = e.target;
				var dataType = $(tab).attr('data-type');
				indexViewModel.setCurrentType(dataType);
			});			
		});

		ko.applyBindings(indexViewModel);


	});

}());