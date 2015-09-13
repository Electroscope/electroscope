'use strict';

/**
 * @ngdoc function
 * @name electionApp.controller:MaptestCtrl
 * @description
 * # MaptestCtrl
 * Controller of the electionApp
 */
angular.module('electionApp')
  .controller('maptestCtrl', function () {
    var d3 = window.d3;
    var width = 400,
        height = 800;
    var projection = d3.geo.mercator();
        projection.scale(1).translate([0,0]);

    var svg = d3.select("#maptest").append("svg")
        .attr("width", width)
        .attr("height", height);

    function drawMap(){
      d3.json("http://localhost:3000/districts.topojson", function(error, data) {
        if (error) return console.error(error);
        console.log(data.objects.districts);

        var path = d3.geo.path().projection(projection);

        var fill = d3.scale.log()
            .domain([10, 500])
            .range(["brown", "steelblue"]);

        var districts = topojson.feature(data, data.objects.districts);

        console.log(districts);

        var b = path.bounds(districts);
        var left = b[0][0];
        var bottom = b[0][1];
        var top = b[1][0];
        var right = b[1][1];

        var s = 0.95 / Math.max((top - left) / width, (right - bottom) / height);
        var t = [(width - s * (top + left)) / 2, (height - s *  (right + bottom)) / 2];

        console.log("Scale : ", b, s, t);
        projection.scale(s).translate(t);

        path.projection(projection);

        var map = svg.append('g').attr('class', 'boundary');

        map.selectAll("path")
                   .data(districts.features)
                   .enter()
                   .append("path")
                   .attr("d", path)
                   .style("fill", "steelblue");

      });
      
    };

    drawMap();
  });
