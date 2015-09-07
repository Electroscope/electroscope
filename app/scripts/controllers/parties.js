'use strict';


angular.module('electionApp')
  .controller('partiesCtrl', [ "partyService", function (partyService) {
    var me = this;

    partyService.getAllParties().then(function(parties){
      me.parties = parties;
    });
  }]);