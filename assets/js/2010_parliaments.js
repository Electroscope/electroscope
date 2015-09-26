(function(){
  var winnersChartByParty = function (response) {
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
          fillColor: "RGBA(83, 133, 199, 0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: rgh_counts
	}
      ]
    };

    var canvas = document.getElementById("winnerpartycount-canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var myChart = new Chart(ctx).Bar(chartData, {
      label: "Party",
      fillColor: "rgba(247, 50, 50, 0.75)",
      strokeColor: "rgba(247, 50, 50, 0.8)",
      highlightFill: "rgba(247, 50, 50, 0.5)",
      highlightStroke: "rgba(247, 50, 50, 1)",
      scaleFontColor: "#757575",
      multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });
    document.getElementById('winnerparty-legend').innerHTML = myChart.generateLegend();
  };

  var votesChartByParty = function (response) {
    var limit = 7;
    var data = response.data;
    var labels = [];
    var amh_votes = [];
    var pth_votes = [];
    var rgh_votes = [];

    data.slice(0, limit).map(function(item) {
      labels.push(item.party);
      pth_votes.push(0);
      amh_votes.push(0);
      rgh_votes.push(0);

      item.parliament_counts.map(function (p) {
	if (p.parliament == "RGH") {
	  rgh_votes[rgh_votes.length-1] = p.votes;
	} else if (p.parliament == "AMH") {
	  amh_votes[amh_votes.length-1] = p.votes;
	} else {
	  pth_votes[pth_votes.length-1] = p.votes;
	}
      });
    });

    labels.push("Others");
    pth_votes.push(0);
    amh_votes.push(0);
    rgh_votes.push(0);

    data.slice(limit, data.length).map(function(item) {
      item.parliament_counts.map(function (p) {
	if (p.parliament == "RGH") {
	  rgh_votes[limit] += p.votes;
	} else if (p.parliament == "AMH") {
	  amh_votes[limit] += p.votes;
	} else {
	  pth_votes[limit] += p.votes;
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
          data: amh_votes
	},
	{
          label: "Pyithu Hluttaw",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: pth_votes
	},
	{
          label: "Regional Hluttaw",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: rgh_votes
	}
      ]
    };

    var canvas = document.getElementById("votespartycount-canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var myChart = new Chart(ctx).Bar(chartData, {
      label: "By Candidate Count",
      fillColor: "rgba(247, 50, 50, 0.75)",
      strokeColor: "rgba(247, 50, 50, 0.8)",
      highlightFill: "rgba(247, 50, 50, 0.5)",
      highlightStroke: "rgba(247, 50, 50, 1)",
      scaleFontColor: "#757575",
      multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });
    document.getElementById('votesparty-legend').innerHTML = myChart.generateLegend();
  };

  var winnersChartByStateRegion = function (response) {
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
          label: "State",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: state_counts
	},
	{
          label: "Region",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: region_counts
	},
      ]
    };

    var canvas = document.getElementById("winnerstatecount-canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var myChart = new Chart(ctx).Bar(chartData, {
      label: "By Candidate Count",
      fillColor: "rgba(247, 50, 50, 0.75)",
      strokeColor: "rgba(247, 50, 50, 0.8)",
      highlightFill: "rgba(247, 50, 50, 0.5)",
      highlightStroke: "rgba(247, 50, 50, 1)",
      scaleFontColor: "#757575",
      multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
      scaleFontColor: "#fff",
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"chart-legend\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });
    document.getElementById('winnerstate-legend').innerHTML = myChart.generateLegend();
  };

  var votersCountByPopulation = function (response) {
    var census18PopData = {
      "Kachin": 1051258,
      "Kayah": 170503,
      "Kayin": 884110,
      "Chin": 257686,
      "Sagaing": 3506301,
      "Tanintharyi": 851675,
      "Bago": 3224090,
      "Magway": 2667883,
      "Mandalay": 4230345,
      "Mon": 1300367,
      "Rakhine": 1328392,
      "Yangon": 5228050,
      "Shan": 3611343,
      "Ayeyarwady": 4040022
    };

    var data = response.data;
    var states = ['Bago', 'Sagaing', 'Tanintharyi', "Magway", 'Mandalay', "Yangon", "Ayeyarwady"];
    var state_labels = [];
    var region_labels = [];
    var state_parliament_votes = {
      "RGH" : [],
      "AMH": [],
      "PTH": []
    };
    var region_parliament_votes = {
      "RGH" : [],
      "AMH": [],
      "PTH": []
    };

    var state_populations = [];
    var region_populations = [];

    data.map(function (item) {
      var parliament = item.parliament;
      item.state_counts.map(function (s) {
	if (s.state == "") {
	}
	else if (states.indexOf(s.state) == -1) {
	    if(region_labels.indexOf(s.state) == -1) {
	      region_labels.push(s.state);
	      region_populations.push(census18PopData[s.state]);
	    }
	    region_parliament_votes[parliament].push(s.votes);
	} else {
	  if(state_labels.indexOf(s.state) == -1) {
	    state_labels.push(s.state);
	    state_populations.push(census18PopData[s.state]);
	  }
	  state_parliament_votes[parliament].push(s.votes);
	}
      });
    });

    var statechartData = {
      labels: state_labels,
      datasets: [
    	{
          label: "Regional Hluttaw",
          fillColor: "rgba(50,50,50,0.5)",
          strokeColor: "rgba(60,60,60,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: state_parliament_votes['RGH']
    	},
    	{
          label: "Pyithu Hluttaw",
          fillColor: "rgba(100,100,100,0.5)",
          strokeColor: "rgba(100,100,100,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: state_parliament_votes['PTH']
    	},
    	{
          label: "Amyothar Hluttaw",
          fillColor: "rgba(150,150,150,0.5)",
          strokeColor: "rgba(150,150,150,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: state_parliament_votes['AMH']
    	},
    	{
          label: "Population",
          fillColor: "rgba(200,200,200,0.5)",
          strokeColor: "rgba(200,200,200,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: state_populations
    	}
      ]
    };

    var regionchartData = {
      labels: state_labels,
      datasets: [
    	{
          label: "Regional Hluttaw",
          fillColor: "rgba(50,50,50,0.5)",
          strokeColor: "rgba(60,60,60,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: region_parliament_votes['RGH']
    	},
    	{
          label: "Pyithu Hluttaw",
          fillColor: "rgba(100,100,100,0.5)",
          strokeColor: "rgba(100,100,100,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: region_parliament_votes['PTH']
    	},
    	{
          label: "Amyothar Hluttaw",
          fillColor: "rgba(150,150,150,0.5)",
          strokeColor: "rgba(150,150,150,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: region_parliament_votes['AMH']
    	},
    	{
          label: "Population",
          fillColor: "rgba(200,200,200,0.5)",
          strokeColor: "rgba(200,200,200,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: region_populations
    	}
      ]
    };

    var canvas = document.getElementById("statevoterscount-canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var myChart = new Chart(ctx).Radar(statechartData, {
      label: "Radar",
      fillColor: "rgba(247, 50, 50, 0.75)",
      strokeColor: "rgba(247, 50, 50, 0.8)",
      highlightFill: "rgba(247, 50, 50, 0.5)",
      highlightStroke: "rgba(247, 50, 50, 1)",
      scaleFontColor: "#000",
      multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
    });

    var canvas2 = document.getElementById("regionvoterscount-canvas");
    var ctx2 = canvas2.getContext("2d");
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    var myChart2 = new Chart(ctx2).Radar(regionchartData, {
      label: "Radar",
      fillColor: "rgba(247, 50, 50, 0.75)",
      strokeColor: "rgba(247, 50, 50, 0.8)",
      highlightFill: "rgba(247, 50, 50, 0.5)",
      highlightStroke: "rgba(247, 50, 50, 1)",
      scaleFontColor: "#000",
      multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
    });

  };

  $(document).ready(function(){
    var baseUrl = "http://localhost:3000";
    $.getJSON(baseUrl + "/api/winners/count/by-parliament?group_by=party", winnersChartByParty);
    $.getJSON(baseUrl + "/api/votes/count/by-parliament?group_by=party", votesChartByParty);
    $.getJSON(baseUrl + "/api/winners/count/by-state?group_by=party", winnersChartByStateRegion);
    $.getJSON(baseUrl + "/api/votes/count/by-state?group_by=parliament", votersCountByPopulation);
  });

})();
