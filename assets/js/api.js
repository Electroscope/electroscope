var electroscope = (function () {
  var base = "https:/immense-plateau-8391.herokuapp.com";
  base = "http://localhost:5000";

  function makeGetRequest(data, callback) {
    $.ajax(data)
      .error(function (xhr, errorText, err) {
        console.log(xhr, errorText, err);
        callback(err);
      }).success(function (data) {
        // all result are return
        callback(null, data);
      });
  }

  var api = {
    getCandidatesByLocation: function (query, callback) {
      if (!callback && typeof query === "function")
        callback = query;
      makeGetRequest({
        url: base + "/api/candidate-locations",
        data: query
      }, callback);
    },
    getCandidateBy: function (query, callback) {
      if (!callback && typeof query === "function")
        callback = query;
      makeGetRequest({
        url: base + "/api/candidate-locations",
        data: query
      }, callback);
    },
    countByParty: function (query, callback) {
      if (!callback && typeof query === "function")
        callback = query;
      makeGetRequest({
        url: base + "/api/candidates/count-by-party",
        data: query
      }, callback);
    }
  };

  return api;
}());
