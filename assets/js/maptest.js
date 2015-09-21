(function(electroscope){

  $.getJSON("http://localhost:3000/states_regions.topojson", function(data){
    var defaultColor = "steelblue";
    var statePartyCountCache = null;
    var options = {
      element: '#states_map',
      width: 280,
      height: 600,
      defaultColor: defaultColor,
      metaKey: "output2",
      regionNameField: "name",
      regionCodeField: "ST_PCODE",
      onClickHandler: function(d){
        console.log("Clicking");
        d3.selectAll(".map_region")
          .style("fill", defaultColor);
        d3.select(this)
          .style("fill", "red");
        var updateList = function(data, currentPcode){
          console.log("Updating", data, currentPcode);
          var list = [];
          $.each(data, function(index, item){
            if(item.st_pcode === currentPcode ){
              console.log("Found", item);
              list.push(item);
            }
          });
          list = list.map(function(item){
            return "<li> Party " + item.party_number + ": " + item.candidatesCount + "</li>"
          });
          var html = "<ul>" + list.join('') + "</ul>";
          $('.candidate-list').html(html);
        };

        var loading = setInterval(function(){
          $('.candidate-list').html("<h3>" + d.properties.name + "</h3> <p> Loading..</p>");
        }, 300);
        if(!statePartyCountCache){
          console.log("Getting from Server");
          $.getJSON("http://localhost:3000/api/candidates/count-by-party", function(response){
            statePartyCountCache = response.data;
            updateList(statePartyCountCache, d.properties.ST_PCODE);
            clearInterval(loading);
          });
        }else{
          console.log("Getting from Cache");
          updateList(statePartyCountCache, d.properties.ST_PCODE);
          clearInterval(loading);
        }
        
      }
    };
    electroscope.drawD3Map(data, options);
  });
})(window.electroscope);