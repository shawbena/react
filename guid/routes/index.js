var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/role/newRole', function(req, res, next){
  console.log(req.body);
  res.set('Content-Type', 'application/json');
  res.json({
    record: 1000,
    msg: '角色创建成功',
    data: req.body
  });
});

//配合前端路由
router.get('/home', function(req, res, next){
  res.send('homepage');
});
module.exports = router;
