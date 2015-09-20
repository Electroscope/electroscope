var path = require("path");
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var watch = require("gulp-watch");
var gutil = require("gulp-util");

// JS Paths
function jsPath(_path){
  return path.join(__dirname + "./assets/js", _path);
}

// External Library 
var __BOWER = path.join(__dirname, "bower_components");
var __JQUERY = path.join(__BOWER, "jquery/dist/jquery.min.js");
var __MATERIAL_LITE = path.join(__BOWER, "Materialize/dist/js/materialize.min.js");
var __MOMENT = path.join(__BOWER, "moment/min/moment.min.js");
// var __HIGHMAP = path.join(__BOWER, "highmaps-release/highmaps.js");

// Internal Library
var __LIBS = path.join(__dirname, "./app/assets/js/libs");
// var __MARKER_CULSTERER = path.join(__LIBS, "marker_clusterer.js");
// var __MARKER_WITH_LABEL = path.join(__LIBS, "marker_with_label_packed.js");
// var __EVENT_TRACKER = path.join(__LIBS, "eventTracker.js");
var __MAEPAYSOH = jsPath("api.js");

var DEFAULT = [__JQUERY, __MATERIAL_LITE, __MOMENT, __MAEPAYSOH];

function concatDefault(__DEFAULTS, assets, other){
  var paths = [];
  if(assets) paths = assets.map(jsPath);
  if(other) paths = paths.concat(other);
  return __DEFAULTS.concat(paths);
}

var PAGES = {
  "candidates": concatDefault(["candidates.js"],["http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.js"]),
  "maptest": concatDefault(["candidates.js"],["http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.js"])
};

// Watch task for gulp
gulp.task("watch", function () {
  gulp.watch("gulpfile.js", ["scripts"]);
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
