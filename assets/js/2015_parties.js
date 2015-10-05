(function() {
  var callbacks = {
    parliament: function(response) {
      var limit = 7 + 2;
      var data = response.data;
      var labels = [];
      var amh_counts = [];
      var pth_counts = [];
      var rgh_counts = [];
      data.slice(0, limit).map(function(item) {
	if(item.party == "NUP") return;
	if(item.party == "NDP") return;

        labels.push(item.party);
        pth_counts.push(0);
        amh_counts.push(0);
        rgh_counts.push(0);
        item.parliament_counts.map(function(p) {
          if (p.parliament == "RGH") {
            rgh_counts[rgh_counts.length - 1] = p.count;
          } else if (p.parliament == "AMH") {
            amh_counts[amh_counts.length - 1] = p.count;
          } else {
            pth_counts[pth_counts.length - 1] = p.count;
          }
        });
      });

      labels.push("Others");
      pth_counts.push(0);
      amh_counts.push(0);
      rgh_counts.push(0);

      data.slice(limit, data.length).map(function(item) {
        item.parliament_counts.map(function(p) {
          if (p.parliament == "RGH") {
            rgh_counts[rgh_counts.length-1] += p.count;
          } else if (p.parliament == "AMH") {
            amh_counts[amh_counts.length-1] += p.count;
          } else {
            pth_counts[pth_counts.length-1] += p.count;
          }
        });
      });

      var chartData = {
        labels: labels,
        datasets: [{
          label: "Amyothar Hluttaw",
          fillColor: "#00BCD4",
          strokeColor: "#00BCD4",
          highlightFill: "#00BCD4",
          highlightStroke: "#00BCD4",
          data: amh_counts
        }, {
          label: "Pyithu Hluttaw",
          fillColor: "#009688",
          strokeColor: "#009688",
          highlightFill: "#009688",
          highlightStroke: "#009688",
          data: pth_counts
        }, {
          label: "Regional Hluttaw",
          fillColor: "#4caf50",
          strokeColor: "#4caf50",
          highlightFill: "#4caf50",
          highlightStroke: "#4caf50",
          data: rgh_counts
        }]
      };

      //Parliament Chart
      var canvas = document.getElementById("candidatecount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var myChart = new Chart(ctx).Bar(chartData, {
        label: "By Candidate Count",
        scaleLineColor: "#999",
        scaleGridLineColor: "#999",
        scaleShowVerticalLines: false,
        responsive: true,
        scaleFontColor: "#999",
	multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('candidatecount-legend').innerHTML = myChart.generateLegend();
    },

    state: function(response) {
      var limit = 7 + 2;
      var data = response.data;
      var labels = [];
      var state_counts = [];
      var region_counts = [];
      var states = ["Bago", "Mandalay", "Magway", "Yangon", "Ayeyarwady", "Sagaing", "Tanintharyi"];

      data.slice(0, limit).map(function(item) {
	if (item.party == "NUP") return;
	if (item.party == "NDP") return;
        labels.push(item.party);
        state_counts.push(0);
        region_counts.push(0);
        item.state_counts.map(function(p) {
          if (states.indexOf(p.state) == -1) {
            region_counts[region_counts.length - 1] += p.count;
          } else {
            state_counts[state_counts.length - 1] += p.count;
          }
        });
      });

      labels.push("Others");
      state_counts.push(0);
      region_counts.push(0);
      data.slice(limit, data.length).map(function(item) {
        item.state_counts.map(function(p) {
          if (states.indexOf(p.state) == -1) {
            region_counts[region_counts.length - 1] += p.count;
          } else {
            state_counts[state_counts.length - 1] += p.count;
          }
        });
      });

      var chartData = {
        labels: labels,
        datasets: [{
          label: "State",
          fillColor: "#ffffff",
          strokeColor: "#ffffff",
          highlightFill: "#ffffff",
          highlightStroke: "#ffffff",
          data: state_counts
        }, {
          label: "Region",
          fillColor: "#009688",
          strokeColor: "#009688",
          highlightFill: "#009688",
          highlightStroke: "#009688",
          data: region_counts
        }]
      };
      var canvas = document.getElementById("stateregioncount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var myChart = new Chart(ctx).Bar(chartData, {
        label: "By Candidate Count",
        scaleLineColor: "#ffffff",
        scaleGridLineColor: "#ffffff",
        scaleShowVerticalLines: false,
        responsive: true,
        scaleFontColor: "#ffffff",
	multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('state-region-legend').innerHTML = myChart.generateLegend();
    },

    gender: function(response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var male_counts = [];
      var female_counts = [];
      data.slice(0, limit).map(function(item) {
        labels.push(item.party);
        item.gender_counts.map(function(p) {
          if (p.gender == "M") {
            male_counts.push(p.count);
          } else if (p.gender == "F") {
            female_counts.push(p.count);
          }
        });
      });
      labels.push("Others");
      male_counts.push(0);
      female_counts.push(0);
      data.slice(limit, data.length).map(function(item) {
        item.gender_counts.map(function(p) {
          if (p.gender == "M") {
            male_counts[limit] += p.count;
          } else if (p.gender == "F") {
            female_counts[limit] += p.count;
          }
        });
      });
      var chartData = {
        labels: labels,
        datasets: [{
          label: "Male",
          fillColor: "#4CAF50",
          strokeColor: "#4CAF50",
          highlightFill: "#4CAF50",
          highlightStroke: "#4CAF50",
          data: male_counts
        }, {
          label: "Female",
          fillColor: "#ffffff",
          strokeColor: "#ffffff",
          highlightFill: "#ffffff",
          highlightStroke: "#ffffff",
          data: female_counts
        }]
      };
      var canvas = document.getElementById("gendercount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var myChart = new Chart(ctx).Bar(chartData, {
        label: "By Gender Ratio",
        scaleLineColor: "#ffffff",
        scaleGridLineColor: "#ffffff",
        scaleShowVerticalLines: false,
        responsive: true,
        scaleFontColor: "#ffffff",
	multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('gendercount-legend').innerHTML = myChart.generateLegend();
    },

    educated: function(response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var bwaeya_counts = [];
      var nonbwaeya_counts = [];
      data.slice(0, limit).map(function(item) {
        labels.push(item.party);
        item.educated_counts.map(function(p) {
          if (p.educated == true) {
            bwaeya_counts.push(p.count);
          } else {
            nonbwaeya_counts.push(p.count);
          }
        });
      });
      labels.push("Others");
      bwaeya_counts.push(0);
      nonbwaeya_counts.push(0);
      data.slice(limit, data.length).map(function(item) {
        item.educated_counts.map(function(p) {
          if (p.educated == true) {
            bwaeya_counts[limit] += p.count;
          } else {
            nonbwaeya_counts[limit] += p.count;
          }
        });
      });
      var chartData = {
        labels: labels,
        datasets: [{
          label: "Graduated",
          fillColor: "#4caf50",
          strokeColor: "#4caf50",
          highlightFill: "#4caf50",
          highlightStroke: "#4caf50",
          data: bwaeya_counts
        }, {
          label: "Non-graduated",
          fillColor: "#ffffff",
          strokeColor: "#ffffff",
          highlightFill: "#ffffff",
          highlightStroke: "#ffffff",
          data: nonbwaeya_counts
        }]
      };
      var canvas = document.getElementById("bwaeya-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var myChart = new Chart(ctx).Bar(chartData, {
        label: "With or Without Degree",
        scaleLineColor: "#ffffff",
        scaleGridLineColor: "#ffffff",
        scaleShowVerticalLines: false,
        responsive: true,
        scaleFontColor: "#ffffff",
	multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('education-legend').innerHTML = myChart.generateLegend();
    },
    //Ethnicity Chart
    ethnicity: function(response) {
      var limit = 7 + 2;
      var data = response.data;
      var labels = [];
      var burmese_counts = [];
      var nonburmese_counts = [];
      data.slice(0, limit).map(function(item) {
	if(item.party == "MFDP") return;
	if(item.party == "NDP") return;
        labels.push(item.party);
        item.ethnicity_counts.map(function(p) {
          if (p.ethnicity == "ဗမာ") {
            burmese_counts.push(p.count);
            nonburmese_counts.push(item.total_count - p.count);
          }
        });
      });
      labels.push("Others");
      burmese_counts.push(0);
      nonburmese_counts.push(0);
      data.slice(limit, data.length).map(function(item) {
        item.ethnicity_counts.map(function(p) {
          if (p.ethnicity == "ဗမာ") {
            burmese_counts[burmese_counts.length-1] += p.count;
          } else {
            nonburmese_counts[nonburmese_counts.length-1] += p.count;
          }
        });
      });

      var chartData = {
        labels: labels,
        datasets: [{
          label: "Burmese",
          fillColor: "#ffffff",
          strokeColor: "#ffffff",
          highlightFill: "#ffffff",
          highlightStroke: "#ffffff",
          data: burmese_counts
        }, {
          label: "Non-Burmese",
          fillColor: "#999999",
          strokeColor: "#999999",
          highlightFill: "#999999",
          highlightStroke: "#999999",
          data: nonburmese_counts
        }]
      };
      var canvas = document.getElementById("ethnicitycount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var myChart = new Chart(ctx).Bar(chartData, {
        label: "By Ethnicity Ratio",
        scaleLineColor: "#ffffff",
        scaleGridLineColor: "#ffffff",
        scaleShowVerticalLines: false,
        responsive: true,
        scaleFontColor: "#ffffff",
	multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('burmese-none-legend').innerHTML = myChart.generateLegend();
    },
    // Age Group Chart
    agegroup: function(response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var under_50_counts = [];
      var over_50_counts = [];
      data.slice(0, limit).map(function(item) {
        labels.push(item.party);
        under_50_counts.push(0);
        over_50_counts.push(0);
        item.agegroup_counts.map(function(p) {
          switch (p.agegroup) {
            case "20-30":
              under_50_counts[under_50_counts.length - 1] += p.count;
              break;
            case "30-40":
              under_50_counts[under_50_counts.length - 1] += p.count;
              break;
            case "40-50":
              under_50_counts[under_50_counts.length - 1] += p.count;
              break;
            default:
              over_50_counts[over_50_counts.length - 1] += p.count;
          }
        });
      });
      labels.push("Others");
      under_50_counts.push(0);
      over_50_counts.push(0);
      data.slice(limit, data.length).map(function(item) {
        item.agegroup_counts.map(function(p) {
          switch (p.agegroup) {
            case "20-30":
              under_50_counts[under_50_counts.length - 1] += p.count;
              break;
            case "30-40":
              under_50_counts[under_50_counts.length - 1] += p.count;
              break;
            case "40-50":
              under_50_counts[under_50_counts.length - 1] += p.count;
              break;
            default:
              over_50_counts[over_50_counts.length - 1] += p.count;
          }
        });
      });
      var chartData = {
        labels: labels,
        datasets: [{
          label: "Under 50",
          fillColor: "#4CAF50",
          strokeColor: "#4CAF50",
          highlightFill: "#4CAF50",
          highlightStroke: "#4CAF50",
          data: under_50_counts
        }, {
          label: "Over 50",
          fillColor: "#009688",
          strokeColor: "#009688",
          highlightFill: "#009688",
          highlightStroke: "#009688",
          data: over_50_counts
        }]
      };
      var canvas = document.getElementById("agegroupcount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 0, 0);
      var myChart = new Chart(ctx).Bar(chartData, {
        label: "By Ethnicity Ratio",
        scaleLineColor: "#ffffff",
        scaleGridLineColor: "#ffffff",
        scaleShowVerticalLines: false,
        responsive: true,
        scaleFontColor: "#ffffff",
	multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      });
      document.getElementById('candidate-count-legend').innerHTML = myChart.generateLegend();
    }
  };
  $(document).ready(function() {
    var baseUrl = "http://api.electroscope.info";
    var chartList = [
      "parliament",
      "state",
      "gender",
      "ethnicity",
      "educated",
      "agegroup"
    ];
    chartList.map(function(chartType) {
      $.getJSON(baseUrl + "/api/candidates/count/by-" + chartType + "?year=2015&group_by=party", callbacks[chartType]);
    });
  });
})();
