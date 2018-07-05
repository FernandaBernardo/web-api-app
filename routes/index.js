var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  if(req.session && req.session.user) {
      res.render('product');
  } else {
      res.render('index');
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

router.get('/logout', (req, res) => {
    res.render('index');
});

module.exports = router;
