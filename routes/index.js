var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Electroscope', page_name: "home" });
});

router.get('/2015/overall', function(req, res){
  res.render("2015/overall", { title: "electroscope", page_name: "2015_overall"});
});

// 2015 Route group
router.get('/2015/parties',function(req,res){
  res.render("2015/parties",{title:"electroscope",page_name:"2015_parties"});
});

router.get('/2015/states',function(req,res){
  res.render("2015/states",{title:"electroscope",page_name:"2015_states"});
});

router.get('/2010/results',function(req,res){
  res.render("2010/results",{title:"electroscope",page_name:"2010_results"});
});

router.get('/about',function(req,res){
  res.render("about",{title:"electroscope",page_name:"aboutus"});
});
/*
router.get('/data-reference',function(req,res){
  res.render("data-reference",{title:"electroscope",page_name:"data-reference"});
});
*/


module.exports = router;
