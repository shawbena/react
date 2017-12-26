# react-router

声明式 [React](https://facebook.github.io/react) 路由。

__Note:__ 这个包提供 React Router 的核心路由功能，但是你可能不想直接安装他。如果你写的是运行在流览器中的应用，你应该安装 `react-router-dom`. 同样，如果你写 React Native 应用，你应该安装 `react-router-native`. 这两个都会安装 `react-router` 作为依赖。

然后用一个像 [webpack](https://webpack.github.io/) 一样的模块打包器，像下面一样使用你想使用的：

```js
// using ES6 modules
import { Router, Route, Switch } from 'react-router';

// using CommonJS modules
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Switch = require('react-router').Switch;
```

[unpkg](https://unpkg.com/) 也有可用的 UMD 构建版本：

```js
<script src="https://unpkg.com/react-router/umd/react-router.min.js"></script>
```

可在 `window.ReactRouter` 打到库。

## Issues

If you find a bug, please file an [issue on our issue tracker on GitHub](https://github.com/ReactTraining/react-router/issues).

## Credits

React Router 由 [React Training](https://github.com/ReactTraining/react-router/issues) 构建和维护。

