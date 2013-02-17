
define(['indexviewmodel', 'jquery'], function(IndexViewModel, $) {
    describe('Index View Model tests', function() {

        var indexViewModel = new IndexViewModel($);

        describe('getPerson', function() {
            it('should return a person with a full name', function() {
                var actual;
                var personName = "Mark Gilbert Ott";
                var expected = "/person/byname/Mark/Gilbert/Ott";
                indexViewModel.getPerson(personName, function(route) { actual = route; });

                expect(actual).to.equal(expected);
            });
        });
    });
});