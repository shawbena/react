var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//页面路由
const pageRoutes = [
    '/info',
    '/info/message',
    '/order',
    '/flow',
    '/alarm'
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(__dirname));
console.log(__dirname);

app.use('/', index);
app.use('/users', users);

app.use(function (req, res, next) {
    let reqUrl = req.originalUrl;

    if (pageRoutes.indexOf(reqUrl) >= 0) {
        console.log(reqUrl);
        fs.readFile(path.resolve(__dirname, 'index.html'), function (err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.writeHead(200, {
                    'Content-type': 'text/html',
                    // 'Connection': 'keep-alive'
                });
                res.end(data);
            }
        });
    } else {
        // catch 404 and forward to error handler
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var a = 2;

a += 1;
module.exports = (app);
