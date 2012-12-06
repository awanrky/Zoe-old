function BodyWeightType(typeMeta, person) {
    "use strict";

    var self = this;

    var chart = undefined;

    BodyWeightType.superclass.constructor.call(this, typeMeta, person);

    this.onRefresh = function() {
        if (typeof chart === 'undefined') {
            chart = new Zoe.BodyWeightChart('bodyWeight-chart');
        }
        chart.refresh(self);
    };
}

aisa.extends(BodyWeightType, Type);