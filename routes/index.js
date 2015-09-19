var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Electriscope', page_name: "home" });
});

router.get('/candidates', function (req, res) {
  res.render("candidates", { title: "electroscope", page_name: "candidates"});
});

module.exports = router;
