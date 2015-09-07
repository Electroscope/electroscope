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
    'ngTouch'
  ])

  .value("mpsApiConfig", {baseURL: "http://api.maepaysoh.org", token: "2a12ac8c-184c-57dc-a8e6-5e57ff488cac"})
  .config(function ($stateProvider, $urlRouterProvider) {

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
      controller: 'partiesCtrl as parties'
    })

    ;

    $urlRouterProvider.otherwise("/");
  });
