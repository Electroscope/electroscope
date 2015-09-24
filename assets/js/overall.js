(function(){

  
  var chartCallbacks = {
    agegroup: function(response){
      var data = response.data[0];
      console.log(data);
      data["agegroup_counts"]= data["agegroup_counts"].sort(function(first, second){
        return second.count - first.count;
      });
      var labels = data["agegroup_counts"].map(function(item){
        return item["agegroup"];
      });
      var counts = data["agegroup_counts"].map(function(item){
        return item.count;
      });

      console.log(labels, counts);

      var chartData = {
          labels: labels,
          datasets: [
              {
                  label: "By Age Group",
                  fillColor: "rgba(238, 110, 115, 0.5)",
                  strokeColor: "rgba(238, 110, 115, 0.8)",
                  highlightFill: "rgba(238, 110, 115, 0.75)",
                  highlightStroke: "rgba(238, 110, 115, 1)",
                  data: counts
              }
          ]
      };
      var canvas = document.getElementById("agegroup-canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var myChart = new Chart(ctx).Bar(chartData, {
          barShowStroke: false
      });
    },
    gender: function(response){
      var data = response.data[0];
      var counts = data["gender_counts"];
      var femaleCount = counts[0].gender == 'F' ? counts[0].count : counts[1].count;
      var maleCount = counts[0].gender == 'M' ? counts[0].count : counts[1].count;
      var total = femaleCount + maleCount;
      var malePercent = (maleCount / total) * 100;
      var femalePercent = (femaleCount / total) * 100;
      console.log("% ", malePercent, femalePercent, total);
      var maleIcon = "<i class='material-icons' style='color: red'>android</i>";
      var femaleIcon = "<i class='material-icons' style='color: green'>android</i>";

      var generateIconsByPercent = function(icon, percentage){
        var i;
        var base = "";
        console.log("%", percentage);
        for(i = 0; i < percentage; i += 10){
          console.log(i);
          base += icon;
        }
        return base;
      };
      var html = "Male ";
      html += generateIconsByPercent(maleIcon, malePercent);
      html += generateIconsByPercent(femaleIcon, femalePercent);
      html += "Female";
      html += "<canvas id='gender-canvas' width='400px' height='400px'></canvas>";
      $("#gender-bar").html(html);
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
          animateScale: true
      });

    }
  };
  var baseUrl = "http://localhost:3000";
  $(document).ready(function(){
    $('ul.tabs').tabs();
    var chartList = [
      "agegroup",
      "gender",
      "ethnicity",
      "religion"
    ];
    chartList.map(function(chartType){
      $.getJSON(baseUrl + "/api/candidates/count/by-"+chartType, chartCallbacks[chartType]);
    });
  });

})();