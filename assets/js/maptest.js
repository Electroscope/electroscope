(function(electroscope){

  $.getJSON("http://localhost:3000/states_regions.topojson", function(data){
    var options = {
      element: '#states_map',
      width: 280,
      height: 600,
      metaKey: "output2",
      regionNameField: "name",
      regionCodeField: "ST_PCODE",
      onClickHandler: function(d){
        console.log("Clicking");
        $('.candidate-list').html("<h3>" + d.properties.name + "</h3>");
      }
    };
    electroscope.drawD3Map(data, options);
  });
})(window.electroscope);