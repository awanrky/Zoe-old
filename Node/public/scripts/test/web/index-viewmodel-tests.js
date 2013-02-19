
define(['index-viewmodel', 'jquery'], function(IndexViewModel, $) {
    describe('Index View Model tests', function() {

        var indexViewModel = new IndexViewModel($);

        describe('properties', function() {
            it('should have a title', function() {
                expect(indexViewModel.title).to.equal('This is a title');
            });

            it('should have a person', function() {
                expect(indexViewModel.person).to.be.an('object');
            });
        });
    });
});