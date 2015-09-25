var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Electroscope', page_name: "home" });
});

router.get('/candidates', function (req, res) {
  res.render("candidates", { title: "electroscope", page_name: "candidates"});
});

router.get('/candidates/details', function (req, res) {
  res.render("candidate-detail", { title: "electroscope", page_name: "candidates-details"});
});

router.get('/party/details', function (req, res) {
  res.render('party-detail', {title: 'Party Detail', page_name : 'party-detail'});
})

router.get('/maptest', function(req, res){
  res.render("maptest",{ title: "electroscope", page_name: "maptest"});
});

router.get('/overall', function(req, res){
  res.render("overall", { title: "electroscope", page_name: "overall"});
});

router.get('/partials/agegroup', function(req, res){

  res.render("partials/agegroup",{ title: "electroscope", page_name: "overall"});
})

router.get('/choropleth', function(req, res){

  res.render("choropleth",{ title: "electroscope", page_name: "overall"});
})

module.exports = router;
