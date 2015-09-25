(function (electroscope) {

  $.getJSON("http://localhost:3000/states_regions.topojson", function(data){
    var defaultColor = "steelblue";
    var statePartyCountCache = null;
    var options = {
      element: '#states-map',
      width: 280,
      height: 600,
      defaultColor: defaultColor,
      metaKey: "output2",
      regionNameField: "name",
      regionCodeField: "ST_PCODE",
      onClickHandler: function(d){
        console.log("Clicking");
      }
    };
    electroscope.drawD3Map(data, options);
  });

}(window.electroscope));
