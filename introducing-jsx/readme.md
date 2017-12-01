# Introducing JSX

考虑以下变量声明：

```jsx
const element = <h1>Hello, world!</h1>;
```

这种有趣的标签语法既不是字符串非 HTML。

他叫 JSX, 是 JavaScript 语言的扩展。我们推荐和 React 一起使用他以描述 UI。JSX 可能使你想起模板语言，但他有 JavaScript 的完整能力。

JSX 生成 React 元素。[下一节](/rendering-elements/) 我们将探索将 JSX 渲染到 DOM。下面你可以找到 JSX 的基本语法。

## Embedding Expressions in JSX

你可以在 JSX 中可以嵌入任何 [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) ,只需将其包裹在曲括号中即可。

如，`2 + 2`, `user.fileName` 及 `formatName(user)` 都是有效的表达式：

```jsx
function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);

ReactDOM.render(element, document.getElementById('root'));
```

为了可读性我们将 JSX 分成了多行。但这并不是必须的，当这么做时，我们也推荐将 JSX 包括的括号中以避免 [automatic semicolon insertion](http://stackoverflow.com/q/2846283)) 陷阱 (pitfalls)。

classic asi example:

```js
return 
  "something";
// is transformed to
return;
  "something";
```

## JSX is and Expression Too

编译之后，JSX 表达式变成了常规的 JavaScript 对象。

这意味着你可以在 `if` 语句和 `for` 循环中使用 JSX，赋值给变量，接收参数，及从函数返回他。

```js
function getGreeting(user){
    if(user){
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}
```

## Specifying Attributes with JSX

你可以使用引号指定字符串字面量为属性：

```jsx
const element = <div tabIndex="0"></div>;
```

你也在属性中用曲括号嵌入 JavaScript 表达式：

```jsx
const element = <img src={user.avatarUrl} />;
```

当在属性中嵌入 JavaScritp 表达式时不要用引号把曲括号围起来。要么用引号 (for string values) 要么用曲括号 (for expressions), 但不能同时同一属性中两者都用。

> __Warning__

> 由于 JSX 相比 HTML 更接近 JavaScript, React DOM 使用 `camelCase` 属性命名约定而非 HTML 属性名。

> 如 JSX 中 `class` 变成 [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className), `tabindex` 变成了 [tabIndex](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)

## Specifying Children with JSX

如果标签是空的，你可以用 `.>` 立即关闭他，像 XML:

```jsx
const element = <img src={user.avatarUrl} />;
```

JSX 标签可包含子元素 (children):

```jsx
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here</h2>
    </div>
);
```

## JSX Prevents Injection Attacks

在 JSX 中嵌入用户输入是安全的：

```jsx
const title = response.potentiallyMaliciousInput;
// This is safe
const element = <h1>{title}</h1>;
```

默认 React DOM 在渲染嵌入 JSX 的值之前会[转义](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)他们。这确保不会注入没有在你应用中明确写明的东本。在渲染前一切都被转换成字符串。这有助于预防 [XSS(cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting)。

## JSX Represents Objects

Babel 将 JSX 编译成 `React.createElement()` 调用。

两个等同的示例：

```jsx
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);
```

```js
const element = React.createElement(
    'h1',
    { className: 'greeting' },
    'Hello, world!'
);
```

`React.createElement()` 执行一些检查有助于你写出无 bug (bug-free) 的代码，但本质上他创建如下对像：

```js
// Note: this structure is simplified
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world'
    }
};
```

这些对象叫做 "React elements"。你可以把他们想像成描述你想在屏幕上看到的内容。React 读取这些对象，用他们来构造 DOM 并维护。

下一节我们将探索将 React 元素渲染到 DOM。

> __Tip__

> 我们推荐你选择编辑器时使用 ["Babel" language definition](http://babeljs.io/docs/editors) 以正确 (properly) 高亮 ES6 和 JSX 代码。本网站使用兼容的 [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) 主体色。
