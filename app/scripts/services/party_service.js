'use strict';

/**
 * @ngdoc service
 * @name electionApp.PartyService
 * @description
 * # PartyService
 * Factory in the electionApp.
 */
angular.module('electionApp')
  .factory('partyService', ["$http", "$q", "mpsApiConfig", function($http, $q, mpsApiConfig){    

    var getAllParties = function (){
      var deferred = $q.defer();
      var url = mpsApiConfig.baseURL + "/party?token=" + mpsApiConfig.token;
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

    var getPartyById = function (id){
      var deferred = $q.defer();
      var url = mpsApiConfig.baseURL + "/party/detail/" + id + "?token=" + mpsApiConfig.token;

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
      getAllParties: getAllParties,
      getPartyById: getPartyById
    };
  }]);
