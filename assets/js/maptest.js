(function(electroscope){

  $.getJSON("http://localhost:3000/states_regions.topojson", function(data){

    

    var defaultColor = "steelblue";
    var statePartyCountCache = null;
    var options = {
      element: '#states_map',
      width: 400,
      height: 600,
      defaultColor: defaultColor,
      metaKey: "output2",
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
        var updateList = function(data, state){
          regionalHouse = state.toUpperCase() + "-RGH";
          console.log("Regional House", regionalHouse);
          var houses = [
            {en: "AMH", my: "အမျိုးသားလွှတ်တော်"},
            {en: "PTH", my: "ပြည်သူ့လွှတ်တော်"},
            {en: "RGH", my: "တိုင်းဒေသကြီး/ပြည်နယ် လွှတ်တော်"}
          ];
          var list = {};
          $.each(houses, function(index, house){
            list[house.en] = "";
          });

          $.each(data, function(index, item){
            
            if(item.state === state ){
              $.each(houses, function(index, house){
                if(house.en === item.parliament){
                  list[house.en] += ' <div class="col s6">\
                      <div class="card blue-grey darken-1"\
                        <div class="card-content white-text">\
                          <span class="card-title">'+ party_names_ln[item.party] +'</span>\
                          <div class="candidate-count col offset-s4 s4 content-center">\
                            <div class="stat-count circle red">\
                              <div class="circle_inner">\
                                <div class="circle_wrapper">\
                                  <div class="circle_content">'+ item.count +'</div>\
                                </div>\
                              </div>\
                            </div>\
                          </div>\
                        </div>\
                        <div class="card-action">\
                          <a href="#">'+ item.parliament +'</a>\
                        </div>\
                      </div>\
                    </div>';
                }
              });              
            }
          });
          houses.map(function(house){
            console.log(house, list[house.en]);
            var html = '<div class="row">' + list[house.en] + '</div>';
            $("#" + house.en).html(html);
          });
        };
        var loadingIndicator = '<div class="preloader-wrapper big active">\
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
        
    });
    

  });
})(window.electroscope);