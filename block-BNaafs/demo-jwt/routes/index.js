var express = require('express');
var auth = require('../middlewares/auth');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//dashboard route

router.get('/dashboard', auth.validateToken, (req, res, next) => {});

module.exports = router;
