# Installation

React 是灵活的且可以用于各种各样的项目。你可以用他创建新的 apps, 也可以渐进引用而非重写现有代码。

这里有几个开始的方式

- [Try React](#trying-out-react)

- [Creat a New App](#create-a-new-app)

- [Add React to an Existing App](#add-react-to-an-existing-app)

## Trying Out React

如果你只是想玩玩 React, 你可以使用 CodePen.

试下 [this Hello World example code](http://codepen.io/gaearon/pen/rrpgNB?editors=0010). 你什么也不需要安装，只需修改下代码并看看是否会起作用。

如果你乐意使用自己的文本编辑器，你可以 [download this HTML](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html), 编辑他，从你本地文件系统中在浏览器中打开。他执行慢的运行时转换，所以不要在生产中使用。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">

      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('root')
      );

    </script>
  </body>
</html>
```

如果你想把 React 用于整个应用，有两个流行的方式：使用 Create React App, 或将 React 添加到现有应用中。

## Creating a New Application

[Create React App](http://github.com/facebookincubator/create-react-app) 是开始构建新的单页面应用程序的最佳方式。他为你建立开发环境，因此你可以使用最新的 JavaScript 特色，提供好的开发者体验，并为优化你发布的应用程序。你电脑上需要安装 Node 6+.

```bash
npm install -g create-react-app
ceate-react-app my-app

cd my-app
npm start
```

如果你安装了 npm 5.2.0+, 你可以使用 [npx](https://www.npmjs.com/package/npx).

```bash
npx create-react-app my-app

cd my-app
npm start
```

Create React App 不处理后端逻辑也不管理数据库；他只创建前端构建的流水线，所以你可以和你相使用的后端一起使用。他私下使用 [Babel](http://babeljs.io/) 和 [Webpack](https://webpack.js.org/) 这样的工具，但不需要你配置。

当你准备好了布署发布版本，运行 `npm run build` 将创建在 `build` 目录中创建你应用优化后的构建版本。你可以从 [its README](https://github.com/facebookincubator/create-react-app#create-react-app-) 和 [https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents]() 当习更多 Create React App 的知识。

## Addding React to an Existing Application

你不需要为了使用 React 重写你的应用。

我们推荐你将 React 添加为你应用程序的一小部分，如一个单独的 widget, 这样你可以看下 React 是否适合你的使用情形。

虽然 React 也可以[不用](../react-without-es6)构建流水线，但我们推荐你设置流水线，这样会更有生产力。现代化构建流水线通常包括：

- __package manager__, 如 [Yarn](https://yarnpkg.com/), 或 [npm](https://www.npmjs.com/)。

- __bundler__, 如 [webpack](https://webpack.js.org/) 或 [Browserify](http://browserify.org/). 他使得你以写模块化的代码并将代码捆成小包裹以优化加载时间。

- __compiler__ 如[Babel](http://babeljs.io/), 他使得你可以书写可以用生旧浏览器的现代化的 JavaScript 代码。

### Install React

> Note:

>安装之后，我们强烈建议你设置 [production build process](/docs/optimizing-performance.html#use-the-production-build) 以确保在生产中使用速度快的 React 版本。

我们推荐使用 [Yarn](https://yarnpkg.com/) 或 [npm](https://www.npmjs.com/) 管理前端依赖。如果你对包管理器 (package managers) 还很陌生，[Yarn document](https://yarnpkg.com/en/docs/getting-started) 是个开始的好地方。

用 Yarn 安装 React, 运行：

```bash
yarn init
yarn add react react-dom
```

用 npm 安装 React，运行：

```bash
npm init 
npm install --save react react-dom
```

Yarn 和 npm 都会从 [npm registry](http://npmjs.com/) 下载包裹。

### Enabling ES6 and JSX

我们推荐 React 和 [Babel]((http://babeljs.io/) 一起使用，这样你可以在你的 JavaScript 代码中使用 ES6 和 JSX. ES6 是现代 JavaScript 特色的集合。JSX JavaScript 语言的扩展，和 React 一起使用简直绝配。

[Babel setup instructions](https://babeljs.io/docs/setup/) 解释了怎样在不同的构建环境中配置 Babel. 确保你安装了 [babel-preset-react](http://babeljs.io/docs/plugins/preset-react/#basic-setup-with-the-cli-) 及 [babel-preset-env](http://babeljs.io/docs/plugins/preset-env/) 并在你的 [`.babelrc` configuration]((http://babeljs.io/docs/usage/babelrc/) 中雇用他们，这样，你就准备好了。

### Hello World with ES6 and JSX

我们推荐使用像 [webpack](https://webpack.js.org/) 或 [Browserify](http://browserify.org/) 这样的捆包器 (bundler), 这样你可以写模块化的代码并将代码捆成小包裹以优化加载时间。

最小的 React 示例如下：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

这段代码渲染进了 id 为 `root` 的 DOM 元素以中，所以你 HTML 文件的某处应有 `<div id="root"></div>`

类似的，你可以将 React 组件渲染进你以任何其他 JavaScript UI 库写的现有 app 某处的 DOM 元素中。

学习更多关于 [integrating React with existing code](/docs/integrating-with-other-libraries.html#integrating-with-other-view-libraries).

### Development and Production Versions

默认，React 包括许多有帮助的警告信息。这些警告信息在开发中是很有用的。

然而这使得开发版的 React 更大一些且会慢一些，所以当你布置应用时你应使用 production version.

学习一下 [how to tell if your website is serving the right version of React](/docs/optimizing-performance.html#use-the-production-build), 及怎样最有效地配置生产版本的构建进程：

- [Creating a Production Build with Create React App](/docs/optimizing-performance.html#create-react-app)

- [Creating a Production Build with Single-File Builds](/docs/optimizing-performance.html#single-file-builds)

- [Creating a Production Build with Brunch](/docs/optimizing-performance.html#brunch)

- [Creating a Production Build with Browserify](/docs/optimizing-performance.html#browserify)

- [Creating a Production Build with Rollup](/docs/optimizing-performance.html#browserify)

- [Creating a Production Build with Rollup](/docs/optimizing-performance.html#rollup)

- [Creating a Production Build with webpack](/docs/optimizing-performance.html#webpack)


### Using a CDN

如果你不想使用 npm 管理客户端包裹，`react` 和 `react-dom` npm 包也提供在 `umd` 文件中的单个文件的发布版，存放在 CDN上：

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
```

上面的版本只应用于开发 (only meant for development), 不适合用于生产。可用的压缩和优化的生产版本的 React:

```js
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"><>
```

要加载特定版本的 `react` 和 `react-dom` 用版本数字替换掉 `16`.

如果你用 Bower, 可用的 React 的包是 `react`.

#### Why the `crossorigin Attribute?`

如果你从 CDN 提供 React (serve React form CDN), 我们建议你保留 `crossorigin` 属性设置：

```js
<script crossorigin src="..."></script>
```

我们也推存验证你使用的 CDN 设置了 `Access-Control-Allow-Origin: *` HTTP 头：

这在 React 16 用其后版本中启用了更好的 [error handling experience](/blog/2017/07/26/error-handling-in-react-16.html)