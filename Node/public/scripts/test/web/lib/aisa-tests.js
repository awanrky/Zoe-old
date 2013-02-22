
define(['aisa'], function (a$a) {
    describe('aisa library tests', function () {

        it('a$a should be an object', function() {
            expect(a$a).to.be.an('object');
        });

        describe('date tests', function () {
            
            var baseDate = new Date("1967-03-12T07:30:00.000Z");

            describe('addDays tests', function() {

                it('should handle end of month', function() {
                    var startDate = new Date('2012-01-31T01:00:00.000Z');
                    var newDate = a$a.date.addDays(startDate, 1);
                    expect(newDate.getUTCDate()).to.equal(1);
                });

            });

            describe('toDateString tests', function() {

                it('should return Sunday', function() {
                    expect(a$a.date.toDateString(baseDate)).to.match(/^Sunday/);
                });

                it('should return Monday', function() {
                    expect(a$a.date.toDateString(a$a.date.addDays(baseDate, 1))).to.match(/^Monday/);
                });

                it('should return Tuesday', function () {
                    expect(a$a.date.toDateString(a$a.date.addDays(baseDate, 2))).to.match(/^Tuesday/);
                });

                it('should return Wednesday', function () {
                    expect(a$a.date.toDateString(a$a.date.addDays(baseDate, 3))).to.match(/^Wednesday/);
                });

                it('should return Thursday', function () {
                    expect(a$a.date.toDateString(a$a.date.addDays(baseDate, 4))).to.match(/^Thursday/);
                });

                it('should return Friday', function () {
                    expect(a$a.date.toDateString(a$a.date.addDays(baseDate, 5))).to.match(/^Friday/);
                });

                it('should return Saturday', function () {
                    expect(a$a.date.toDateString(a$a.date.addDays(baseDate, 6))).to.match(/^Saturday/);
                });
            });
        });
    });
});