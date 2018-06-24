var express = require('express');
var router = express.Router();

router.post('/showlist', function (req, res, next) {
  var kittys = req.body['kittys[]'];
  var Sale = [true, false, true, false, true, true, false, true, false, false, false, false];
  var Breeding = [false, true, true, true, false, true, false, true, false, true, false, true];
  var pagenums = req.body['pagenum'];
  var pages = req.body['page'];
  console.log(kittys);
  res.render('embedded/kittylist', {
    kitty: kittys,
    sale: Sale,
    breeding: Breeding,
    page: pages,
    pagenum: pagenums
  });
});

router.post('/getlist', function (req, res, next) {
  var temp = req.body;
  console.log(temp);
  var data = {
    kittys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  };
  if (req.body.type == '1') {//出售
    data = {
      kittys: [0, 2, 4, 5, 7]
    };
  } else if (req.body.type == '2') {//育种
    data = {
      kittys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]
    };
  } else if (req.body.type == '3') {//未冷却
    data = {
      kittys: [0, 1, 2, 3, 9, 10, 11, 12, 14]
    };
  }
  res.json(data);
});

router.post('/getkitty', function (req, res, next) {

});

router.post('/getbreedingprice', function (req, res, next) {
  var id = req.body.id;
  var acc = req.body.acc;
  res.json({
    price: 0.2,
    ismine: false
  });
});

router.post('/breeding', function (req, res, next) {
  var aid = req.body.aid;
  var bid = req.body.bid;
  res.json({
    id: 14
  });
});
module.exports = router;
