angular.module('electionApp')
  .factory('geoService', ["$http", "$q", function ($http, $q) {
    
    var getDistrictsTopoJSON = function(){
      var deferred = $q.defer();
      var url = "http://localhost:3000/districts.topojson";
      $http.get(url).success(function(data){
        deferred.resolve(data);
      }).error(function(response){
        console.log(response);
        deferred.reject(response);
      });
      return deferred;
    };

    return {
      getDistrictsTopoJSON: getDistrictsTopoJSON
    };
  }])