var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('product');
});

router.get('/description', (req, res) => {
  res.render('description');
});

module.exports = router;
