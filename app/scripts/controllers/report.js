'use strict';


angular.module('electionApp')
  .controller('reportCtrl', ["parties", function (parties) {
    var me = this;

    var dummyData = parties.map(function(party){
      return {party: party.abbreviation || party.party_name.substr(0,2), count: Math.floor(Math.random() * 20)}
    });

    var drawBarChart = function(){
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      // var formatPercent = d3.format(".0%");

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1, 1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          // .tickFormat(formatPercent);

      var svg = d3.select("#party-bar-chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x.domain(dummyData.map(function(d) { return d.party; }));
        y.domain([0, d3.max(dummyData, function(d) { return d.count; })]);

        svg.append("g")
            .attr("class", "barchart x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start");;

        svg.append("g")
            .attr("class", "barchart y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Member Count");

        svg.selectAll(".bar")
            .data(dummyData)
          .enter().append("rect")
            .attr("fill", function(d, i){
              var colorRange = d3.scale.category20().range();
              return colorRange[( i % colorRange.length)];
            })
            .attr("class", "barchart bar")
            .attr("x", function(d) { return x(d.party); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); });

        d3.select("input").on("change", change);

        var sortTimeout = setTimeout(function() {
          d3.select("input").property("checked", true).each(change);
        }, 2000);

        function change() {
          clearTimeout(sortTimeout);

          // Copy-on-write since tweens are evaluated after a delay.
          var x0 = x.domain(dummyData.sort(this.checked
              ? function(a, b) { return b.count - a.count; }
              : function(a, b) { return d3.ascending(a.party, b.party); })
              .map(function(d) { return d.party; }))
              .copy();

          svg.selectAll(".bar")
              .sort(function(a, b) { return x0(a.party) - x0(b.party); });

          var transition = svg.transition().duration(750),
              delay = function(d, i) { return i * 50; };

          transition.selectAll(".bar")
              .delay(delay)
              .attr("x", function(d) { return x0(d.party); });

          transition.select(".x.axis")
              .call(xAxis)
            .selectAll("g")
              .delay(delay);
        }
    };

    me.drawBarChart = drawBarChart;
    console.log("Inside then callback");
    drawBarChart();
       
  }]);