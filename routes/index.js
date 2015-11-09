var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Electroscope, microscope for Myanmar Elections 2010, 2015', 
    page_name: "home",
    baseUrl: req.baseUrl
  });
});

router.get('/2015/overall', function(req, res){
  res.render("2015/overall", {
    title: "Electroscope, 2015 Myanmar Election overview", 
    page_name: "2015_overall",
    baseUrl: req.baseUrl
  });
});

// 2015 Route group
router.get('/2015/parties',function(req,res){
  res.render("2015/parties",{
    title:"Electroscope, 2015 Myanmar Election analytic over parties",
    page_name:"2015_parties",
    baseUrl: req.baseUrl
  });
});

router.get('/2015/states',function(req,res){
  res.render("2015/states",{
    title:"Electroscope, 2015 Myanmar Election analytic over regions",
    page_name:"2015_states",
    baseUrl: req.baseUrl
  });
});

router.get('/2015/results',function(req,res){
  res.render("2015/results",{
    title:"Electroscope, 2015 Myanmar Election result analytic",
    page_name:"2015_results",
    baseUrl: req.baseUrl
  });
});

router.get('/2010/results',function(req,res){
  res.render("2010/results",{
    title:"Electroscope, 2010 Myanmar Election result analytic",
    page_name:"2010_results",
    baseUrl: req.baseUrl
  });
});

router.get('/about',function(req,res){
  res.render("about",{
    title:"About electroscope",
    page_name:"aboutus",
    baseUrl: req.baseUrl
  });
});


/*
router.get('/data-reference',function(req,res){
  res.render("data-reference",{title:"electroscope",page_name:"data-reference"});,
  baseUrl: req.baseUrl
});
*/

module.exports = router;
