//var _ = require('underscore'),
//    mongo = require('../../zoe/mongodb');

var c;

exports = module.exports = initialize;

function initialize(config) {
    c = config;

    setUpRoutes();
};

function setUpRoutes() {
    c.app.get(c.baseRoute + '/body-weight', getByPersonId);
}

function getByPersonId(req, res) {
    res.set('Cache-Control', 'no-cache');
    var id = req.params.id;
    res.send("test " + id);
}