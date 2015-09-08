'use strict';

/**
 * @ngdoc service
 * @name electionApp.candidateService
 * @description
 * # candidateService
 * Factory in the electionApp.
 */
angular.module('electionApp')
  .factory('candidateService', ["$http", "$q", "mpsApiConfig", function($http, $q, mpsApiConfig){
    
    var getAllCandidates = function (){
      var deferred = $q.defer();
      var url = mpsApiConfig.baseURL + "/candidate/list?token=" + mpsApiConfig.token;

      $http.get(url).
        success(function(response) {
          deferred.resolve(response.data);
        })
        .error(function(response) {
          console.log("Cannot Get Server Data", response);
          deferred.reject();
        });
      return deferred.promise;
    };

    var getCandidateById = function (id){
      var deferred = $q.defer();
      var url = mpsApiConfig.baseURL + "/candidate/" + id + "?token=" + mpsApiConfig.token;

      $http.get(url).
        success(function(response) {
          deferred.resolve(response.data);
        })
        .error(function(response) {
          console.log("Cannot Get Server Data", response);
          deferred.reject();
        });
      return deferred.promise;
    };

    return {
      getAllCandidates: getAllCandidates,
      getCandidateById: getCandidateById
    }
  }]);
