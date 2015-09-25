(function(electroscope){

  function templateReplace(template, data) {
    template = template.replace(/\{[\w-_]+\}/g, function (match) {
      match = match.match(/[\w-_]+/)[0];
      if (match in data) {
        return data[match];
      } else {
        return "";
      }
    });
  }

  var $$maps = $("#maps");
  var $$vs = $("#vs");
  var $$statesListDropdown = $("#statesListDropdown");

  var vsTemplate = "<h1>{title}</h1>"
    + "<h3>{team1} {team1Percentage} | {team2} {team1Percentage}";

  statesListDropdown.click(function (event){
    var id = event.target.getAttribute("data-value");
    event.preventDefault();
    if (id) {
      console.log(id);
      $$maps.find(".state-map").hide(300);
      $("#" + id).show(300)
    }
  });

  var stateMaps = [
    {name: "Ayeyarwady", path: "Ayeyarwady.topojson"},
    {name: "Bago_East", path: "Bago_East.topojson"},
    {name: "Bago_West", path: "Bago_West.topojson"},
    {name: "Chin", path: "Chin.topojson"},
    {name: "Kachin", path: "Kachin.topojson"},
    {name: "Kayah", path: "Kayah.topojson"},
    {name: "Kayin", path: "Kayin.topojson"},
    {name: "Magway", path: "Magway.topojson"},
    {name: "Mandalay", path: "Mandalay.topojson"},
    {name: "Mon", path: "Mon.topojson"},
    {name: "Nay_Pyi_Taw", path: "Nay_Pyi_Taw.topojson"},
    {name: "Rakhine", path: "Rakhine.topojson"},
    {name: "Sagaing", path: "Sagaing.topojson"},
    {name: "Shan_East", path: "Shan_East.topojson"},
    {name: "Shan_North", path: "Shan_North.topojson"},
    {name: "Shan_South", path: "Shan_South.topojson"},
    {name: "Tanintharyi", path: "Tanintharyi.topojson"},
    {name: "Yangon", path: "Yangon.topojson"}
  ];

  var $pthStates;
  var $amhStates;

  $.getJSON("http://localhost:3000/api/candidates/count/by-party?group_by=state_code&parliament=PTH", function (data) {
    $pthStates = data.data;
  });

  $.getJSON("http://localhost:3000/api/candidates/count/by-party?group_by=state_code&parliament=AMH", function (data) {
    $amhStates = data.data;
  });

  stateMaps.forEach(function (state, i) {
    state.id = state.name.toLowerCase();
    if (i === 0) {
      $$maps.append("<div id='" + state.id + "' class='state-map'></div>");
    } else {
      $$maps.append("<div id='" + state.id + "' class='state-map hide'></div>");
    }
    
    $$statesListDropdown.append("<li><a href='#!' data-value='" + state.id + "'>" + state.name.replace("_", " ") + "</a></li>");

    $.getJSON("http://localhost:3000/seperate_topo_lower/" + state.path, function(data){
      var defaultColor = "#ffffff";
      var statePartyCountCache = null;
      var options = {
        element: "#" + state.id,
        width: 400,
        height: 600,
        defaultColor: defaultColor,
        metaKey: state.name,
        regionNameField: "name",
        regionCodeField: "ST_PCODE"
      };
      electroscope.drawD3Map(data, options)
        .style("stroke", "#ffffff")
        .style("stroke-width", "1px")
    });
  });
  
})(window.electroscope);