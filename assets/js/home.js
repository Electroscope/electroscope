(function(electroscope){

  var $states;

  $.getJSON("http://localhost:3000/api/candidates/count/by-party?group_by=state_code&parliament=PTH", function (data){
    $states = data.data;
  });

  $.getJSON("http://localhost:3000/seperate_topo_lower/Mandalay.topojson", function(data){
    var defaultColor = "#bbdefb";
    var statePartyCountCache = null;
    var options = {
      element: '#mandalay-map',
      width: 400,
      height: 600,
      defaultColor: defaultColor,
      metaKey: "Mandalay",
      regionNameField: "name",
      regionCodeField: "ST_PCODE"
    };
    electroscope.drawD3Map(data, options)
      .style("stroke", "#bbdefb")
      .style("stroke-width", "1px")
      // .on("mouseover", function (d,i) {
      //   d3.select(this)
      // })
      // .on("mouseout", function (d,i) {
      //   d3.select(this)
      //     .style("fill", "#bbdefb");
      // });
  });
})(window.electroscope);