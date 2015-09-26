(function(){


  var chartCallbacks = {
    agegroup: function(response){
      var data = response.data[0];

      data["agegroup_counts"]= data["agegroup_counts"].sort(function(first, second){
	console.log(first.agegroup, second.agegroup);
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
                  fillColor: "rgba(247, 50, 50, 0.75)",
                  strokeColor: "rgba(247, 50, 50, 0.8)",
                  highlightFill: "rgba(247, 50, 50, 0.5)",
                  highlightStroke: "rgba(247, 50, 50, 1)",
                  data: counts
              }
          ]
      };

      var canvas = document.getElementById("agegroup-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
        barShowStroke: false,
        // Options for Labels
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        scaleFontSize: 12,
        scaleFontStyle: "normal",
        scaleFontColor: "#fff"
      });
    },

    gender: function(response){
      var data = response.data[0];
      var counts = data["gender_counts"];
      var femaleCount = counts[0].gender == 'F' ? counts[0].count : counts[1].count;
      var maleCount = counts[0].gender == 'M' ? counts[0].count : counts[1].count;

      var pieData = [
        {
            value: maleCount,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Male"
        },
        {
            value: femaleCount,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Female"
        }
      ];
      var canvas = document.getElementById('gender-canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var genderPieChart = new Chart(ctx).Pie(pieData, {
          animateScale: false
      });
    },

    religion: function(response){
      var data = response.data[0];
      data["religion_counts"]= data["religion_counts"].sort(function(first, second){
        return second.count - first.count;
      });

      var colors = ["#46BFBD", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
      var polarData = data["religion_counts"].slice(0,2).map(function(item, index){
        var base = colors[Math.floor(Math.random() * colors.length) ];
        var highlight = colors[Math.floor(Math.random() * colors.length) ];
        return {
          value: item["count"],
          color: base,
          highlight: highlight,
          label: item["religion"]
        };
      });

      var others = { value: 0, label: "Others"};
      others.base = colors[Math.floor(Math.random() * colors.length) ];
      others.highlight = colors[Math.floor(Math.random() * colors.length) ];
      data["religion_counts"].slice(2,data["religion_counts"].length).map(function(item, index){
	others.value += item["count"];
      });
      polarData.push(others);

      var canvas = document.getElementById('religion-canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var radarChart = new Chart(ctx).Doughnut(polarData, {
          segmentStrokeColor: "#ffffff",
          scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          scaleFontSize: 12,
          scaleFontStyle: "normal",
          scaleFontColor: "#000"
      });
    },
    ethnicity: function(response){
      var data = response.data[0];
      data["ethnicity_counts"]= data["ethnicity_counts"].sort(function(first, second){
        return second.count - first.count;
      });

      var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
      var polarData = data["ethnicity_counts"].slice(0,8).map(function(item, index){
        var base = colors[Math.floor(Math.random() * colors.length) ];
        var highlight = colors[Math.floor(Math.random() * colors.length) ];
        return {
          value: item["count"],
          color: base,
          highlight: highlight,
          label: item["ethnicity"]
        };
      });

            var other = {
        ethnicity: other,
        count: 0
      };

      var others = { value: 0, label: "Others"};
      others.base = colors[Math.floor(Math.random() * colors.length) ];
      others.highlight = colors[Math.floor(Math.random() * colors.length) ];
      data["ethnicity_counts"].slice(8,data["ethnicity_counts"].length).map(function(item, index){
	others.value += item["count"];
      });
      polarData.push(others);

      var canvas = document.getElementById('ethnicity-canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var radarChart = new Chart(ctx).Pie(polarData, {
          segmentStrokeColor: "#ffffff",
          scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          scaleFontSize: 12,
          scaleFontStyle: "normal",
          scaleFontColor: "#000"
      });
    }
  };

  $(document).ready(function(){
    var baseUrl = "http://localhost:3000";
    $('ul.tabs').tabs();
    var chartList = [
      "agegroup",
      "gender",
      "religion",
      "ethnicity",
      "educated"
    ];

    chartList.map(function(chartType){
      $.getJSON(baseUrl + "/api/candidates/count/by-"+chartType, chartCallbacks[chartType]);
    });
  });

})();
