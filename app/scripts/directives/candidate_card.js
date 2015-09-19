'use strict';

/**
 * @ngdoc directive
 * @name electionApp.directive:palartartMap
 * @description
 * # palartartMap
 */
angular.module('electionApp')
  .directive('candidateCard', function () {
    return {
      templateUrl: "../../views/partials/candidate_card.html",
      restrict: 'E',
      scope: {
        candidate: '='
      },
      link: function postLink(scope, element, attrs) { 
        console.log("Rendering Candidate Card");
      }
    };
  })