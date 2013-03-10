(function() {
    "use strict";

    var indexViewModel = new IndexViewModel(new Person('Mark', ko.observableArray([{ d: '' }])));

	$(document).ready(function() {

	    ko.applyBindings(indexViewModel);



	});

}());