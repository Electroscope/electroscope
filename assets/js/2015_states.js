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
    var parliaments = ["AMH", "PTH", "RGH"];
    parliaments.map(function(parliament){
      $("#" + parliament + "total-count").html(preloader);
    });

    $.getJSON("http://localhost:3000/api/candidates/count/by-parliament?state=" + state, function(response){
      response.data[0].parliament_counts.map(function(item){
        $("#" + item.parliament + "-total-count").text(item.count);
      });
    });
  }
  var renderIndividualParliamentData = function(state){

    $.getJSON("http://localhost:3000/api/candidates/count/by-party?group_by=parliament&state=" + state, function(response){

      var drawPieChart = function(element, partyCounts){

        var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
        
        var pieData = partyCounts.map(function(partyCount){
          var base = colors[Math.floor(Math.random() * colors.length) ];
          var highlight = colors[Math.floor(Math.random() * colors.length) ];
          return {
            value: partyCount["count"],
            color: base,
            highlight: highlight,
            label: partyCount["party"]
          };
        });
        console.log("Element", element);
        var canvas = document.getElementById(element);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var partyPieChart = new Chart(ctx).Pie(pieData, {
            animateScale: false
        });
      };

      var data = response.data.map(function(item){
        var element = item.parliament + "-canvas";
        drawPieChart(element, item.party_counts);
      })

    });

  };

  $(document).ready(function(){

    drawStateDetail("Mandalay");
    renderIndividualParliamentData("Mandalay");
    $('.state-list-item').on('click', function(){
      var state = $(this).text();
      $('.state-list-item').removeClass('active');
      $(this).addClass("active");
      drawStateDetail(state);

      renderIndividualParliamentData(state);
    });


  });

})(window.electroscope);