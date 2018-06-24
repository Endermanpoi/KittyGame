var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var filesList = fs.readdirSync('./public/images/cat/');
  var catnum = filesList.length;
  res.render('index', { title: '喵喵喵', cat: catnum });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: '关于' });
});

router.get('/breeding', function (req, res, next) {
  var aid=req.query.a_id;
  var bid=req.query.b_id;
  console.log(aid);
  console.log(bid);
  res.render('breeding', { title: '繁殖喵咪' });
});

router.get('/kitty', function (req, res, next) {
  var id = req.query.id;
  console.log(id);
  res.render('kitty', {
    title: '猫咪 #' + id,
    id: id,
    own:'0x4109C376019295bd22d9D7c515B856331B993023',
    generation:0,
    sale:true,
    saleprice:1.000,
    salebreeding:false,
    salebreedingprice:0.05,
    cooling:false,
    mid:2,
    fid:3
  });
});

router.get('/user', function (req, res, next) {
  res.render('user', { title: '我的喵咪' });
});

router.get('/market', function (req, res, next) {
  res.render('market', { title: '喵咪市场' });
});

module.exports = router;
