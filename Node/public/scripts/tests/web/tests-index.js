requirejs.config({
    baseurl: '/',
    paths: {
        'jquery': 'mocks/jquery-mock',
        'indexviewmodel': '../../viewmodel/index'
    },
    shim: {
//        'bootstrap': ['jquery']
    }
});

requirejs(['viewmodel/index-tests'], function () {

    mocha.run();

});