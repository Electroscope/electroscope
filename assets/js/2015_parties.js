(function(){
  var callbacks = {
    state: function (response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var state_counts = [];
      var region_counts = [];
      var states = ["Bago", "Mandalay", "Magway", "Yangon", "Ayeyarwady", "Sagaing", "Tanintharyi"];

      data.slice(0, limit).map(function(item) {
	labels.push(item.party);
	state_counts.push(0);
	region_counts.push(0);

	item.state_counts.map(function (p) {
	  if (states.indexOf(p.state) == -1) {
	    region_counts[region_counts.length-1] += p.count;
	  } else {
	    state_counts[state_counts.length-1] += p.count;
	  }
	});
      });

      labels.push("Others");
      state_counts.push(0);
      region_counts.push(0);

      data.slice(limit, data.length).map(function(item) {
	item.state_counts.map(function (p) {
	  if (states.indexOf(p.state) == -1) {
	    region_counts[region_counts.length-1] += p.count;
	  } else {
	    state_counts[state_counts.length-1] += p.count;
	  }
	});
      });

      var chartData = {
	labels: labels,
	datasets: [
	  {
            label: "State Winners",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: state_counts
	  },
	  {
            label: "Region Winners",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: region_counts
	  },
	]
      };

      var canvas = document.getElementById("stateregioncount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
	label: "By Candidate Count",
	fillColor: "rgba(247, 50, 50, 0.75)",
	strokeColor: "rgba(247, 50, 50, 0.8)",
	highlightFill: "rgba(247, 50, 50, 0.5)",
	highlightStroke: "rgba(247, 50, 50, 1)",
	scaleFontColor: "#fff"
      });
    },

    parliament: function (response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var amh_counts = [];
      var pth_counts = [];
      var rgh_counts = [];

      data.slice(0, limit).map(function(item) {
	labels.push(item.party);
	pth_counts.push(0);
	amh_counts.push(0);
	rgh_counts.push(0);

	item.parliament_counts.map(function (p) {
	  
	  if (p.parliament == "RGH") {
	    rgh_counts[rgh_counts.length-1] = p.count;
	  } else if (p.parliament == "AMH") {
	    amh_counts[amh_counts.length-1] = p.count;
	  } else {
	    pth_counts[pth_counts.length-1] = p.count;
	  }
	});
      });

      labels.push("Others");
      pth_counts.push(0);
      amh_counts.push(0);
      rgh_counts.push(0);

      data.slice(limit, data.length).map(function(item) {
	item.parliament_counts.map(function (p) {
	  if (p.parliament == "RGH") {
	    rgh_counts[limit] += p.count;
	  } else if (p.parliament == "AMH") {
	    amh_counts[limit] += p.count;
	  } else {
	    pth_counts[limit] += p.count;
	  }
	});
      });

  var chartData = {
	labels: labels,
	datasets: [
	  {
            label: "Amyothar Hluttaw",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: amh_counts
	  },
	  {
            label: "Pyithu Hluttaw",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: pth_counts
	  },
	  {
            label: "Regional Hluttaw",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: rgh_counts
	  }
	]
      };

      var canvas = document.getElementById("candidatecount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
	label: "By Candidate Count",
	fillColor: "rgba(247, 50, 50, 0.75)",
	strokeColor: "rgba(247, 50, 50, 0.8)",
	highlightFill: "rgba(247, 50, 50, 0.5)",
	highlightStroke: "rgba(247, 50, 50, 1)",
	scaleFontColor: "#fff"
      });
    },

    gender: function (response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var male_counts = [];
      var female_counts = [];

      data.slice(0, limit).map(function(item) {
	labels.push(item.party);
	item.gender_counts.map(function (p) {
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
	item.gender_counts.map(function (p) {
	  if (p.gender == "M") {
	    male_counts[limit] += p.count;
	  } else if (p.gender == "F") {
	    female_counts[limit] += p.count;
	  }
	});
      });

      var chartData = {
	labels: labels,
	datasets: [
	  {
            label: "Male",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: male_counts
	  },
	  {
            label: "Pyithu Hluttaw",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: female_counts
	  },
	]
      };

      var canvas = document.getElementById("gendercount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
	label: "By Gender Ratio",
	fillColor: "rgba(247, 50, 50, 0.75)",
	strokeColor: "rgba(247, 50, 50, 0.8)",
	highlightFill: "rgba(247, 50, 50, 0.5)",
	highlightStroke: "rgba(247, 50, 50, 1)",
	scaleFontColor: "#fff"
      });
    },

    educated: function (response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var bwaeya_counts = [];
      var nonbwaeya_counts = [];

      data.slice(0, limit).map(function(item) {
	labels.push(item.party);
	item.educated_counts.map(function (p) {
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
	item.educated_counts.map(function (p) {
	  if (p.educated == true) {
	    bwaeya_counts[limit] += p.count;
	  } else {
	    nonbwaeya_counts[limit] += p.count;
	  }
	});
      });

      var chartData = {
	labels: labels,
	datasets: [
	  {
            label: "Male",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: bwaeya_counts
	  },
	  {
            label: "Pyithu Hluttaw",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: nonbwaeya_counts
	  },
	]
      };

      var canvas = document.getElementById("bwaeya-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
	label: "With or Without Degree",
	fillColor: "rgba(247, 50, 50, 0.75)",
	strokeColor: "rgba(247, 50, 50, 0.8)",
	highlightFill: "rgba(247, 50, 50, 0.5)",
	highlightStroke: "rgba(247, 50, 50, 1)",
	scaleFontColor: "#fff"
      });
    },

    ethnicity: function (response) {
      var limit = 7;
      var data = response.data;
      var labels = [];
      var burmese_counts = [];
      var nonburmese_counts = [];

      data.slice(0, limit).map(function(item) {
	labels.push(item.party);
	item.ethnicity_counts.map(function (p) {
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
	item.ethnicity_counts.map(function (p) {
	  if (p.ethnicity == "ဗမာ") {
	    burmese_counts[limit] += p.count;
	  } else {
	    nonburmese_counts[limit] += p.count;
	  }
	});
      });

      var chartData = {
	labels: labels,
	datasets: [
	  {
            label: "Burmese",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: burmese_counts
	  },
	  {
            label: "Non-Burmese",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: nonburmese_counts
	  },
	]
      };

      var canvas = document.getElementById("ethnicitycount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
	label: "By Ethnicity Ratio",
	fillColor: "rgba(247, 50, 50, 0.75)",
	strokeColor: "rgba(247, 50, 50, 0.8)",
	highlightFill: "rgba(247, 50, 50, 0.5)",
	highlightStroke: "rgba(247, 50, 50, 1)",
	scaleFontColor: "#fff"
      });
    },

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
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: under_50_counts
	  },
	  {
            label: "Over 50",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: over_50_counts
	  },
	]
      };

      var canvas = document.getElementById("agegroupcount-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
	label: "By Ethnicity Ratio",
	fillColor: "rgba(247, 50, 50, 0.75)",
	strokeColor: "rgba(247, 50, 50, 0.8)",
	highlightFill: "rgba(247, 50, 50, 0.5)",
	highlightStroke: "rgba(247, 50, 50, 1)",
	scaleFontColor: "#fff"
      });
    }
  };

  $(document).ready(function(){
    var baseUrl = "http://localhost:3000";
    
    
    

    
    var chartList = [
      "parliament",
      "state",
      "gender",
      "ethnicity",
      "educated",
      "agegroup"
    ];
    chartList.map(function(chartType){
      $.getJSON(baseUrl + "/api/candidates/count/by-" + chartType +"?year=2015&group_by=party", callbacks[chartType]);
    });

    
  });
})();
