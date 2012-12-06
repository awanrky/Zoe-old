(function() {
    "use strict";

	var indexViewModel = new IndexViewModel();

	$(document).ready(function() {

	    ko.applyBindings(indexViewModel);



	});

//    $(window).load(function() {
//        $('a[data-toggle="pill"]').on('shown', function(e) {
//	        new Zoe.BodyWeightChart('bodyWeight-chart', indexViewModel);
//	    });
//    });

}());