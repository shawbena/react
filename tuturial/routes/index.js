var express = require('express');
var router = express.Router();
var path = require('path');
var comments = require('../json/comments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res){
  res.send("post request to the homepage");
});
router.get('/api/comments', function(req, res, next){
  res.json(comments);
});
router.get('/download', function(req, res){
  res.download(path.resolve(__dirname, '../download/1.txt'), '1.txt', function(err){
    res.end('an error happend' + err);
  });
});
module.exports = router;
