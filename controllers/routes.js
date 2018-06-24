var express = require('express');
var fs = require('fs');
var build = require('../model/build');
var eth = require('../model/EthBlockchain');
var image = require('../model/DNA2image');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var filesList = fs.readdirSync('./public/images/cat/');
  var catnum = filesList.length;
  res.render('index', { title: '喵喵喵', cat: catnum });
});

router.get('/newkitty', function (req, res, next) {
  build.rebuildImage();
  res.render('newkitty', { title: '新的喵咪！' });
});

router.get('/about', function (req, res, next) {
  build.rebuildImage();
  res.render('about', { title: '关于' });
});

router.get('/breeding', function (req, res, next) {
  res.render('breeding', { title: '繁殖喵咪' });
});

router.get('/user', function (req, res, next) {
  res.render('user', { title: '我的喵咪' });
});

router.get('/market', function (req, res, next) {
  res.render('market', { title: '喵咪市场' });
});

router.get('/kitty', function (req, res, next) {
  var id = req.query.id;
  var kitty = eth.getKitty(id);
  kitty.title = '喵咪 #' + id;
  console.log(id);
  console.log(kitty);
  image.findImage(id, function () {
    res.render('kitty', kitty);
  });
});

module.exports = router;
