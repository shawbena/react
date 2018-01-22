# React

A JavaScript library for building user interfaces.

React 挑战了很多传统观念，第一次看一些想法可能感觉有点疯狂。读这些指南时想5分钟，这些疯狂的想法已经构建了成千上万的 Facebook 和 instagram 组件。

## Declarative

React 使得可以无痛创建交互性 UI. 为你程序的每个状态设置不同的视图，当数据变化时，React 将更新并只渲染需要更新组件。

声明性视图提高代码的可预测性且调试方便。

## Component-Based

构建封装管理自己状态的组件，然后用他们组成复杂的 UIs.

因为组件逻辑以 JavaScript 书写而非模板，偿可以容易地传递丰富的数据并使状态独立于 DOM.

## Learn Once, Write Anywhere

我们不假设你的其他技术栈是什么，所以你可以用 React 开发新的特色而不用重写现有代码。

使用 Node, React 可以在服务端渲染，使用 React Native 创建强大的 mobile apps.

# TypeScript

引入 TypeScript 可以更好了解自己的代码及 React 代码。

# A Programmer's Experience with React

这个 React 指南是翻译自 [React 官方文档](https://reactjs.org/docs/)。很多示例使用 [TypeScript](http://www.typescriptlang.org/) 写的。我翻译了官方文档，也可以说是我翻译的笔记。我尽量保留原意，少写个人见解。

## Use it

从我接触 React 看的便是 React 的官方文档，然后学了3周左右，上手做项目。刚开始真是不容易，当时一些功能如显示一个弹窗，是在 DOM 插入一个 div 然后用 ReactDOM 渲染弹窗。直到第二个 React 项目时，对 React 有了深入的了解于是少了很多 DOM 操作。

为什么我决定使用我从未用过的 React 做项目？我们项目组的一个成员说一句话让我下定决心使用 React，他的意思大概是，不用一用咋知道有啥问题。我更多的自信来自于基 React 的了解，这时的 React 框架已经很成熟了，很多问题都有解决方法。使用 React 而不是把他作为“储备技能”让我受益非浅，如果我当时把 React 当作储务技能，那他可能就永远做“备胎”了。

我们第一个 React 项目使用 gulp 编译，第二个使用了 [Webpack](https://webpack.js.org/), 及 [postcss](http://postcss.org/), 未来的某些项目会加入 TypeScript 支持.

## Documents are Necessary

React 是一个更新很快的库，很庆幸我一开始就参考的是官方的文档，基本上项目中遇到的问题在 React 官方文档中都能找到解决方法。实在不行就去 github 上看一看。网上的博客我也看过，博客类似于代码编后感，是经验之谈。有完整的可参阅的文档才能遇到我们使用中遇到的各种各样的问题。React 在这一点做的很好。[React 社区](https://reactjs.org/community/support.html), 及 React 开发人员的建议都能我们很好的解决问题。

## Native JavaScript Programming Experience

React 带给人的编程体验就好像是原生开发体验。如果使用 ES6 语法 及 TypeScript 支持，感觉好像是在写 Java 代码。这种写法可能与 ES6+ 给我们带来的未来 JavaScript 编译体验很相近。也许 JavaScript 将来会演化成 Java 的 "Script".

React 相比其他库更吸引人的一点是，不用太多关注 DOM 操作，没有繁索的指令，模板，注入等等，React 把复杂的 Web 开发封装起来，提供精简的接口。开发者只要有清淅的组件实现逻辑，没有什么逻辑实现比一门原生的编程语言更容易实现了。在 JavaScript 实现模板中模板语言复杂的功能，视图的组合等等，用 React，借助 JavaScript 的语言能力，变得更加简单。

## React is to hard to learn?

很多人觉得 React 难学，React 难学吗？React 学习在难点是，React 的用法就像是原生 JavaScript, 你学习 React，你是在学习整个 Web 知识。如果你惯用现成的库，那 React 真的太难学了。不管你用什么库，一个项目的总体难度是不变的的，如果库不帮你实现，那你就要自己实现。