
(function(electroscope){

  var drawCircles = function(data){
    var width = 1200;
    var height = 800;

    var yTracker = 0;

    d3.select('#amh-circles').append('svg')
        .attr('width', width)
        .attr('height', height)
      .selectAll('circle')
        .data(data).enter()
      .append('circle')
        .style('fill', 'red')
        .attr('r', 10)
        .attr('cx', function(d, i){
          return (( i % 20 ) + 1) * 40;
        })
        .attr('cy', function(d, i){ 
          if((i % 20 ) === 0){
            yTracker += 30;
          }
          return yTracker;
        })
        .on("click", function(d,i) {
          alert(d.properties.AM_PCODE);
        });
  };
  $(document).ready(function(){
    $.getJSON("http://api.maepaysoh.org/geo/upperhouse?token=2a12ac8c-184c-57dc-a8e6-5e57ff488cac&no_geo=true&per_page=400", function(response){
      console.log(response);
      drawCircles(response.data);
    });
  });
})(window.electroscope);

