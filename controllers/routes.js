var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var filesList = fs.readdirSync('./public/images/cat/');
  var catID = filesList.length;
  res.render('index', { title: '喵喵喵', cat: catID });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: '关于' });
});

router.get('/user', function (req, res, next) {
  res.render('user', { title: '我的喵咪' });
});

router.get('/market', function (req, res, next) {
  res.render('market', { title: '喵咪市场' });
});

module.exports = router;
