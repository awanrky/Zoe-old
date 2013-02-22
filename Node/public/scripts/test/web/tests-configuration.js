requirejs.config({
    baseurl: '/',
    paths: {
        'jquery': 'mocks/jquery-mock',
        'knockout': '../../lib/knockout',
        'index-viewmodel': '../../index-viewmodel',
        'person-viewmodel': '../../person-viewmodel',
        'aisa': '../../lib/aisa'
    },
    shim: {
//        'bootstrap': ['jquery']
    }
});

requirejs(['index-viewmodel-tests', 'person-viewmodel-tests', 'lib/aisa-tests'], function () {

    mocha.run();

});