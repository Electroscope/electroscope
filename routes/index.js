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

module.exports = router;
