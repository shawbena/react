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
//获取评论
router.get('/api/comments', function(req, res){
  res.json({data: comments});
});
//提交评论
router.post('/api/comments', function(req, res){});
router.get('/download', function(req, res){
  res.download(path.resolve(__dirname, '../download/1.txt'), '1.txt', function(err){
    res.end('an error happend' + err);
  });
});
module.exports = router;
