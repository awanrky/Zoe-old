function GasolinePurchaseTypeData(typeMeta, data) {
    "use strict";
    
    GasolinePurchaseTypeData.superclass.constructor.call(this, typeMeta, data);

    this.odometerReading = ko.observable();
    this.totalGallons = ko.observable();
    this.dollarsPerGallon = ko.observable();
    this.totalCharge = ko.observable();
    this.gasolineType = ko.observable();
    this.store = ko.observable();
    this.paymentMethod = ko.observable();
    this.vehicle = ko.observable();
    
    if (_.isUndefined(data)) {
        return;
    }

    this.odometerReading(data.odometerReading);
    this.totalGallons(data.totalGallons);
    this.dollarsPerGallon(data.dollarsPerGallon);
    this.totalCharge(data.totalCharge);
    this.gasolineType(data.gasolineType);
    this.store(data.store);
    this.paymentMethod(data.paymentMethod);
    this.store(data.vehicle);

}

aisa.extends(GasolinePurchaseTypeData, TypeData);
