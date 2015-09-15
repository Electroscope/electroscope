'use strict';

/**
 * @ngdoc function
 * @name electionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the electionApp
 */
angular.module('electionApp')
  .controller('AboutCtrl', function (topoJSON) {
    this.topoJSON = topoJSON;
    
  });
