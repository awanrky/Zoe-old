describe('zoe/mongodb', function () {

    var configuration = require('../../../../../zoe-configuration.js');
    var mongodb       = require('../../../../../zoe/mongodb');
    var expect = require('chai').expect;

    var mocks = {};

    mocks.logger = require('../mocks/logger');

    var mongo;

    beforeEach(function () {
        mocks.logger.clear();
        mongo = mongodb(configuration, mocks.logger);
    });

    describe('mongodb', function () {

        it('should get a function from mongodb', function () {
            expect(mongo).to.be.a('function');
        });

        it('should have a database connection object', function() {
            expect(mongo.db).to.be.an('object');
        });

        it('should initialize a closed database connection', function() {
            expect(mongo.isOpen()).to.equal(false);
            expect(mongo.db.state).to.equal('disconnected');
        });

        it('should open the database connection', function(done) {
            mongo.open(function() {
                expect(mongo.isOpen()).to.equal(true);
                expect(mongo.db.state).to.equal('connected');
                done();
            });
        });

        it('should not require a logger', function(done) {
            var mongoWithoutLogger = mongodb(configuration);
            mongoWithoutLogger.open(function () {
                expect(mongoWithoutLogger.isOpen()).to.equal(true);
                done();
            });
        });

        it('should write to log', function(done) {
            mongo.open(function() {
                expect(mocks.logger.size()).to.equal(1);
                expect(mocks.logger.get(0)).to.equal('localhost:27017/ZoeDevelopment: Open');
                done();
            });
        });

    });
});