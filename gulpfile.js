var path = require("path");
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var watch = require("gulp-watch");
var gutil = require("gulp-util");

// JS Paths
function jsPath(_path){
  return path.join(__dirname, "/assets/js", _path);
}

// External Library
var __BOWER = path.join(__dirname, "bower_components");
var __JQUERY = path.join(__BOWER, "jquery/dist/jquery.min.js");
var __MATERIAL_LITE = path.join(__BOWER, "Materialize/dist/js/materialize.js");
var __MOMENT = path.join(__BOWER, "moment/min/moment.min.js");
var __LEAFLET = path.join(__BOWER, "leaflet/dist/leaflet.js");
var __D3 = path.join(__BOWER, "d3/d3.js");
var __TOPOJSON = path.join(__BOWER, "topojson/topojson.js");
var __CHARTJS = path.join(__BOWER, "Chart.js/Chart.js");
var __HO_CHARTJS = path.join(__BOWER,"Chart.HorizontalBar.js/Chart.HorizontalBar.js");
var __SELECT2 = path.join(__BOWER, "select2/dist/js/select2.full.min.js");
var __LIQUIDFILL = path.join(__dirname, "assets/js/liquidFill.js");
// Internal Library
var __LIBS = path.join(__dirname, "app/assets/js/libs");

var __MAEPAYSOH = jsPath("api.js");
var __COMMONJS = jsPath("main.js");

var __DEFAULT = [__JQUERY, __MATERIAL_LITE, __MOMENT, __MAEPAYSOH, __COMMONJS, __SELECT2];

function concatDefault(assets, other){
  var paths = [];
  if(other) paths = paths.concat(other);
  if(assets) paths = paths.concat(assets.map(jsPath));
  return __DEFAULT.concat(paths);
}

var PAGES = {
  "home": concatDefault(["map.js", "home.js",],[__D3, __TOPOJSON, __CHARTJS, __HO_CHARTJS]),
  "candidates": concatDefault(["map.js", "maptest.js", "candidates.js"],[__D3, __TOPOJSON]),
  "candidates-detail": concatDefault(["candidates-detail.js"],[__LEAFLET]),
  "maptest": concatDefault(["map2.js", "maptest.js"], [__D3, __TOPOJSON]),
  "2015_overall": concatDefault(["choropleth.js","2015_overall.js"], [__MATERIAL_LITE, __D3, __TOPOJSON, __CHARTJS ]),
  "choropleth": concatDefault(["choropleth.js"], [__MATERIAL_LITE, __D3, __TOPOJSON, __CHARTJS ]),
  "2010_results": concatDefault([ "2010_results.js"], [__MATERIAL_LITE, __D3, __TOPOJSON, __CHARTJS,__HO_CHARTJS ]),
  "2015_results": concatDefault([ "2015_results.js"], [__MATERIAL_LITE, __D3, __TOPOJSON, __CHARTJS,__HO_CHARTJS, __LIQUIDFILL ]),
  "2015_parties": concatDefault([ "2015_parties.js"], [__MATERIAL_LITE, __D3, __TOPOJSON, __CHARTJS,__HO_CHARTJS, __SELECT2 ]),
  "2015_states": concatDefault([ "map2.js", "hex2rgba.js", "2015_states.js"], [__MATERIAL_LITE, __D3, __TOPOJSON, __CHARTJS ]),
  "circle_test": concatDefault([ "circle_test.js"], [__MATERIAL_LITE, __D3, __TOPOJSON ]),
  "aboutus": concatDefault([ ], [ __JQUERY, __MATERIAL_LITE ]),
  "data-reference": concatDefault([ ], [ __JQUERY, __MATERIAL_LITE ])
};

// Watch task for gulp
gulp.task("watch", function () {
  gulp.watch("gulpfile.js", ["scripts"]);
  gulp.watch("./assets/js/*.js", ["scripts"]);
  gulp.watch("./assets/js/**/*.js", ["scripts"]);
});

// Script gulp task for developement
gulp.task("scripts", function () {
  Object.keys(PAGES).forEach(function(pagename){
    var dist = path.join(__dirname, "public/js", pagename);
    var paths = PAGES[pagename];
    gulp.src(paths)
      .pipe(concat("app.min.js"))
      .pipe(gulp.dest(dist))
  });
});

gulp.task("scripts-production", function () {
  Object.keys(PAGES).forEach(function(pagename){
    var dist = path.join(__dirname, "public/js", pagename);
    var paths = PAGES[pagename];
    console.log(pagename, dist, paths);
    gulp.src(paths)
      .pipe(concat("app.min.js"))
      .pipe(uglify({mangle:false}))
      .pipe(gulp.dest(dist))
  });
});

gulp.task("default", ["scripts", "watch"]);
gulp.task("production", ["scripts-production"]);
