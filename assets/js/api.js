var electroscope = (function () {
  var host = "https://api.electroscope.info";
  // var host = "http://localhost:3000";

  var memory = {};

  function makeGetRequest(data, callback) {
    electroscope.getJSON(data)
      .error(function (xhr, errorText, err) {
        console.log(xhr, errorText, err);
        callback(err);
      }).success(function (data) {
        // all result are return
        callback(null, data);
      });
  }

  var api = {
    getJSON: function (url, callback){

      if (memory[url]) {
        callback(memory[url]);
      } else {
        $.getJSON(host + url, function (res) {
          memory[url] = res;
          callback(res);
        }); 
      }
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
