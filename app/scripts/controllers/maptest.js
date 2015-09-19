'use strict';

/**
 * @ngdoc function
 * @name electionApp.controller:MaptestCtrl
 * @description
 * # MaptestCtrl
 * Controller of the electionApp
 */
angular.module('electionApp')
  .controller('maptestCtrl', ["$state", "geojson", function ($state, geojson) {
      var vm = this;
      vm.geojson = geojson;
      console.log(vm.geojson);
  
      vm.onMapClick = function(){
        $state.go('candidates');
      };
  
    }]);
