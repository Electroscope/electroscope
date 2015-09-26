(function () {


  window.electroscope.drawChoroplethMap = function(topoJSON, data, options){
    var defaultColor = options.defaultColor || "steelblue";
    var width = options.width || 400,
        height = options.height || 400;
    var element = options.element || "#map";
    var metaKey = options.metaKey || "districts";
    var regionCodeField = options.regionCodeField || "DT_PCODE";
    var regionNameField = options.regionNameField || "name";
    var dataField = options.dataField || "count";
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

    var features = regions.features.map(function(d){
      data.map(function(item){
        console.log("STS", item.state, d.properties.ST);
        if(item.state === d.properties.ST){
          d.properties.count = item.count;
        }
      });
      return d;
    });

    var counts = features.map(function(d){
      return d.properties.count;
    });
    console.log("Counts", counts);

    var color = d3.scale.linear() // create a linear scale
        .domain([d3.min(counts),d3.max(counts)])  // input uses min and max values
        .range(["#fa9fb5", "#c51b8a"]);
    // var color = d3.scale.threshold()
    //     .domain([d3.min(counts), d3.max(counts)])
    //     .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

    map.selectAll("path")
              .data(features)
              .enter()
              .append("path")
              .attr("d", path)
              .attr("class", "map_region")
              .attr('id', function(d, i){
                return d.properties[regionCodeField];
              })
              .style("fill", function(d, i){

                return color(d.properties.count ? d.properties.count : 0);
              })
              .on('click', options.onClickHandler)
              .on("mousemove", function(d,i) {
                var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
                console.log(d.properties);

                tooltip
                    .classed("hidden", false)
                    .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
                    .html(d.properties[regionNameField] + " - " + d.properties.count + "");
              })
              .on("mouseout",  function(d,i) {
                tooltip.classed("hidden", true)
              })
              ;
  };




})();
