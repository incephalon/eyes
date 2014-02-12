
baseballApp.directive('hitBars', function (d3Service) {
    return {
        restrict: 'C',
        scope: {
            data: "=",
            label: "@"
        },

        link: function (scope, iElement) {

            var margin = { top: 20, right: 20, bottom: 50, left: 40 },
                width = d3Service.select(iElement[0])[0][0].offsetWidth - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var x = d3.time.scale().range([0, width]);;
            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickSize(0);
            //.ticks(d3.time.month, 1)
            //.tickFormat(d3.time.format('%a %d'));

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format("d"));;

            var svg = d3Service.select(iElement[0]).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // watch for data changes and re-render
            scope.$watch('data', function (newVals) {
                return scope.render(newVals);
            }, true);

            scope.render = function (data) {

                svg.selectAll("*").remove();

                if (data.length < 1) {
                    return;
                }

                x.domain([new Date(data[0].timeStamp), new Date(data[data.length - 1].timeStamp)]);
                y.domain([0, d3.max(data, function (game) { return game.h; })]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", function (d) {
                            return "rotate(-35)";
                        });

                var barWidth = width / data.length - 4;
                barWidth = barWidth > 0 ? barWidth : 1;

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end");
                    //.text("Hits");

                svg.selectAll(".bar")
                    .data(data)
                  .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (game) { return x(new Date(game.timeStamp)); })
                    .attr("width", barWidth)
                    .attr("y", function (game) { return y(game.h); })
                    .attr("height", function (game) { return height - y(game.h); });

            };
        }
    };
});