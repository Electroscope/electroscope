(function () {


  window.electroscope.drawChoroplethMap = function(topoJSON, options){
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

    var bounds = path.bounds(regions);
    var originalScale = computeScaleFromBounds(bounds);
    var originalTranslationPoints = computeTranslatePointsForScale(bounds, originalScale);

    projection.scale(originalScale).translate(originalTranslationPoints);

    path.projection(projection);

    var map = svg.append('g').attr('class', 'boundary');
     
    var offsetL = element[0].offsetLeft + 40;
    var offsetT = element[0].offsetTop + 20;
    console.log("Before D3 Binding", regions.features);

    var counts = regions.features.map(function(d){
      return d.properties.count;
    });

    var color = d3.scale.linear() // create a linear scale
        .domain(d3.min(counts),d3.max(counts)])  // input uses min and max values
        .range([.3,1]); 
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
                return color(d.properties.count);
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
  };



  $.getJSON("http://localhost:3000/states_regions.topojson", function(topo_response){
    var options = {
      element: '#states_choropleth',
      width: 400,
      height: 600,
      defaultColor: defaultColor,
      metaKey: "output2",
      regionNameField: "name",
      regionCodeField: "ST_PCODE",
      onClickHandler: function(d){
        console.log("Clicked", d);
      };
      $.getJSON("http://localhost:3000/api/candidates/count/by-state", function(data_response){
        console.log(topo_response);
        console.log(data_response);
      });
    };
  })
})();

