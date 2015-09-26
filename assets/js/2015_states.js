
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
        width: 300,
        height: 500,
        defaultColor: defaultColor,
        metaKey: state,
        regionNameField: "name",
        regionCodeField: "ST_PCODE"
      };
      electroscope.drawD3Map(data, options)
        .on('click', function(d){
          console.log("Clicking");
          d3.selectAll("path")
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

    // $.getJSON("http://localhost:3000/api/candidates/count/by-parliament?state=" + state, function(response){
    //   response.data[0].parliament_counts.map(function(item){
    //     $("#" + item.parliament + "-total-count").text(item.count);
    //   });
    // });
  }
  var renderIndividualParliamentData = function(state){

    $.getJSON("http://localhost:3000/api/candidates/count/by-party?group_by=parliament&state_code=" + state, function(response){

      var drawPieChart = function(parliament, partyCounts){
        var element = parliament + "-canvas";

        var colors = {
          USADP: "#00796B",
          NLFD: "#FF5252",
          NUP: "#536DFE",
          IC: "#FFA000",
          NDP: "#FFA000",
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
          Other: "#455A64"
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

        var legends = [];

        var pieData = biggestFive.map(function(partyCount){
          var base = colors[partyCount.party] ? colors[partyCount.party] : colors['Other'];
          var baseRgb = hexToRgb(base);
          var highlight = "rgba(" + baseRgb.r + "," + baseRgb.g + "," + baseRgb.b + "," + 0.5 + ")";
          legends.push({
            party: partyCount["party"],
            color: base
          });
          return {
            value: partyCount["count"],
            color: base,
            highlight: highlight,
            label: partyCount["party"]
          };
        });
        console.log("Element", element);
        var legendsHtml = "<div class='row'>";
        legends.map(function(legend){
          legendsHtml += "<div class='col s12'><span class='chart-legend' style='background: " + legend.color + ";'></span>" + legend.party + "</div>";
        });
        legendsHtml += "</div>";
        $("#" + parliament + '-legends').html(legendsHtml);
        $("#" + element).html("<canvas width='100px' height='100px'></canvas>");
        var canvas = $("#" + element + " canvas")[0];
        var ctx = canvas.getContext("2d");
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var partyPieChart = new Chart(ctx).Pie(pieData, {
            animateScale: false
        });
      };

      var data = response.data.map(function(item){
        drawPieChart(item.parliament, item.party_counts);
      })

    });

  };

  $(document).ready(function(){

    drawStateDetail("Mandalay");
    renderIndividualParliamentData("MMR010");
    $('select.state-list-select').on('change', function(){
      var state = $(this).val();
      var st_code = $(this).find(":selected").data('st_code');
      console.log(state, st_code);
      $('.eligible-pop').text($(this).find(":selected").data('eligible-pop'));
      $('.state-name').text($(this).find(":selected").text());
      $('.dt-count').text($(this).find(":selected").data('dt-count'));
      $('.tsp-count').text($(this).find(":selected").data('tsp-count'));
      $('img.state-flag').attr('src', $(this).find(":selected").data('flag_link'));
      $(this).addClass("active");
      drawStateDetail(state);

      renderIndividualParliamentData(st_code);
    });


  });

})(window.electroscope);

