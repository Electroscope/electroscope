'use strict';

/**
 * @ngdoc function
 * @name electionApp.controller:circularMenuCtrl
 * @description
 * # circularMenuCtrl
 * Controller of the electionApp
 */
angular.module('electionApp')
  .controller('circularMenuCtrl', function () {
    var vm = this;
    this.states = [
      'Kachin',
      'Yangon',
      'Kayah',
      'Mandalay',
      'Kayin',
      'Ayeyarwaddy',
      'Chin',
      'Sagaing',
      'Mon',
      'Magway',
      'Rakhine',
      'Bago',
      'Shan',
      'Tanintharyi'
    ];

    // var i;
    // this.states = [];
    // for(i = 1; i <= 91; i++){
    //   this.states.push(i);
    // }
    var d3 = window.d3;
    var width = 600,
        height = 600,
        ringRadius = 180;
    var svg = d3.select('#circular-menu')
      .append('svg')
      .attr("width", width)
      .attr("height", height);

    // filters go in defs element
    var defs = svg.append("defs");

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 5)
        .attr("dy", 5)
        .attr("result", "offsetBlur");

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    var computeCircularPointX = function(d, i){
          return (width/ 2 ) + (ringRadius * Math.cos (((360 / vm.states.length) * i) * (Math.PI / 180 )));
        };
    var computeCircularPointY =  function(d, i){
          return (height/ 2) + (ringRadius * Math.sin (((360 / vm.states.length) * i) * (Math.PI / 180 )));
        };

    svg.selectAll('.states')
        .data(this.states)
        .enter().append('g')
        .append('circle')
        .attr("cx", computeCircularPointX)
        .attr("cy", computeCircularPointY)
        .attr("r", 35)
        .attr("fill", function(d, i){
          var colors = d3.scale.category20().range();
          return colors[i % colors.length ];
        })
        .attr("stroke-width", 2)
        .style("filter", "url(#drop-shadow)");

    var data = d3.range(20),
        angle = d3.scale.ordinal().domain(data).rangeBands([0, 2 * Math.PI]);
    var path = svg.append("path.tt")
        .attr("d", d3.svg.arc()
        .innerRadius(ringRadius - 30)
        .outerRadius(ringRadius)
        .startAngle(0)
        .endAngle(Math.PI * 2))
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .attr("fill", "steelblue")
        ;

    // setInterval(moveAround, 3000);
    moveAround();

    function moveAround(){
      svg.select('circle')
        .transition()
        .ease("elastic")
        // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .duration(1000)
        .attrTween("transform", translateAlong(path.node()));
    };

    function translateAlong(path) {
      var l = path.getTotalLength();
      console.log(l);
      return function(d, i, a) {
        return function(t) {
          var p = path.getPointAtLength(t * l);
          console.log(p);
          return "translate(" + p.x + "," + p.y + ")";
        };
      };
    }

    svg.selectAll('g')
      .data(this.states)
      .append('text')
      .attr("dx", computeCircularPointX)
      .attr("dy", computeCircularPointY)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "0.7em")
      .text(function(d){return d})
    ;

  });
