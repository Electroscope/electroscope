(function(){

  var chartList = [
    "agegroup",
    "gender",
    "ethinicity"
  ];
  var baseUrl = "http://localhost:3000";
  chartList.map(function(chartType){
    console.log("chart type", chartType);
    $("#" + chartType + "-chart").on("click", function(e){
      $.getJSON(baseUrl + "/api/candidates/count/by-"+chartType, function(response){
        $("#chart-content").text(response.data);
      });
    })
  })

})();