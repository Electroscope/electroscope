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
            return ' <div class="col s6">\
              <div class="card blue-grey darken-1"\
                <div class="card-content white-text">\
                  <span class="card-title">'+item.party +'</span>\
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
          });
          console.log(list);
          var html = '<div class="row">' + list.join('') + '</div>';
          $('.candidate-list').html(html);
        };

        if(!statePartyCountCache){
          console.log("Getting from Server");
          $.getJSON("http://localhost:3000/api/candidates/count/by-party?year=2015", function(response){
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