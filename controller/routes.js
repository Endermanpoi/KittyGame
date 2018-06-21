var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var filesList = fs.readdirSync('./public/images/cat/');
  var catID = filesList.length;
  res.render('index', { title: 'KittyGame', cat: catID });
});

router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
