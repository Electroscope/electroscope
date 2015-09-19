'use strict';

/**
 * @ngdoc function
 * @name electionApp.controller:CandidatesctrlCtrl
 * @description
 * # CandidatesctrlCtrl
 * Controller of the electionApp
 */
angular.module('electionApp')
  .controller('candidatesCtrl', ["candidateService", function (candidateService) {
    var me = this;

    candidateService.getAllCandidates().then(function(candidates){
      me.candidates = candidates;
    });

    var onStateClick = function(st_pcode){

    };


  }]);
