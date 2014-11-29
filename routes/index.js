var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('landing', { name: 'IMCII', title: 'IMCII - Image to ASCII' });
});

module.exports = router;
