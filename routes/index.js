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

router.get('/2015/overall', function(req, res){
  res.render("2015/overall", { title: "electroscope", page_name: "2015_overall"});
});

router.get('/partials/agegroup', function(req, res){
  res.render("partials/agegroup",{ title: "electroscope", page_name: "2015_overall"});
});

router.get('/2010/parties',function(req,res){
  res.render("2010/parties",{title:"electroscope",page_name:"2010_parties"});
});

// 2015 Route group
router.get('/2015/parties',function(req,res){
  res.render("2015/parties",{title:"electroscope",page_name:"2015_parties"});
});

router.get('/2015/parties/:id',function(req,res){
  res.render("2015/parties_details",{title:"electroscope",page_name:"2015_parties_details"});
}); 


router.get('/2015/states',function(req,res){
  res.render("2015/states",{title:"electroscope",page_name:"2015_states"});
});


router.get('/2015/parliments',function(req,res){
  res.render("2015/parliments",{title:"electroscope",page_name:"2015_parliments"});
});

router.get('/choropleth',function(req,res){
  res.render("choropleth",{title:"choropleth",page_name:"choropleth"});
});

router.get('/2015/circle_test',function(req,res){
  res.render("2015/circle_test",{title:"circle_test",page_name:"circle_test"});
});


module.exports = router;
