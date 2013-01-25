(function () {
    "use strict";
    
    /**
     *  Zoe.BodyWeightChart
     *  @class
     *
     *  @param c                contains the initial configuration of this chart
     *      c.containingDiv     dom object or id referencing a dom object that will hold this chart (required)
     *      c.numberOfDays      chart will span this number of days (optional)
     *      c.size              object defining the size of this chart { x: ?, y: ?, width: ?, height: ? } (optional)
     *      c.borders           object defining the size of this chart's borders { left: ?, top: ?, right: ?, bottom: ? } (optional)
     *
     */
    Zoe.BodyWeightChart = function (c) {
        var self = this;

        c.numberOfDays = c.numberOfDays || 30;
        
        setSize();

        this.refresh = function (type) {

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

            self.raphael.rect(c.size.x, c.size.y, c.size.width, c.size.height);

            //            self.raphael.rect(c.content.x, c.content.y, c.content.width, c.content.height);

            var points = getPoints(data, minimumWeight, maximumWeight);

            self.raphael.path(getLinePath(points));
            self.raphael.path(getHashPath(points));
            writeHorizontalScale(points);

//            self.raphael.path(getPath(data, minimumWeight, maximumWeight));
//            self.raphael.path("M10,20L15,25L30,20");
        };

        this.raphael = Raphael(c.containingDiv, c.size.width, c.size.height);

        //this.raphael.circle(50, 40, 10).attr("fill", "#f00");

        function invertY(value) {
            return Math.abs(value - c.content.height);
        }

        function getDayX(day, numberOfDays) {
            if (numberOfDays < 2) {
                return c.content.width - c.content.x;
            }
            
            return (day * Math.round(
                c.content.width / (numberOfDays - 1)
            ) + c.content.x);
        }
        
        function getWeightY(weight, minimumWeight, maximumWeight) {
            var height = c.content.height - c.content.y;
            return invertY(
                Math.round(((weight - minimumWeight) * (height / (maximumWeight - minimumWeight))))
            );
        }
        
        function getPathPoint(day, value, numberOfDays, min, max) {
            return {
                x: getDayX(day, numberOfDays),
                y: getWeightY(value, min, max)
            };
        }
        
        function formatLinePathPoint(point, type) {
            if (typeof type === 'undefined') {
                type = "L"; 
            }

            return type + point.x + "," + point.y;
        }
        
        function formatHashPathPoint(point) {
            return [
                "M",
                point.x,
                ",",
                c.size.height,
                "L",
                point.x,
                ",",
                c.size.height - c.borders.bottom,
                formatLinePathPoint(point, "M")
            ].join('');
        }
        
        function getPoints(data, min, max) {
            var returnValue = [];
            
            if (data.length < 1) {
                return returnValue; 
            }

            for (var i = 0; i < data.length; i++) {
                returnValue.push(getPathPoint(i, data[i].value(), data.length, min, max));
            }

            return returnValue;
        }
        
        function getLinePath(points) {
            var a = [];

            a.push(formatLinePathPoint(points[0], "M"));
            
            for (var i = 1; i < points.length; i++) {
                a.push(formatLinePathPoint(points[i]));
            }

            return a.join('');
        }
        
        function getHashPath(points) {
            var a = [];

            for (var i = 0; i < points.length; i++) {
                a.push(formatHashPathPoint(points[i]));
            }

            return a.join('');
        }
        
        function writeHorizontalScale(points) {
            for (var i = 0; i < points.length; i++) {
                self.raphael.text(points[i].x, c.content.height, i);
            }
        }
        
        function setSize() {
            if (typeof c.size != 'object') {
                c.size = {};
            }
            
            if (typeof c.size.x === 'undefined') {
                c.size.x = 0;
            }
            
            if (typeof c.size.y === 'undefined') {
                c.size.y = 0;
            }
            
            if (typeof c.size.width === 'undefined') {
                c.size.width = 600;
            }
            
            if (typeof c.size.height === 'undefined') {
                c.size.height = 100;
            }
            
            if (typeof c.borders != 'object') {
                c.borders = {};
            }
            
            if (typeof c.borders.left === 'undefined') {
                c.borders.left = 10;
            }

            if (typeof c.borders.top === 'undefined') {
                c.borders.top = c.borders.left;
            }

            if (typeof c.borders.right === 'undefined') {
                c.borders.right = c.borders.left;
            }
            
            if (typeof c.borders.bottom === 'undefined') {
                c.borders.bottom = c.borders.top;
            }

            c.content = {
                x: c.size.x + c.borders.left,
                y: c.size.y + c.borders.top,
                width: c.size.width - c.borders.left - c.borders.right,
                height: c.size.height - c.borders.top - c.borders.bottom
            };
        }

    };
}());