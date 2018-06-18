var express = require('express');
var router = express.Router();

router.get('/', (req, resp) => {
  if(req.session && req.session.user) {
      res.render('product');
  } else {
      resp.render('index');
  }
});

router.post('/', (req, res) => {
  const { user, password } = req.body;

  if (user === 'fernanda' && password === '123') {
      req.session = req.session || {};
      req.session.user = user;
      return res.redirect('/product');
  }
});

module.exports = router;
