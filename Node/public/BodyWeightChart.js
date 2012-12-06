(function () {
    "use strict";
    Zoe.BodyWeightChart = function (containingDiv, initialSize) {
        var self = this;

        this.numberOfDays = 30;

        this.size = initialSize || {
            w: 600,
            h: 150
        };

        this.refresh = function (type) {
//            var data = self.Type.getDataRangeByDate(30, false);

            var data = type.getDataRangeByDate(30, false);

            if (data.length < 1) {
                return;
            }

            data.sort(function (a, b) {
                return a.value() < b.value() ? -1 : 1;
            });

            var minimumWeight = data[0].value();
            var maximumWeight = data[data.length - 1].value();

            data.sort(function(a, b) {
                return a.date() < b.date() ? -1 : 1;
            });

            self.raphael.clear();

            self.raphael.rect(0, 0, this.size.w, this.size.h);

            self.raphael.path(getPath(data, minimumWeight, maximumWeight));
//            self.raphael.path("M10,20L15,25L30,20");
        };

        this.raphael = Raphael(containingDiv, this.size.width, this.size.height);

        //this.raphael.circle(50, 40, 10).attr("fill", "#f00");



        function getDayX(day, numberOfDays) {
            return day * Math.round(self.size.w / (numberOfDays + 1));
        }
        
        function getWeightY(weight, minimumWeight, maximumWeight) {
            return Math.abs( Math.round(((weight - minimumWeight) * (self.size.h / (maximumWeight - minimumWeight)) )) - self.size.h);
        }
        
        function getPath(d, minimumWeight, maximumWeight) {
            if (d.length < 1) {
                return ""; 
            }
            
            var returnValue = "M" + getDayX(0, d.length) + "," + getWeightY(d[0].value(), minimumWeight, maximumWeight);

            for (var i = 1; i < d.length; i++) {
                returnValue = returnValue + "L" + getDayX(i, d.length) + "," + getWeightY(d[i].value(), minimumWeight, maximumWeight);
            }

            return returnValue;
        }

    };
}());