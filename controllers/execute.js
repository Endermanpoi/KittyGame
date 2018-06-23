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
  if (req.body.type == '1') {
    data = {
      kittys: [0, 2, 4, 5, 7]
    };
  } else if (req.body.type == '2') {
    data = {
      kittys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,  14]
    };
  }
  res.json(data);
});

router.post('/getkitty', function (req, res, next) {

});

module.exports = router;
