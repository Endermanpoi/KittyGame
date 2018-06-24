var express = require('express');
var build = require('../model/build');
var router = express.Router();

router.post('/showlist', function (req, res, next) {
  var kittys = req.body['kittys[]'];
  var deatil = eth.getListDeatil(kittys);
  var pagenums = req.body['pagenum'];
  var pages = req.body['page'];
  res.render('embedded/kittylist', {
    kitty: deatil,
    page: pages,
    pagenum: pagenums
  });
});

router.post('/getlist', function (req, res, next) {
  var acc = req.body.Account;
  var type = req.body.type;
  var data = eth.gainKitty(acc, type);
  res.json(data);
});

router.post('/getkitty', function (req, res, next) {

});

router.post('/getbreedingprice', function (req, res, next) {
  var id = req.body.id;
  var acc = req.body.acc;
  var data = eth.getKitty(id);
  var json = {
    price: data.salebreedingprice,
    ismine: false
  };
  if (acc == data.own)
    json.ismine = true;
  res.json(json);
});

router.post('/breeding', function (req, res, next) {
  var aid = req.body.aid;
  var bid = req.body.bid;
  var acc = req.body.acc;
  build.breeding(aid, bid, acc, function (id) {
    res.json({
      id: id
    });
  });
});

router.post('/newcat', function (req, res, next) {
  var acc = req.body.acc;
  build.newcat(acc, function (id) {
    res.json(true);
  });
});

module.exports = router;
