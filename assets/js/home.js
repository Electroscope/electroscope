  var stateMaps = [
    {name: "Ayeyarwady", path: "Ayeyarwady.topojson"},
    {name: "Bago_East", path: "Bago_East.topojson"},
    {name: "Bago_West", path: "Bago_West.topojson"},
    {name: "Chin", path: "Chin.topojson"},
    {name: "Kachin", path: "Kachin.topojson"},
    {name: "Kayah", path: "Kayah.topojson"},
    {name: "Kayin", path: "Kayin.topojson"},
    {name: "Magway", path: "Magway.topojson"},
    {name: "Mandalay", path: "Mandalay.topojson"},
    {name: "Mon", path: "Mon.topojson"},
    {name: "Nay_Pyi_Taw", path: "Nay_Pyi_Taw.topojson"},
    {name: "Rakhine", path: "Rakhine.topojson"},
    {name: "Sagaing", path: "Sagaing.topojson"},
    {name: "Shan_East", path: "Shan_East.topojson"},
    {name: "Shan_North", path: "Shan_North.topojson"},
    {name: "Shan_South", path: "Shan_South.topojson"},
    {name: "Tanintharyi", path: "Tanintharyi.topojson"},
    {name: "Yangon", path: "Yangon.topojson"}
  ];

var $states = {};

var $pthStates;
var $amhStates;

(function(electroscope){

  function templateReplace(template, state, ll) {
    var stateData;

    if (ll === "pth") {
      for (var k = 0; k < $pthStates.length; k++) {
        if ($pthStates[k].state_code === state.code) {
          stateData = $pthStates[k];
          break; 
        } 
      };
    } else {
      for (var k = 0; k < $amhStates.length; k++) {
        if ($amhStates[k].state_code === state.code) {
          stateData = $amhStates[k];
          break;
        } 
      };
    }

    var slice5_total = 0;
    var sorted = stateData.party_counts.sort(function (a,b) {
      return a.count < b.count;
    });

    sorted.slice(5).forEach(function (e){
      slice5_total += e.count;
    });


    var total = stateData.total_count;
    var data = {
      title: state.name,
      team1: sorted[0].party,
      team1Percentage: ((sorted[0].count / total) * 100 ).toFixed(2),
      team2: sorted[1].party,
      team2Percentage: ((sorted[1].count / total) * 100 ).toFixed(2),
      team3: sorted[2].party,
      team3Percentage: ((sorted[2].count / total) * 100 ).toFixed(2),
      team4: sorted[3].party,
      team4Percentage: ((sorted[3].count / total) * 100 ).toFixed(2),
      team5: sorted[4].party,
      team5Percentage: ((sorted[4].count / total) * 100 ).toFixed(2),
      other: ((slice5_total / total) * 100 ).toFixed(2)
    };

    console.log(data);

    return template.replace(/\{[\w-_]+\}/g, function (match) {
      match = match.match(/[\w-_]+/)[0];
      if (match in data) {
        return data[match];
      } else {
        return "";
      }
    });
  }

  var $$maps = $("#maps");
  var $$vs = $("#vs");
  var $$statesListDropdown = $("#statesListDropdown");

  var vsTemplate = "<h1>{title}</h1>"
    + "<h3>{team1} {team1Percentage}% | {team2} {team2Percentage}%"
    + "<h5>{team3} {team3Percentage}%"
    + "<h5>{team4} {team4Percentage}%"
    + "<h5>{team5} {team5Percentage}%"
    + "<h5>Other {other}%"

  $.getJSON("http://localhost:3000/api/candidates/count/by-party?group_by=state_code&parliament=PTH", function (data) {
    $pthStates = data.data;
  });

  $.getJSON("http://localhost:3000/api/candidates/count/by-party?group_by=state_code&parliament=AMH", function (data) {
    $amhStates = data.data;
  });

  stateMaps.forEach(function (state, i) {
    state.id = state.name.toLowerCase();
    if (i === 0) {
      $$maps.append("<div id='" + state.id + "' class='state-map'></div>");
    } else {
      $$maps.append("<div id='" + state.id + "' class='state-map'></div>");
    }
    
    $$statesListDropdown.append("<li data-value='" + state.id + "'><a href='#!'>" + state.name.replace("_", " ") + "</a></li>");

    $.getJSON("http://localhost:3000/seperate_topo_lower/" + state.path, function(data){
      var defaultColor = "#ffffff";
      var statePartyCountCache = null;
      var options = {
        element: "#" + state.id,
        width: 400,
        height: 600,
        defaultColor: defaultColor,
        metaKey: state.name,
        regionNameField: "name",
        regionCodeField: "ST_PCODE"
      };
      var map = electroscope.drawD3Map(data, options)
        .style("stroke", "#ffffff")
        .style("stroke-width", "1px");

      $states[state.id] = {
        name: state.name.replace(/_/g, " "),
        data: data,
        map: map,
        code: data.objects[state.name].geometries[0].properties.ST_PCODE
      }

      if (i === 0) {
        setTimeout(function () {
          $$vs.html(templateReplace(vsTemplate, $states[state.id], "pth"))
        }, 1000)
      }
    });
  });

  $$maps.find(".state-map").hide();
  $$maps.find(".state-map").first().show();

  $$statesListDropdown.find("li").click(function (event){
    var id = this.getAttribute("data-value");
    event.preventDefault();
    if (id) {
      $$maps.find(".state-map").hide(300);
      setTimeout(function () {
        $("#" + id).show(300);
      });
      $("#dropdown-button").text( $states[id].name );
      $$vs.html(templateReplace(vsTemplate, $states[id], "pth"));
    }
  });

(function(){
  var callbacks = {
    agegroup: function (response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var under_50_counts = [];
      var over_50_counts = [];

      data.slice(0, limit).map(function(item) {
        labels.push(item.party);
        under_50_counts.push(0);
        over_50_counts.push(0);
        item.agegroup_counts.map(function (p) {
          switch(p.agegroup) {
          case "20-30":
            under_50_counts[under_50_counts.length-1] += p.count;
            break;
          case "30-40":
            under_50_counts[under_50_counts.length-1] += p.count;
            break;
          case "40-50":
            under_50_counts[under_50_counts.length-1] += p.count;
            break;
          default:
            over_50_counts[over_50_counts.length-1] += p.count;
          }
        });
      });

      labels.push("Others");
      under_50_counts.push(0);
      over_50_counts.push(0);

      data.slice(limit, data.length).map(function(item) {
        item.agegroup_counts.map(function (p) {
          switch(p.agegroup) {
          case "20-30":
            under_50_counts[under_50_counts.length-1] += p.count;
            break;
          case "30-40":
            under_50_counts[under_50_counts.length-1] += p.count;
            break;
          case "40-50":
            under_50_counts[under_50_counts.length-1] += p.count;
            break;
          default:
            over_50_counts[over_50_counts.length-1] += p.count;
          }
        });
      });

      var chartData = {
        labels: labels,
        datasets: [
          {
                  label: "Under 50",
                  fillColor: "#ffffff",
                  strokeColor: "#ffffff",
                  highlightFill: "#ffffff",
                  highlightStroke: "#ffffff",
                  data: under_50_counts
          },
          {
                  label: "Over 50",
                  fillColor: "#ffffff",
                  strokeColor: "#ffffff",
                  highlightFill: "#ffffff",
                  highlightStroke: "#ffffff",
                  data: over_50_counts
          },
        ]
      };

      var canvas = document.getElementById("agegroupcount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
        label: "By Ethnicity Ratio",
        fillColor: "#ffffff",
        strokeColor: "#ffffff",
        highlightFill: "#ffffff",
        highlightStroke: "#ffffff",
        scaleFontColor: "#fff"
      });
    }
  };

  $(document).ready(function(){
    var chartList = [
      "agegroup"
    ];
    var baseUrl = "http://localhost:3000";
    chartList.map(function(chartType){
      $.getJSON(baseUrl + "/api/candidates/count/by-" + chartType +"?year=2015&group_by=party", callbacks[chartType]);
    });
  });
})();


  
})(window.electroscope);