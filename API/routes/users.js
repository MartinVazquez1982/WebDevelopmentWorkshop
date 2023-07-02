var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Juan Francisco Herrero - David Burckhardt - Martin Vazquez Arispe');
});

module.exports = router;
