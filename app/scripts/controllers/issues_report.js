'use strict';


angular.module('electionApp')
  .controller('issuesReportCtrl', [function () {
    var me = this;
    var d3 = window.d3;

    var dummyData = [];

    this.issues = [
      { "_id" : null, "count" : 1093 },
      { "_id" : "Infrasturctural Development", "count" : 749 },
      { "_id" : "Administration", "count" : 365 },
      { "_id" : "Health", "count" : 317 },
      { "_id" : "Education", "count" : 311 },
      { "_id" : "Agriculture", "count" : 210 },
      { "_id" : "Services", "count" : 188 },
      { "_id" : "Environment", "count" : 144 },
      { "_id" : "Social Welfare", "count" : 109 },
      { "_id" : "Transportation", "count" : 106 },
      { "_id" : "Business", "count" : 94 },
      { "_id" : "Energy", "count" : 83 },
      { "_id" : "Development", "count" : 70 },
      { "_id" : "Finance", "count" : 60 },
      { "_id" : "Politics", "count" : 50 },
      { "_id" : "Real Estate", "count" : 49 },
      { "_id" : "Culture", "count" : 46 },
      { "_id" : "Taxation", "count" : 45 },
      { "_id" : "Sport", "count" : 39 },
      { "_id" : "Labour", "count" : 36 },
      { "_id" : "Land Grab", "count" : 35 },
      { "_id" : "Industry", "count" : 34 },
      { "_id" : "Civic Rights", "count" : 34 },
      { "_id" : "Legislation", "count" : 32 },
      { "_id" : "Judiciary", "count" : 30 },
      { "_id" : "Ethnic Affairs", "count" : 25 },
      { "_id" : "Breeding", "count" : 18 },
      { "_id" : "Tourism", "count" : 17 },
      { "_id" : "Mining", "count" : 10 },
      { "_id" : "Peace", "count" : 9 },
      { "_id" : "Religion", "count" : 7 },
      { "_id" : "34", "count" : 6 },
      { "_id" : "Military", "count" : 4 },
      { "_id" : "33", "count" : 3 },
      { "_id" : "Educatoin", "count" : 2 },
      { "_id" : "", "count" : 1 },
      { "_id" : "36", "count" : 1 }
    ];

    dummyData = this.issues;

    var drawBarChart = function(){
      var margin = {top: 40, right: 20, bottom: 30, left: 100},
          width = 960 - margin.left - margin.right,
          height = 1000 - margin.top - margin.bottom;

      // var formatPercent = d3.format(".0%");

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, height], 0.1, 1);

      var y = d3.scale.linear()
          .range([0, width]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("left")
          .tickPadding(margin.left - 20)
          ;

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("top");
          // .tickFormat(formatPercent);

      var svg = d3.select("#issues-bar-chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x.domain(dummyData.map(function(d) { return d._id; }));
        y.domain([0, d3.max(dummyData, function(d) { return d.count; })]);

        svg.append("g")
            .attr("class", "barchart x axis")
            .attr("transform", "translate(0," + margin.left + ")")
            .call(xAxis)
            .selectAll("text")
                .style("text-anchor", "start")
                ;

        svg.append("g")
            .attr("class", "barchart y axis")
            .call(yAxis)
          .append("text")
            // .attr("transform", "translate(" + [margin.left + 40, margin.top ] + ")")
            // .attr("y", 6)
            // .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Member Count");

        svg.selectAll(".bar")
            .data(dummyData)
          .enter().append("rect")
            .attr("fill", function(d, i){
              var colorRange = d3.scale.category20().range();
              return colorRange[(i % colorRange.length)];
            })
            .attr("class", "barchart bar")
            .attr("x", function(d) { return 0; })
            .attr("height", x.rangeBand())
            .attr("y", function(d) { return x(d._id) + margin.top; })
            .attr("width", function(d) { return width - y(d.count); });

        function change() {
          clearTimeout(sortTimeout);

          // Copy-on-write since tweens are evaluated after a delay.
          var sortFunction = this.checked ? 
                function(a, b) { return b.count - a.count; }
              : function(a, b) { return d3.ascending(a._id, b._id); };
          var x0 = x.domain(
                dummyData.sort(sortFunction).map(function(d) { return d._id; })
              )
              .copy();

          svg.selectAll(".bar")
              .sort(function(a, b) { return x0(a._id) - x0(b._id); });

          var transition = svg.transition().duration(750),
              delay = function(d, i) { return i * 50; };

          transition.selectAll(".bar")
              .delay(delay)
              .attr("y", function(d) { return x0(d._id) + margin.top; });

          transition.select(".x.axis")
              .call(xAxis)
            .selectAll("g")
              .delay(delay);
        }

        d3.select("input").on("change", change);

        var sortTimeout = setTimeout(function() {
          d3.select("input").property("checked", true).each(change);
        }, 2000);

    };

    var drawPieChart = function(data){
      var width = 300;
      var height = 300;
      var radius = 100;

      var counts = data.map(function(d){return d.count});
      // var color = d3.scale.linear()
      //     .domain([d3.min(counts), d3.max(counts)])
      //     .range(["red", "white", "green"]);
      var color = d3.scale.category20();

    console.log(color(300));

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.count; });

      var svg = d3.select("#issues-pie-chart").append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
            .data(pie(data))
          .enter().append("g")
            .attr("class", "arc")
            .style("fill", function(d, i) { 
              return color(i); 
            });

        g.append("path")
            .attr("d", arc);

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function(d) { return d; });
    };

    me.drawBarChart = drawBarChart;
    console.log("Inside then callback");
    drawBarChart();
    // drawPieChart(this.issues);
       
  }]);