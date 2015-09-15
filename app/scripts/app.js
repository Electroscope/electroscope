'use strict';

/**
 * @ngdoc overview
 * @name electionApp
 * @description
 * # electionApp
 *
 * Main module of the application.
 */
angular
  .module('electionApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'nvd3ChartDirectives'
  ])

  .config(['$httpProvider', function ($httpProvider) {
             // enable http caching
            $httpProvider.defaults.cache = true;
       }])

  // inject lodash as constant
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
     $rootScope._ = window._;
  })

  .value("mpsApiConfig", {baseURL: "http://api.maepaysoh.org", token: "2a12ac8c-184c-57dc-a8e6-5e57ff488cac"})

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    $stateProvider.state("home", {
       url: "/",
       templateUrl: "views/main.html",
       controller: 'MainCtrl as main'
     })

    .state("about", {
      resolve: {
        topoJSON: [ "geoService", function(geoService){
          return geoService.getDistrictsTopoJSON();
        }]
      },
      url: "/about",
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl as about'
    })

    .state("parties", {
      url: "/parties",
      templateUrl: 'views/parties.html',
      controller: "partiesCtrl as parties"
    })

    .state('report',{
      resolve: {
        parties: [ "partyService", function(partyService){
          return [];//partyService.getAllParties();
        }]
      },
      url: "/report",
      templateUrl: 'views/report.html',
      controller: 'reportCtrl as report'
    })

    .state('issues_report',{
      url: "/issues_report",
      templateUrl: 'views/issues_report.html',
      controller: 'issuesReportCtrl as issueReport'
    })

    .state('maptest',{
      url: "/maptest",
      templateUrl: 'views/maptest.html',
      controller: 'maptestCtrl as maptest'
    })

    .state("candidates", {
      url: "/candidates",
      templateUrl: 'views/candidates.html',
      controller: 'candidatesCtrl as candidates'
    })

    ;

    $urlRouterProvider.otherwise("/");


    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('orange');
});
