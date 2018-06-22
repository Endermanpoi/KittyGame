var express = require('express');
var router = express.Router();

router.post('/showlist', function (req, res, next) {
  var temp=req.body;
  console.log(temp);
  res.render('embedded/catlist');
});

router.post('/getlist', function (req, res, next) {
  var temp=req.body;
  console.log(temp);
  res.json({
    kittys:[0,1,2,3,4,]
  })
});

module.exports = router;
