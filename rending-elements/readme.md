# Rending Elements

prev: introducing-jsx
next: components-and-props

元素是 React apps 的最小构建块。// 不如说是 React 视图的最小构建块

一个元素描述你在屏幕上可以看到的东西。

```js
const elelemt = <h1>Hello, world</h1>;
```

不像 DOM 元素，React 无素是普通的对象，是廉价货。React DOM 负责更新 DOM 以匹配 React 元素。

> __Note__
>
> 一些人可能会将元素与广为人知的概念“组件”混淆。[下一节](/components-and-props)我们会介绍组件。元素构成了组件，在往前学习之前我们建议你读读本节。

## Rending an Element into the DOM

让我们假设你 HTML 文件中有个 `<div>`:

```html
<div id="root"></div>
```

我们称他为 "root" DOM 节点，因为他里面的一切都将有 React DOM 管理。

由 React 构建的应用常常只有一个单一的根 DOM 节点。如果你是将 React 集成到现有应用中，你可能有多个孤立的根 DOM 节点。

要将一个 React 元素 渲染进根 DOM 节点，将 React 元素与根 DOM 节点都传递给 `ReactDOM.render()`: 

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

这在页面上显示 "Hello, world"

## Updating the Rendered Element

React 元素是 [immutable](https://en.wikipedia.org/wiki/Immutable_object). 一旦你创建了一个元素，便不能改变其子元素或属性。一个元素就像电影中的帧：他表示时间上某一点的 UI。

以我们当前的知识，更新 UI 的唯一方式是创建一个新元素，然后传递给 `ReactDOM.render()`.

考虑这个 ticking clock 示例：

```jsx
function tick(){
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000);
```
 
每隔一秒就从 [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) 的回调中调用 `ReactDOM.render()`.

> __Note__:
> 实践中，大多 React 应用仅调用 `ReactDOM.render()` 一次。后面的章节我们将学习怎样将这样的代码封装进 [stateful components](/state-and-lifecycle)

## React Only Updates What's Necessary

Readt DOM 将元素和其子元素与之前的对比，只应用使 DOM 达到理想状态的需要的更新。

你可以在流览器中视察上个例子验证一下。

即使每次 tick 我们都创建一个元素描述更个 UI 树，但只有内容变化的文本节点得到 React DOM 的更新。

以我们的经验来看，思考一下 UI 在给定时该应该是什么样的比怎样随时间改变 UI 会少很多 bugs.