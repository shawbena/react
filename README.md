# react

A JavaScript library for building user interfaces.

## why React?

We built React to solve one problem: building large applications with data that changes over time.

简单：简单的表达你的程序在给定的时间点怎么展现，React 将会在你依赖的底层数据变化时自动管理所有的 UI 更新。

声明式的：当数据变化时，React 概念性地点击更新按钮，并且知道怎样只更新变化的部分。

构建可组合的组件：React 是全部关于构建可重用的组件。实际上，使用 React 你要做的事就是构建组件。因为是封装的，组件使得代码可重用，可测试，并将关系变得简单。

想5分钟：React 挑战了很多传统观念，第一次看一些想法可能感觉有点疯狂。读这些指南时想5分钟，这些疯狂的想法已经构建了成千上万的 Facebook 和 instagram 组件。
# express

## 路由

路由指应用程序端点（URIs）的定义及他们怎样响应对客户端的请求，是一个URI（或路径）和一个特定的 HTTP 方法（GET, POST, 等等）。

每个路由可以有一个或多个处理函数，当匹配到路由时会被执行。

路由定义有以下结构：

```js
app.METHOD(PATH, HANDLER)
```

app 是 express 实例；METHOD 是 HTTP request method, 小写；PATH 是服务器上的路径；HANDLER 是路由匹配到时要执行的函数。

```js
Respond with Hello World! on the homepage:
app.get('/', function (req, res) {
  res.send('Hello World!')
})

Respond to POST request on the root route (/), the application’s home page:

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

Respond to a PUT request to the /user route:

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

Respond to a DELETE request to the /user route:

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

 the handler will be executed for requests to “/secret” whether you are using GET, POST, PUT, DELETE, or any other HTTP request method that is supported in the http module.
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

### 路由路径

路由路径和路由方法一起定义请求的端点。路由路径可以是字符串，字符串模式或正则表达式。

字符 ?, +, * 和 () 是正则表达式的一部分。 - 和 . 被解释为基于字符串路径的字面量。

如果要在路径字符串中使用美元符号，将其用 ([]) 包括起来。如来自路径字符串的请求 "/data/$book" 要写成 "/data/([\$])book".

express 使用 path-to-regexp (npm 包) 匹配路由路径，更多可能的路由路径定义请参见 path-to-regex 文档。

查询字符串不是路由路径的部分。

```js
//匹配基于字符串的路由路径
app.get('/', function(req, res){
    res.send('root');
});
app.get('/about', function(req, res){
    res.send('about');
});
app.get('/random.text', function(req, res){
    res.send('random.text');
});

//匹配字符串模式的路由路径
//路由路径匹配 acd 或 abcd
app.get('/ab?cd', function(req, res){
    res.send('ab?cd');
});
//路由路径匹配 abcd, abbcd, abbbcd 等等
app.get('/ab+cd', function(req, res){
    res.send('ab+cd');
});
//路由路径匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res){
    res.send('ab(cd)?e');
});

//基于与正则表达式的路由路径
//路由路径匹配路由名子中有 "a" 的任何路由
app.get(/a/, function(req, res){
    res.send('/a/');
});
//这个路由路径匹配 butterfly 和 dragonfly，但不匹配 butterflyman, dragflyman 等等。
app.get(/.*fly$/, function(req, res){
    res.send('/.*fly$/');
});
```
#### 路由参数

路由参数是命名的 URL 片段，用于捕获 URL 指定位置的值。捕获的值被填充到 req.params 对象中，对应的键是路径中指定的路由参数的名子。

```js
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989"}
```

定义带路由参数的路由，像下面一样指定路由路径中的路由参数：

```js
app.get('/users/:userId/books/:bookId', function(req, res){
    res.send(req.params);
});
```

由于 - 和 . 被解释为字面量，他们也可用于路由参数非常有用。

```js
Route path: /floghts/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: {"from": "LAX", "to": "SFO"}

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.presica
req.params: {"genus": "Prunus", "species": "persica"}
```

路由参数名必须由来自 [A-Za-z0-9] 的字符组成。

### 路由处理程序

你可以提供多个回调函数像一个 `middleware` 样处理一个请求。唯一的例外是这些回调必须调用 next('route') 转给其余的路由回调。你可以使用这个机制为一个路由引入预置条件，然后传递给后续路由。

路由处理程序可以以函数的形式，数组函数的形式，或者两者的结合。

```js
app.get('/example/a', function(req, res){
    res.send('Hello from A!');
});

app.get('/example/b', function(req, res, next){
    console.log('the response will be sent by the next funciton...');
    next();
}, function(req, res){
    res.send('Hello from B!');
});

var cb0 = function(req, res, next){
    console.log('CB0');
}
var cb1 = function(req, res, next){
    console.log('CB1');
}
var cb2 = function(req, res){
    console.log('Hello from C!');
}
app.get('/example/c', [cb0, cb1, cb2]);

app.get('/example/d', [cb0, cb1], function(req, res, next){
    console.log('the response will be sent by the next function...');
    next();
}, function(req, res){
    res.send('Hello from D!');
});
```

### 响应方法

响应对象（res）上的方法可以给客户端发送响应，终结 request-response cycle. 如果路由处理程序中这些方法一个也没被调用，那么客户端的请求会被挂起。

方法                       描述 
res.download()          提示下载文件
res.end()               结束响应进程
res.jjson()             发送一个 JSON 响应
res.jsonp()             发送一个 JSONP 支持的 JSON 响应
res.redirect()          重定向一个 请求
res.render()            渲染一个视图模板
res.sendFile()          发送文件为八进制流
res.sendStatus()        发送响应状态码并发送其字符串表示形式作为响应体

### app.route()

### express.Router
