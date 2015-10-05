
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
    $.getJSON("http://api.electroscope.info/seperate_topo_upper/" + state + ".topojson", function(data){
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

    // $.getJSON("http://api.electroscope.info/api/candidates/count/by-parliament?state=" + state, function(response){
    //   response.data[0].parliament_counts.map(function(item){
    //     $("#" + item.parliament + "-total-count").text(item.count);
    //   });
    // });
  }
  var renderIndividualParliamentData = function(state){

    $.getJSON("http://api.electroscope.info/api/candidates/count/by-party?group_by=parliament&state_code=" + state, function(response){
      var drawPieChart = function(element, partyCounts){
        var colors = {
          USADP: "#1f77b4",
          NLFD: "#aec7e8",
          NUP: "#ff7f0e",
          IC: "#ffbb78",
          NDP: "#2ca02c",
          MFDP: "#98df8a",
          NDF: "#d62728",
          SNDP: "#ff9896",
          SNLFD: "#9467bd",
          KPP: "#c5b0d5",
          ANP: "#8c564b",
          KSDP: "#c49c94",
          CNDP: "#e377c2",
          TNDP: "#f7b6d2",
          MNP1: "#7f7f7f",
          GDP: "#c7c7c7",
          PDP: "#bcbd22",
          UDP: "#dbdb8d",
          FUP: "#17becf",
          Other: "#9edae5"
        };

        var other = {
          count: 0,
          party: 'Other'
        };

        partyCounts = partyCounts.sort(function(first, second){
          return second.count - first.count;
        });

        var biggestFive = partyCounts.slice(0, 4);
        partyCounts.slice(4, partyCounts.length).map(function(item){
          other["count"] += item.count;
        });

        biggestFive.push(other);

        var pieData = biggestFive.map(function(partyCount){
          var base = colors[partyCount.party] ? colors[partyCount.party] : colors['Other'];
          var baseRgb = hexToRgb(base);
          var highlight = "rgba(" + baseRgb.r + "," + baseRgb.g + "," + baseRgb.b + "," + 0.5 + ")";
          return {
            value: partyCount["count"],
            color: base,
            highlight: highlight,
            label: partyCount["party"]
          };
        });
        console.log("Element", element);
        $("#" + element).html("<canvas width='250' height='250'></canvas>");
        var canvas = $("#" + element + " canvas")[0];
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
    renderIndividualParliamentData("MMR010");
    $('.state-list-item').on('click', function(){
      var state = $(this).text();
      var st_code = $(this).data('st_code');
      $('.state-list-item').removeClass('active');
      $(this).addClass("active");
      drawStateDetail(state);

      renderIndividualParliamentData(st_code);
    });


  });

})(window.electroscope);
