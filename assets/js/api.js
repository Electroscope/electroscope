var electroscope = (function () {
  var base = "https:/immense-plateau-8391.herokuapp.com";
  base = "http://128.199.69.68:5000";

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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-68575005-1', 'auto');
ga('send', 'pageview');
