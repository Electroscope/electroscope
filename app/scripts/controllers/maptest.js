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
        height = 400;
    var projection = d3.geo.mercator();
        projection.scale(1).translate([0,0]);

    var svg = d3.select("#maptest").append("svg")
        .attr("width", width)
        .attr("height", height);
    var tooltip = d3.select("#maptest").append("div").attr("class", "tooltip hidden");

    function drawMap(){
      d3.json("http://localhost:3000/districts.topojson", function(error, data) {
        if (error) return console.error(error);
        console.log(data.objects.districts);

        var path = d3.geo.path().projection(projection);

        var fill = d3.scale.linear().domain([0,33]).range(['red', 'blue']);

        var districts = topojson.feature(data, data.objects.districts);

        console.log(districts);

        var bounds = path.bounds(districts);


        var computeScaleFromBounds = function (bounds){
          var left = bounds[0][0];
          var bottom = bounds[0][1];
          var top = bounds[1][0];
          var right = bounds[1][1];

          var s = 0.95 / Math.max((top - left) / width, (right - bottom) / height);
          return s;
        };

        var computeTranslatePointsForScale = function (bounds, s){
          var left = bounds[0][0];
          var bottom = bounds[0][1];
          var top = bounds[1][0];
          var right = bounds[1][1];
          var t = [(width - s * (top + left)) / 2, (height - s *  (right + bottom)) / 2];
          return t;
        };

        var originalScale = computeScaleFromBounds(bounds);
        var originalTranslationPoints = computeTranslatePointsForScale(bounds, originalScale);
        console.log(originalScale, originalTranslationPoints);

        projection.scale(originalScale).translate(originalTranslationPoints);

        path.projection(projection);

        var map = svg.append('g').attr('class', 'boundary');


        var lastClickedId = void 0;
        var alreadyZoomed = false;

        var click = function(d) {
          var newBounds = path.bounds(d);
          var scale = computeScaleFromBounds(newBounds);
          var translationPoints = computeTranslatePointsForScale(newBounds, scale);
         

          if (!alreadyZoomed) {
            map.selectAll("path").style('fill', 'steelblue');//make last Cliced element normal
            lastClickedId = d.properties.DT_PCODE;
            d3.select(this)
                      .style("fill", "#aaa");
            map.transition()
              .duration(1000)
              .delay(100)
              .attr("transform", "translate(" +translationPoints + ")scale(" + scale + ")");
           } else {
            console.log(originalScale, originalTranslationPoints);
            map.transition()
              .duration(1000)
              .delay(100).
              attr("transform","translate("+ 
                0 +"," + 0 +")scale("+1+")");
            map.selectAll("path")  
                .attr("d", path.projection(projection)); 
           }

           alreadyZoomed = !alreadyZoomed;

          d3.select("#maptest.back")
            .append('circle')
              .attr("cx", 10)
              .attr("cy", 10)
              .attr("r", 3)
              .style("fill", "red");
          
        };

        var offsetL = document.getElementById('maptest').offsetLeft + 40;
        var offsetT =document.getElementById('maptest').offsetTop + 20;


        map.selectAll("path")
                   .data(districts.features)
                   .enter()
                   .append("path")
                   .attr("d", path)
                   .attr('id', function(d, i){
                    return d.properties.DT_PCODE;
                   })
                   .on('click', click)
                   .style("fill", function(d, i){
                      // return fill(d.properties.Shape_Leng);
                      return "steelblue";
                   })
                   .on("mousemove", function(d,i) {
                     var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
                       tooltip
                         .classed("hidden", false)
                         .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
                         .html(d.properties.DT);
                     })
                     .on("mouseout",  function(d,i) {
                       tooltip.classed("hidden", true)
                     })
                   ;

      var zoom = d3.behavior.zoom()
          .on("zoom",function() {
              map.attr("transform","translate("+ 
                  d3.event.translate.join(",")+")scale("+d3.event.scale+")");
              map.selectAll("path")  
                  .attr("d", path.projection(projection)); 

        });

      map.call(zoom)

      });
      
    };

    drawMap();
  });
