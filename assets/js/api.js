var electroscope = (function () {
  var base = "https:/immense-plateau-8391.herokuapp.com";

  function get(data, callback) {
    $.ajax(data)
      .error(function (xhr, errorText, err) {
        callback(errorText);
      }).success(function (data) {
        // all result are return
        callback(null, data.data);
      });
  }

  var elescope = {
    countByParty: function (query, callback) {
      get({
        url: base + "/api/candidates/count-by-party",
        query: query
      }, callback);
    }
  };

  return elescope;
}())
