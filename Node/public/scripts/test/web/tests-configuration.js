requirejs.config({
    baseurl: '/',
    paths: {
        'jquery': 'mocks/jquery-mock',
        'knockout': '../../lib/knockout',
        'index-viewmodel': '../../index-viewmodel',
        'person-viewmodel': '../../person-viewmodel'
    },
    shim: {
//        'bootstrap': ['jquery']
    }
});

requirejs(['index-viewmodel-tests', 'person-viewmodel-tests'], function () {

    mocha.run();

});