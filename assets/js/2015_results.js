(function () {
  // Add parties list
  electroscope.getJSON("/api/parties",function(response){
    var party = response.data;
    $('.party_list').append('<option value="all">All</option>')
    for(var key  in party){
      $('.party_list').append('<option value="' + key + '">' + party[key] + ' ('+  key+')</option>')
    }
  });

  var config1 = liquidFillGaugeDefaultSettings();
  config1.circleColor = "#FFFFFF";
  config1.textColor = "#FFFFFF";
  config1.waveTextColor = "#FFFFFF";
  config1.waveColor = "#FFFFFF";
  var upperH = loadLiquidFillGauge("upperHouse", 30, config1);  
  var lowerH = loadLiquidFillGauge("lowerHouse", 14, config1);  
  var regionH = loadLiquidFillGauge("regionHouse", 30, config1);  
}());
