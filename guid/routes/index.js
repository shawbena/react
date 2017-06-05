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
module.exports = router;
