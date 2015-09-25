(function(electroscope){

  var drawStateDetail = function(state){
    // $.getJSON("http://localhost:3000/" + state + ".topojson", function(data){
    //   var defaultColor = "steelblue";
    //   var statePartyCountCache = null;
    //   var options = {
    //     element: '#state_map',
    //     width: 400,
    //     height: 600,
    //     defaultColor: defaultColor,
    //     metaKey: state,
    //     regionNameField: "name",
    //     regionCodeField: "ST_PCODE"
    //   };
    //   electroscope.drawD3Map(data, options)
    //     .on('click', function(d){
    //       console.log("Clicking");
    //       d3.selectAll(".map_region")
    //         .style("fill", defaultColor);
    //       d3.select(this)
    //         .style("fill", "red");

    //       $('.candidate-list').html(loadingIndicator);

    //       if(!statePartyCountCache){
    //         console.log("Getting from Server");
    //         $.getJSON("http://localhost:3000/api/candidates/count?group_by=state,party,parliament", function(response){
    //           statePartyCountCache = response.data;
    //           updateList(statePartyCountCache, d.properties.ST);
    //         });
    //       }else{
    //         console.log("Getting from Cache");
    //         updateList(statePartyCountCache, d.properties.ST);
    //       }
          
    //   })
    //   .on("mousemove", function(d,i) {
    //     var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
    //     tooltip
    //         .classed("hidden", false)
    //         .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
    //         .html(d.properties[regionNameField]);
    //   })
    //   .on("mouseout",  function(d,i) {
    //     tooltip.classed("hidden", true)
    //   });

    // });
    $('#state-details').text(state);
    console.log("Drawing", $('#state-details').text());
  }

  $(document).ready(function(){
    $('.state-list-item').on('click', function(){
      var state = $(this).text();
      drawStateDetail(state);
    })
  });

})(window.electroscope);