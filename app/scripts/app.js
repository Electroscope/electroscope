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
    'ngMaterial'
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
      url: "/about",
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl as about'
    })

    .state("parties", {
      url: "/parties",
      templateUrl: 'views/parties.html',
      abstract: true
    })

    .state('report',{
      views: {
        'partyList': {
          templateUrl: 'party_list.html',
          controller: function($scope){ ... controller stuff just for filters view ... }
        },
        'partyDetail': {
          templateUrl: 'party_detail.html',
          controller: function($scope){ ... controller stuff just for tabledata view ... }
        },
        'partyVisualization': {
          templateUrl: 'party_visualization.html',
          controller: function($scope){ ... controller stuff just for graph view ... }
        }
      }
    })

    .state("candidates", {
      url: "/candidates",
      templateUrl: 'views/candidates.html',
      controller: 'candidatesCtrl as candidates'
    })

    ;

    $urlRouterProvider.otherwise("/");

    // Angular Material Config
    $mdThemingProvider.theme('default');
    
  });
