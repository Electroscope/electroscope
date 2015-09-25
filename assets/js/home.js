(function(electroscope){

  $.getJSON("http://localhost:3000/seperate_topo_upper/Mandalay.topojson", function(data){
    var defaultColor = "#ffffff";
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
    electroscope.drawD3Map(data, options);
  });
})(window.electroscope);