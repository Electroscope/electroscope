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

    var getPartyCandidateCountByState = function (statePcode, legislature) {
      legislature = legislature || "all";
      var deferred = $q.defer();
      var fakeData = [
        {
          "name": "ပြည်သူ့လွှတ်တော်",
          "states": [
            {
              "name": "ကယားပြည်နယ်",
              "ST_PCODE": "MMR002",
              "districts": [
                {              
                  "name": "ဒီမောဆိုမဲဆန္ဒနယ်",
                  "DT_PCODE": "MMR002D001",
                  "candidates": 6
                }
              ]
            }
          ]
        },        
        {
          "name": "ပြည်သူ့လွှတ်တော်",
          "states": [
            {
              "name": "ကယားပြည်နယ်",
              "ST_PCODE": "MMR002",
              "districts": [
                {              
                  "name": "ဒီမောဆိုမဲဆန္ဒနယ်",
                  "DT_PCODE": "MMR002D001",
                  "candidates": 6
                }
              ]
            }
          ]
        },
        {
          "name": "ပြည်သူ့လွှတ်တော်",
          "states": [
            {
              "name": "ကယားပြည်နယ်",
              "ST_PCODE": "MMR002",
              "districts": [
                {              
                  "name": "ဒီမောဆိုမဲဆန္ဒနယ်",
                  "DT_PCODE": "MMR002D001",
                  "candidates": 6
                }
              ]
            }
          ]
        }

      ];

      setTimeout(function(){
        deferred.resolve(fakeData)
      }, 300);
      return deferred.promise;
    };

    return {
      getAllCandidates: getAllCandidates,
      getCandidateById: getCandidateById,
      getPartyCandidateCountByState: getPartyCandidateCountByState
    };
  }]);
