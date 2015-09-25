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
      regionCodeField: "ST_PCODE",
      onClickHandler: function(d){
        console.log("Clicking");
        d3.selectAll(".map_region")
          .style("fill", defaultColor);
        d3.select(this)
          .style("fill", "red");
        var updateList = function(data, currentPcode){
          console.log("Updating", data, currentPcode);
          var houses = [
            {en: "upper_house", my: "အမျိုးသားလွှတ်တော်"},
            {en: "lower_house", my: "ပြည်သူ့လွှတ်တော်"},
            {en: "regional_house", my: "တိုင်းဒေသကြီး/ပြည်နယ် လွှတ်တော်"}
          ];
          var list = {};
          $.each(houses, function(index, house){
            list[house.en] = "";
          });

          $.each(data, function(index, item){
            if(item.st_pcode === currentPcode ){
              $.each(houses, function(index, house){
                if(house.my === item.legislature){
                  list[house.en] += ' <div class="col s6">\
                      <div class="card blue-grey darken-1"\
                        <div class="card-content white-text">\
                          <span class="card-title">'+item.party_number +'</span>\
                          <div class="candidate-count col s4 content-center">\
                            <div class="stat-count circle red">\
                              <div class="circle_inner">\
                                <div class="circle_wrapper">\
                                  <div class="circle_content">'+ item.candidatesCount +'</div>\
                                </div>\
                              </div>\
                            </div>\
                          </div>\
                        </div>\
                        <div class="card-action">\
                          <a href="#">'+ item.legislature +'</a>\
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
          $.getJSON("http://localhost:3000/api/temp/state/count", function(response){
            statePartyCountCache = response.data;
            updateList(statePartyCountCache, d.properties.ST_PCODE);
          });
        }else{
          console.log("Getting from Cache");
          updateList(statePartyCountCache, d.properties.ST_PCODE);
        }
        
      }
    };
    electroscope.drawD3Map(data, options);
  });
})(window.electroscope);