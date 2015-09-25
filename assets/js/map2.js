(function(){
  window.electroscope = window.electroscope || {};

  window.electroscope.drawD3Map = function(topoJSON, options){
    var defaultColor = options.defaultColor || "steelblue";
    var width = options.width || 400,
        height = options.height || 400;
    var element = options.element || "#map";
    var metaKey = options.metaKey || "districts";
    var regionCodeField = options.regionCodeField || "DT_PCODE";
    var regionNameField = options.regionNameField || "name";
    console.log(defaultColor);
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

    var tooltip = d3.select(element).append("div").attr("class", "tooltip hidden");
    var svg = d3.select(element).append("svg")
        .attr("width", width)
        .attr("height", height);

    //Get Boundary from topoJSON and scale it to fit the svg size
    var path = d3.geo.path().projection(projection);
    var regions = topojson.feature(topoJSON, topoJSON.objects[metaKey]);           
    console.log(regions);

    var bounds = path.bounds(regions);
    var originalScale = computeScaleFromBounds(bounds);
    var originalTranslationPoints = computeTranslatePointsForScale(bounds, originalScale);

    projection.scale(originalScale).translate(originalTranslationPoints);

    path.projection(projection);

    var map = svg.append('g').attr('class', 'boundary');
     
    var offsetL = element[0].offsetLeft + 40;
    var offsetT = element[0].offsetTop + 20;


    map.selectAll("path")
              .data(regions.features)
              .enter()
              .append("path")
              .attr("d", path)
              .attr("class", "map_region")
              .attr('id', function(d, i){
                return d.properties[regionCodeField];
              })
              .style("fill", function(d, i){
                return defaultColor;
              })
              .on('click', options.onClickHandler)
              .on("mousemove", function(d,i) {
                var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
                tooltip
                    .classed("hidden", false)
                    .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
                    .html(d.properties[regionNameField]);
              })
              .on("mouseout",  function(d,i) {
                tooltip.classed("hidden", true)
              })
              ;

      //Create Normal Zoom behaviour
      var zoom = d3.behavior.zoom()
                .on("zoom",function() {
                  map.attr("transform","translate("+ 
                      d3.event.translate.join(",")+")scale("+d3.event.scale+")");
                  map.selectAll("path")  
                        .attr("d", path.projection(projection));
                });

      map.call(zoom);

      function zoomed() {
        map.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")");
      }

      d3.select(self.frameElement).style("height", height + "px");

      var center = [width / 2, height / 2];

      function getCentroid(selection) {
          // get the DOM element from a D3 selection
          // you could also use "this" inside .each()
          var element = selection.node(),
              // use the native SVG interface to get the bounding box
              bbox = element.getBBox();
          // return the center of the bounding box
          return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
      };

      svg.selectAll(".button")
          .data(['zoom_in', 'zoom_out'])
          .enter()
          .append("text")
          .attr("x", function(d,i){return 10 + 50*i})
          .attr({y: 30, width: 40, height: 20, class: "button"})
          .attr("id", function(d){return d})
          .text(function(d,i){
            return d === 'zoom_in' ? '+' : '-'
          })
          .style("font-size", '2em')
          .style("fill", function(d,i){ return i ? "red" : "green"});

      // Control logic to zoom when buttons are pressed, keep zooming while they are
      // pressed, stop zooming when released or moved off of, not snap-pan when
      // moving off buttons, and restore pan on mouseup.

      var pressed = false;
      d3.selectAll('.button').on('mousedown', function(){
          pressed = true;
          disableZoom();
          zoomButton(this.id === 'zoom_in')
      }).on('mouseup', function(){
          pressed = false;
      }).on('mouseout', function(){
          pressed = false;
      })
      svg.on("mouseup", function(){svg.call(zoom)});

      function disableZoom(){
          svg.on("mousedown.zoom", null)
             .on("touchstart.zoom", null)
             .on("touchmove.zoom", null)
             .on("touchend.zoom", null);
      }

      function zoomButton(zoom_in){
          var scale = zoom.scale(),
              extent = zoom.scaleExtent(),
              translate = zoom.translate(),
              x = translate[0], y = translate[1],
              factor = zoom_in ? 1.3 : 1/1.3,
              target_scale = scale * factor;

          // If we're already at an extent, done
          if (target_scale === extent[0] || target_scale === extent[1]) { return false; }
          // If the factor is too much, scale it down to reach the extent exactly
          var clamped_target_scale = Math.max(extent[0], Math.min(extent[1], target_scale));
          if (clamped_target_scale != target_scale){
              target_scale = clamped_target_scale;
              factor = target_scale / scale;
          }

          // Center each vector, stretch, then put back
          x = (x - center[0]) * factor + center[0];
          y = (y - center[1]) * factor + center[1];

          // Transition to the new view over 100ms
          d3.transition().duration(100).tween("zoom", function () {
              var interpolate_scale = d3.interpolate(scale, target_scale),
                  interpolate_trans = d3.interpolate(translate, [x,y]);
              return function (t) {
                  zoom.scale(interpolate_scale(t))
                      .translate(interpolate_trans(t));
                  zoomed();
              };
          }).each("end", function(){
              if (pressed) zoomButton(zoom_in);
          });
      }
  };
})();