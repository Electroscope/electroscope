(function(electroscope){

  var drawStateDetail = function(state){

    var preloader =   '<div class="preloader-wrapper big active">\
                          <div class="spinner-layer spinner-blue-only">\
                            <div class="circle-clipper left">\
                              <div class="circle"></div>\
                            </div><div class="gap-patch">\
                              <div class="circle"></div>\
                            </div><div class="circle-clipper right">\
                              <div class="circle"></div>\
                            </div>\
                          </div>\
                        </div>';

    $('#state-map').html(preloader);
    $.getJSON("http://localhost:3000/seperate_topo_upper/" + state + ".topojson", function(data){
      var defaultColor = "steelblue";
      var statePartyCountCache = null;
      var options = {
        element: '#state_map',
        width: 400,
        height: 600,
        defaultColor: defaultColor,
        metaKey: state,
        regionNameField: "name",
        regionCodeField: "ST_PCODE"
      };
      electroscope.drawD3Map(data, options)
        .on('click', function(d){
          console.log("Clicking");
          d3.selectAll(".map_region")
            .style("fill", defaultColor);
          d3.select(this)
            .style("fill", "red");

          $('.candidate-list').html(loadingIndicator);

          if(!statePartyCountCache){
            console.log("Getting from Server");
            $.getJSON("http://localhost:3000/api/candidates/count?group_by=state,party,parliament", function(response){
              statePartyCountCache = response.data;
              updateList(statePartyCountCache, d.properties.ST);
            });
          }else{
            console.log("Getting from Cache");
            updateList(statePartyCountCache, d.properties.ST);
          }
          
      })
      .on("mousemove", function(d,i) {
        var html = '<a class="waves-effect waves-light btn center">' + d.properties.constituency_name_en + "-" + d.properties.constituency_number +'</a>';
        $('#state_map_label').html(html);
      })
      .on("mouseout",  function(d,i) {
        $('#state_map_label').html('');
      })

    });
  }

  $(document).ready(function(){
    $('.state-list-item').on('click', function(){
      var state = $(this).text();
      drawStateDetail(state);
    })
  });

})(window.electroscope);