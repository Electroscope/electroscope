(function() {
  var renderCandidateCountByParty = function(data, limit) {
    var labels = [];
    var amh_counts = [];
    var pth_counts = [];
    var rgh_counts = [];
    data.slice(0, limit).map(function(item) {
      labels.push(item.party);
      pth_counts.push(0);
      amh_counts.push(0);
      rgh_counts.push(0);
      item.parliament_counts.map(function(p) {
        console.log(p);
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
      datasets: [{
        label: "Amyothar Hluttaw",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: amh_counts
      }, {
        label: "Pyithu Hluttaw",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: pth_counts
      }, {
        label: "Regional Hluttaw",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: rgh_counts
      }]
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
  };
  $(document).ready(function() {
    electroscope.getJSON("/api/candidates/count/by-parliament?year=2010&group_by=party", function(response) {
      renderCandidateCountByParty(response.data, 5);
    });
  });
})();
