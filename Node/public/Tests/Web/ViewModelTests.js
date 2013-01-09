describe('View Model', function () {

    var indexViewModel;

    beforeEach(function() {
        indexViewModel = new IndexViewModel(new PersonMock('Mark', ko.observableArray([{ d: '' }])));
    });

    describe('IndexViewModel', function() {
        it('should be an object', function() {
            expect(indexViewModel).to.be.an('object');
        });

        it('should have person meta', function() {
            expect(indexViewModel.personMeta.firstName()).to.equal('Mark');
            expect(indexViewModel.personMeta.middleName()).to.equal('Gilbert');
            expect(indexViewModel.personMeta.lastName()).to.equal('Ott');
            expect(indexViewModel.personMeta.fullName()).to.equal('Mark Gilbert Ott');
        });

        it('should have types', function() {
            expect(indexViewModel.types()).to.be.an('array');
            expect(indexViewModel.types()).to.have.length(2);
            expect(indexViewModel.types()[0].name()).to.equal('bodyWeight');
            expect(indexViewModel.types()[1].name()).to.equal('gasolinePurchase');
        });
    });
});