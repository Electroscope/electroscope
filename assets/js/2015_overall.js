(function(){
  var mm2enEthnic = {
    "ဗမာ": "Burmese",
    "ရှမ်း": "Shan",
    "မြန်မာ": "Myanmar (Burmese)",
    "ရခိုင်": "Rakhine",
    "ကရင်": "Kayin",
    "ချင်း": "Chin",
    "ကချင်": "Kachin",
    "မွန်": "Mon"
  };

  var chartList = [
    "agegroup",
    "gender",
    "religion",
    "ethnicity",
    "educated",
    "parliament"
  ];

  var topoResponse;
  var topoOption;

  var mm2enReligon = {
    "ဗုဒ္ဓ": "Buddhism",
    "ခရစ်ယာန်": "Christianity",
  };

  var chartCallbacks = {
    agegroup: function(response){
      var data = response.data[0];

      data["agegroup_counts"]= data["agegroup_counts"].sort(function(first, second){
      	return first.agegroup.localeCompare(second.agegroup);
      });

      var labels = data["agegroup_counts"].map(function(item){
        return item["agegroup"];
      });
      var counts = data["agegroup_counts"].map(function(item){
        return item.count;
      });

      var chartData = {
        labels: labels,
        datasets: [
          {
            label: "Age Groups",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(255,255,255,1)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255,255,255,1)",
            data: counts
          }
        ]
      };

      var canvas = document.getElementById("agegroup-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var myChart = new Chart(ctx).Line(chartData, {
        barShowStroke: false,
        scaleLineColor: "#ffffff",
        scaleGridLineColor: "#ffffff",
        scaleShowVerticalLines: false,
        responsive: true,
        scaleFontColor: "white",
        scaleFontSize: 12,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      });

      document.getElementById('agegroup-legend').innerHTML = myChart.generateLegend();
    },

    gender: function(response){
      var data = response.data[0];
      var counts = data["gender_counts"];
      var femaleCount = counts[0].gender == 'F' ? counts[0].count : counts[1].count;
      var maleCount = counts[0].gender == 'M' ? counts[0].count : counts[1].count;

      var pieData = [
        {
          value: maleCount,
          color:"#1a237e",
          highlight: "#1a237e",
          label: "Male"
        },
        {
          value: femaleCount,
          color: "blue",
          highlight: "blue",
          label: "Female"
        }
      ];
      var canvas = document.getElementById('gender-canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var genderPieChart = new Chart(ctx).Pie(pieData, {
        responsive: true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 1,
        animateScale: false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('gender-legend').innerHTML = genderPieChart.generateLegend();
    },

    educated: function(response){
      var data = response.data[0];
      var counts = data["educated_counts"];
      var bwaeya = counts[0].educated == true ? counts[0].count : counts[1].count;
      var not_bwaeya = counts[0].educated == false ? counts[0].count : counts[1].count;

      var pieData = [
        {
          value: bwaeya,
          color:"#4CAF50",
          highlight: "#4CAF50",
          label: "with degree"
        },
        {
          value: not_bwaeya,
          color: "#5AD3D1",
          highlight: "#5AD3D1",
          label: "without degree"
        }
      ];

      var canvas = document.getElementById('bwaeya-canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var genderPieChart = new Chart(ctx).Pie(pieData, {
        responsive: true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 1,
        animateScale: false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('bwaeya-legend').innerHTML = genderPieChart.generateLegend();
    },

    religion: function(response){
      var data = response.data[0];
      data["religion_counts"]= data["religion_counts"].sort(function(first, second){
        return second.count - first.count;
      });

      var colors = ["#4caf50", "#fff176", "#eceff1"];
      var highlight_colors = ["#2e7d32", "#ffeb3b", "#cfd8dc"]
      var polarData = data["religion_counts"].slice(0,2).map(function(item, index){
        console.log(index, colors[index])
        return {
          value: item["count"],
          color: colors[index],
          highlight: highlight_colors[index],
          label: mm2enReligon[item["religion"]]
        };
      });

      var others = {
        value: 0,
        label: "Others",
        color: "#102070",
        highlight : "#1A237E"
      };
      /*others.base = colors[4];
      others.highlight = colors[4];*/
      data["religion_counts"].slice(2,data["religion_counts"].length).map(function(item, index){
        others.value += item["count"];
      });
      polarData.push(others);

      var canvas = document.getElementById('religion-canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var radarChart = new Chart(ctx).Doughnut(polarData, {
          segmentStrokeColor: "#ffffff",
          segmentStrokeWidth : 1,
          responsive: true,
          scaleFontSize: 12,
          scaleFontStyle: "normal",
          scaleFontColor: "#000",
          legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('religion-legend').innerHTML = radarChart.generateLegend();
    },

    parliament: function(response){
      var data = response.data[0];

      // var labels = ['Amyothar Hluttaw', "Pyithu Hluttaw", "Regional Hluttaw"];

      // var polarData = [];
      // polarData.push({
      //   value: data['parliament_counts'][0].count,
      //   color: "#46BFBD",
      //   highlight: "#2ca02c",
      //   label: "Regional Parliament"
      // });

      // polarData.push({
      //   value:data['parliament_counts'][1].count,
      //   color: "#9467bd",
      //   highlight: "#d62728",
      //   label: "Pyithu Parliament"
      // });

      // polarData.push({
      //   value:data['parliament_counts'][2].count,
      //   color: "#e377c2",
      //   highlight: "#8c564b",
      //   label: "Amyothar Parliament"
      // });

      // //console.log(polarData);
      // var canvas = document.getElementById('parliament-canvas');
      // var ctx = canvas.getContext("2d");
      // ctx.clearRect(0, 0, 0, 0);
      // var radarChart = new Chart(ctx).Doughnut(polarData, {
      //     segmentStrokeColor: "#ffffff",
      //     responsive: true,
      //     scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      //     scaleFontSize: 12,
      //     scaleFontStyle: "normal",
      //     scaleFontColor: "#000",
      //     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      // });
      // document.getElementById('parliament-legend').innerHTML = radarChart.generateLegend();
    },

    ethnicity: function(response){
      var data = response.data[0];
      data["ethnicity_counts"]= data["ethnicity_counts"].sort(function(first, second){
        return second.count - first.count;
      });

      var colors = ["#4caf50", "#03a9f4", "#673ab7", "#f44336", "#3f51b5", "#00bcd4", "#8bc34a", "#cddc39", "#ff9800", "#607d8b"];
      var highlight_colors = ["#2e7d32", "#0277bd", "#512da8", "#c62828", "#303f9f", "#0097a7", "#689f38", "#afb42b", "#f57c00", "#455a64"]
      var polarData = data["ethnicity_counts"].slice(0,8).map(function(item, index){
        return {
          value: item["count"],
          color: colors[index],
          highlight: highlight_colors[index],
          label: mm2enEthnic[item["ethnicity"]]
        };
      });

      var other = {
        ethnicity: other,
        count: 0
      };

      var others = {
        value: 0,
        label: "Others",
        color: colors[9],
        highlight: highlight_colors[9]
      };
      /*others.base = colors[Math.floor(Math.random() * colors.length) ];
      others.highlight = colors[Math.floor(Math.random() * colors.length) ];*/
      data["ethnicity_counts"].slice(8,data["ethnicity_counts"].length).map(function(item, index){
	     others.value += item["count"];
      });
      polarData.push(others);

      var canvas = document.getElementById('ethnicity-canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var radarChart = new Chart(ctx).Doughnut(polarData, {
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 1,
        responsive: true,
        scaleFontSize: 12,
        scaleFontStyle: "normal",
        scaleFontColor: "#000",
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('ethnicity-legend').innerHTML = radarChart.generateLegend();
    }
  };

  /*
   * On select a party on select box
   */
  function selectParty(e) {
    $("#states_choropleth").find("svg").remove();

    if (e.params.data.id === "all")
      return showAll();

    electroscope.getJSON("/api/candidates/count/by-state?party="+e.params.data.id, function(data_response){
      window.electroscope.drawChoroplethMap(topoResponse, data_response.data[0].state_counts, topoOption);
    });

    // First 3 BOX
    electroscope.getJSON("/api/candidates/count/by-parliament?party="+e.params.data.id, function(response){
      var data = response.data[0].parliament_counts;
      $("#upper_house_count").text(data[2].count);
      $("#lower_house_count").text(data[1].count);
      $("#state_region_count").text(data[0].count);
    });

    chartList.forEach(function(chartType){
      electroscope.getJSON("/api/candidates/count/by-"+chartType+"?party="+e.params.data.id, chartCallbacks[chartType]);
    });
  }

  function showAll() {
    $("#states_choropleth").find("svg").remove();
    electroscope.getJSON("/api/candidates/count/by-state", function(data_response){
      window.electroscope.drawChoroplethMap(topoResponse, data_response.data[0].state_counts, topoOption);
    });

    electroscope.getJSON("/api/candidates/count/by-parliament", function(response){
      var data = response.data[0].parliament_counts;
      data.map(function(item){
        if(item.parliament === "AMH"){
          $('#upper_house_count').text(item.count);
        }else if(item.parliament === "PTH"){
          $('#lower_house_count').text(item.count);
        }else{
          $('#state_region_count').text(item.count);
        }
      });
    });

    chartList.forEach(function(chartType){
      electroscope.getJSON("/api/candidates/count/by-"+chartType, chartCallbacks[chartType]);
    });
  }

  $(document).ready(function(){

    $('ul.tabs').tabs();

    // Add parties list
    electroscope.getJSON("/api/parties",function(response){
      var party = response.data;
      $('.party_list').append('<option value="all">All</option>')
      for(var key  in party){
        $('.party_list').append('<option value="' + key + '">' + party[key] + ' ('+  key+')</option>')
      }
    });

    // First 3 BOX
    electroscope.getJSON("/api/candidates/count/by-parliament", function(response){
      var data = response.data[0].parliament_counts;
      data.map(function(item){
        if(item.parliament === "AMH"){
          $('#upper_house_count').text(item.count);
        }else if(item.parliament === "PTH"){
          $('#lower_house_count').text(item.count);
        }else{
          $('#state_region_count').text(item.count);
        }
      });
    });

    chartList.forEach(function(chartType){
      electroscope.getJSON("/api/candidates/count/by-"+chartType, chartCallbacks[chartType]);
    });

    electroscope.getJSON("/states_regions.topojson", function(topo_response){
      topoResponse = topo_response;
      topoOption = {
        element: "#states_choropleth",
        width: 400,
        height: 600,
        defaultColor: "red",
        metaKey: "output2",
        regionNameField: "name",
        regionCodeField: "ST_PCODE",
        onClickHandler: function(d){
          //console.log("Clicked", d);
        }
      };

      electroscope.getJSON("/api/candidates/count/by-state", function(data_response){
        window.electroscope.drawChoroplethMap(topoResponse, data_response.data[0].state_counts, topoOption);
      });
    });

    $('.party_list').select2({
      placeholder : 'Please select the party'
    }).on('select2:select', selectParty);

  });
})();
