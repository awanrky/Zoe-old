define(['person-viewmodel', 'jquery'], function (PersonViewModel, $) {
    describe('Person View Model tests', function () {

        var personViewModel = new PersonViewModel($);

        describe('getPerson', function () {
            it('should return a person with a full name', function () {
                var actual;
                var personName = "Mark Gilbert Ott";
                var expected = "/person/byname/Mark/Gilbert/Ott";
                personViewModel.getPerson(personName, function (route) { actual = route; });

                expect(actual).to.equal(expected);
            });
        });

        describe('parseData', function () {
            var data = [{
                "_id": "50fadd24f1f4ee6fed459a6f",
                "name": {
                    "first": "Mark",
                    "middle": "Gilbert",
                    "last": "Ott"
                },
                "birthday": "1967-03-13T07:30:00Z",
                "createdOn": "2013-01-19T17:51:32.075Z",
                "source": "Mark.js"
            }];

            personViewModel.parseData(data);

            it('should compute the correct full name', function() {
                expect(personViewModel.fullName()).to.equal('Mark Gilbert Ott');
            });

            it('should get the correct first name', function() {
                expect(personViewModel.name().first()).to.equal('Mark');
            });
            
            it('should get the correct middle name', function () {
                expect(personViewModel.name().middle()).to.equal('Gilbert');
            });
            
            it('should get the correct last name', function () {
                expect(personViewModel.name().last()).to.equal('Ott');
            });
            
            it('should get the correct id', function () {
                expect(personViewModel.id()).to.equal('50fadd24f1f4ee6fed459a6f');
            });

            it('should get the correct birthday', function () {
                expect(personViewModel.birthday().toString()).to.equal((new Date('1967-03-13T07:30:00.000Z')).toString());
            });

            it('should get the correct created on date', function () {
                expect(personViewModel.createdOn().toString()).to.equal((new Date('2013-01-19T17:51:32.075Z')).toString());
            });

            it('should get the correct source information', function () {
                expect(personViewModel.source()).to.equal('Mark.js');
            });
        });
    });
});