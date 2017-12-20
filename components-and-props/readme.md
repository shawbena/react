# Components and Props

prev: 'rendering-elements'
next: 'state-and-lifecycle'

组件使得你将 UI 分成独立，可重用的部分，并孤立的思考每个部分。

概念上，组件类似 JavaScript 函数。他们接收任意输入 (称 "props") 并返回 React 元素，描述屏幕上应显现什么.

## Functional and Class Components

定义组件的最简单的方式是写一个 JavaScript 函数：

```js
function Welcom(props){
    return <h1>Hello, {props.name}</h1>;
}
```

这个函数是一个有效的 React 组件，因为他接受一个单一的 "props" (表示属性) 参数对象的数据并返回一个 React 元素。我们称这样的组件 "functional" 因为他们是字面量上的函数。

你也可以用 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 定义一个组件：

```jsx
class Welcome extends React.Component {
    render(){
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

以上两个组件在 React 看来是等同的。

类有一些额外的特色，我们将在 [下一章节](/state-and-lifecycle/) 讨论。在此之前我们将使用函数性的组件。

## Rending a Component

之前，我们只遇到了表示 DOM 标签的 React 元素：

```jsx
const element = <div />;
```

然而，元素也可以表示用户定义的组件：

```jsx
const element = <Welcome name="Sara" />;
```

当 React 见一个表示用户定义的组件时，他将 JSX 属性作为一个单一的对象传递过去。我们称这个对象为 "props".

例如，这段代码在页面渲染 "Hello, Sara":

```jsx
function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />
ReactDOM.render(element, document.getElementById('root'));
```

让我们回顾下这个示例中都发生了什么：

1. 调用 用 `<Welcome name="Sara" />` 元素调用 `ReactDOM.render()`。

2. 以 `{name: 'Sara'}` 作为 props 调用 `Welcome` 组件。

3. 我们的 `Welcome` 组件返回 `<h1>Hello, Sara</h1>` 元素作为组果。

4. React DOM 有效地更新 DOM 以匹配 `<h1>Hello, Sara</h1>`

> __Caveat__
>
> 组件名总以大写字母开头。
>
> 如 `<div />` 表示一个 DOM 标签，而 `<Welcome />` 表示一个组件并要求 `Welcome` 在作用域内。

## Composing Components

组件在其输出中可引用其他组件。这使得我们对任何层级的细节都可用同一组件抽像。

按钮，表单，对话框，屏幕：在 React apps 中，所有这些通通可以表示为组件。

例如，可以创建一个 `App` 组件，多次渲染 `Welcome`:

```jsx
function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}

function App(){
    return(
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>;
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

通常 React 应用最顶层有一个单一的 `App` 组件。然而，如果你将 React 集成到现有应用中，你可能从底向上以类似 `Button` 这样的组件开始，并逐渐至视图层级的最顶层。

## Extracting Components

别害怕将组件分成小的组件。

例如，考虑一个 `Comment` 组件：

```jsx
function Comment(props){
    <div className="Comment">
        <div className="UserInfo">
            <img className="Avatar"
                src={props.author.avatarUrl}
                alt={props.author.name}
            /> 
            <div className="UserInfo-name">{props.author.name}</div>
        </div>
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
}
```
他接受 `author` (一个对象)，`text` (一个字符串)，及 `date` (一个日期) 为 props, 描述一个社交媒体网站的评论。

变更这个组件很棘手，因他全都是嵌套，也很难重用单独的部分。让我们从中提出一些组件。

首先让我们提取 `Avatar`:

```js
function Avatar(props){
    return(){
        <img
          className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />
    }
}
```

`Avatar` 不需要知道 `Comment` 中渲染了什么。这是为什么我们使用一个泛泛的属性名：`user` 而非 `author`.

我们建议以组件的视角而非组件使用的语境来命名 props.

现在我们可以简化 `Comment` 一点：

```jsx
function Comment(props){
    <div className="Comment">
        <div className="UserInfo">
            <Avata user={props.author} />
            <div className="UserInfo-name">{props.author.name}</div>
        </div>
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
}
```

接下来，我们将提限一个 `UserInfo` 组件，渲染 `Avatar` 旁边有用户的名子：

```jsx
function UserInfo(props){
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}
```

让我们进一步简化 `Comment`:

```jsx
function Comment(props){
    return(
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">{props.text}</div>
            <div className="Comment-date">{formatDate(props.date)}</div>
        </div>
    );
}
```

提取组件一开始可能看起来是单调乏味的苦差事 (grunt work)，但在大应用中有调色板一样可重用的组件是值得的。一条经验就是如果你的部分 UI 多次使用 (`Button`, `Panel`, `Avatar`), 或者本身很复杂 (`App`, `FeedStory`, `Comment`), 他是重用组件的很好的候选者。

## Props are Read-Only

无论声明函数类型还是类类型的组件，都不能修改改自己的 props. 考虑 `sum` 函数：

```js
function sum(a, b){
    return a + b;
}
```

这样的函数叫 ["pure"](https://en.wikipedia.org/wiki/Pure_function), 因为他们不尝试改变他们的输入，对同样的输入总是返回相同的结果。

相反，这个函数是不纯的 (impure), 因为他改变了自己的输入：

```js
function withdra(account, amount){
    account.total -= amount;
}
```

React 是相当灵活的，但有一条严格的规则：

__所有的 React 组件必须像 pure 函数一样对待对待他们的 props.__

当然了，应用的 UIs 是动态的并随时间变化。[下一节](/state-and-lifecycle)，我们将介绍 "state" 的概念。状态 (state) 使得 React 组件随时间变更以响应用户动作，网络响应，等等，而不违返这条规则。

