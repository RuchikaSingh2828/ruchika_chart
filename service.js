angular.module('d3', [])
    .factory('d3Service', [function() {
        // scriptTag.src = 'http://d3js.org/d3.v3.min.js';
        var d3 = window.d3;

        var margin = {
                top: 10,
                right: 20,
                bottom: 50,
                left: 60
            },
            width = 1000 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // Parse the date / time
        // var parseDate = d3.time.format("%Y-%m").parse;

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(50);
        // .tickFormat(d3.time.format("%Y-%m"));

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(15);

        var svg = d3.select("body div div").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        d3.json('https://api.coinmarketcap.com/v1/ticker/?limit=10', function(data) {

            data.forEach(function(d) {
                d.id = d.id;
                d.price_usd = +d.price_usd;
            });

            x.domain(data.map(function(d) {
                return d.id;
            }));

            y.domain([0, d3.max(data, function(d) {
                return d.price_usd;
            })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-90)");

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end");

            svg.selectAll("bar")
                .data(data)
                .enter().append("rect")
                .style("fill", "steelblue")
                .attr("x", function(d) {
                    return x(d.id);
                })
                .attr("width", x.rangeBand())
                .attr("y", function(d) {
                    return y(d.price_usd);
                })
                .attr("height", function(d) {
                    return height - y(d.price_usd);
                });

        });


        return d3;
    }]);
// angular.module('myApp', ['d3'])

// angular.module('myApp.directives', ['d3']).directive('blogBarChart', ['d3Service', function(d3Service) {
//     return {
//         restrict: 'EA',
//         scope: {},
//         link: function(scope, element, attrs) {
//             d3Service.d3().then(function(d3) {
//                 // d3 is the raw d3 object
//                 //return bar - data.csv;
//             });
//         }
//     }
// }]);