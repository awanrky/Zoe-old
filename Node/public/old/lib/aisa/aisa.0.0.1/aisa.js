aisa = {};
(function() {
    "use strict";

    aisa.extends = function(derivedClass, baseClass) {
        derivedClass.superclass = {
            constructor: baseClass
        };
    };
}());