'use strict';

/**
 * @ngdoc directive
 * @name electionApp.directive:palartartMap
 * @description
 * # palartartMap
 */
angular.module('electionApp')
  .directive('palartarMap', function () {
    return {
      template: '<div id="region-name" ng-model="regionName">{{regionName}}</div>',
      restrict: 'E',
      scope: {
        geojson: '='
      },
      link: function postLink(scope, element, attrs) {
        console.log("POSTLINK called", scope, attrs);
        var d3 = window.d3;
        var data = scope.geojson;
        scope.regionName = "Districts";

        var defaultColor = attrs.defaultcolor;
        var width = attrs.width,
            height = attrs.height;
        var fill = d3.scale.linear().domain([0,33]).range(['red', 'blue']);

        // helper functions
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


        var projection = d3.geo.mercator();
            projection.scale(1).translate([0,0]);

        var tooltip = d3.select(element[0]).append("div").attr("class", "tooltip hidden");
        var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height);

        //Get Boundary from data and scale it to fit the svg size
        var path = d3.geo.path().projection(projection);
        var districts = topojson.feature(data, data.objects.districts);           
        
        var bounds = path.bounds(districts);
        var originalScale = computeScaleFromBounds(bounds);
        var originalTranslationPoints = computeTranslatePointsForScale(bounds, originalScale);

        projection.scale(originalScale).translate(originalTranslationPoints);

        path.projection(projection);

        var map = svg.append('g').attr('class', 'boundary');

        var lastClickedId = void 0;
        var alreadyZoomed = false;

        var changeZoomOnClick = function(d) {
          var newBounds = path.bounds(d);
          var scale = computeScaleFromBounds(newBounds);
          var translationPoints = computeTranslatePointsForScale(newBounds, scale);
         
          
          if (!alreadyZoomed) {
            scope.regionName = d.properties.DT;
            scope.$apply();
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
            scope.regionName = "Districts" ;
            scope.$apply();
            map.selectAll("path").style('fill', 'steelblue');
            map.transition()
              .duration(1000)
              .delay(100).
              attr("transform","translate("+ 
                0 +"," + 0 +")scale("+1+")");
            map.selectAll("path")  
                .attr("d", path.projection(projection)); 
           }

           alreadyZoomed = !alreadyZoomed;
        };
          
        var offsetL = element[0].offsetLeft + 40;
        var offsetT = element[0].offsetTop + 20;


        map.selectAll("path")
                  .data(districts.features)
                  .enter()
                  .append("path")
                  .attr("d", path)
                  .attr('id', function(d, i){
                    return d.properties.DT_PCODE;
                  })
                  .on('click', changeZoomOnClick)
                  .style("fill", function(d, i){
                    return defaultColor;
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

        //Create Normal Zoom behaviour
        // var zoom = d3.behavior.zoom()
        //           .on("zoom",function() {
        //             map.attr("transform","translate("+ 
        //                 d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        //             map.selectAll("path")  
        //                   .attr("d", path.projection(projection));
        //           });

        // map.call(zoom);
      }
    };
  });
