# JSX In Depth

根本上来说，JSX 只是提供 `React.createElement(component, props, ...children)` 函数的语法糖而已。JSX 代码：

```jsx
<MyButton color="blue" hsadowSize={2}>
    Click Me
</MyButton>
```

编译成：

```js
React.createElement(
    MyButton,
    {color: 'blue', shadowSize: 2},
    'Click Me'
);
```

如果没有子元素可以使用自我闭合的标签。

```jsx
<div className="sidebar" />
```

编译成：

```js
React.createElement(
    'div',
    {className: 'sidebar'},
    null
);
```

如果你想测试一下一些特定的 JSX 是如何转成 JavaScript 的，你可以试试 [the online Babel compiler](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-0&code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3B%0A%7D)

## Specifying The React Elemnt Type

JSX 标签的第一部分确定 React 元素的类型。

大写的类型指明 JSX 标签引用一个 React 组件。

这些标签编译成对命名变量的直接引用，所以如果你使用 `<Foo />` JSX 表达式，`Foo` 必须是作用域内。

### React Must Be in Scope

由于 JSX 编译调用 `React.createElement`, `React` 库必须在你 JSX 代码的作用域内。

例如，这个代码中，两个引入都是需要的，即使 `React` 和 `CustomButton` 并没有直接在 JavaScript 中被引用：

```jsx
import React from 'react';
improt CustomButton from './CustomButton';

function WarningButton(){
    // return React.createElement(CustomButton, {color: 'red'}, null);
    return <CustomButton color="red" />;
}
```

如果你不使用 JavaScript 打包工具，而是从 `<script>` 标签中加载 React, `React` 是在全局作用域中
。

### Using Dot Notation for JSX Type

在 JSX 中，你也可以使用点表示法 (dot-notation) 引用一个 React 组件。如果你有一个输出很多 React 组件的单个模块，这样作是很方便的。如，`MyComponents.DatePicker` 是一个组件，你可以直接在 JSX 中使用他：

[index.tsx](./dot-notation/index.jsx)

```tsx
import * as React from 'react';

interface MyComponentsProps {
    color: string;
}

const MyComponents = {
    DatePicker: function DatePicker(props: MyComponentsProps) {
        return <div>Image a {props.color} datepicker here.</div>
    }
};

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}
```

_编译后的代码_

```js
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__("GiK3");
var MyComponents = {
    DatePicker: function DatePicker(props) {
        return react_1.default.createElement("div", null,
            "Image a ",
            props.color,
            " datepicker here.");
    }
};
function BlueDatePicker() {
    return react_1.default.createElement(MyComponents.DatePicker, { color: "blue" });
}
```

## User-Defined Components Must Be Capitalized

当一个元素类型以小写字母打头是，他引用一个内置的组件如 `<div>` 或 `<span>`，结果是传给 `React.createElement` 一个字符串 `'div'` 或 `'span'`. 以一个大写字母开头的类型如 `<Foo />` 编译成 `React.createElement(Foo)` 并编译成你 JavaScript 文件中字义或引用的组件。

我们推荐以一个大写字母命名组件。如果你有一个组件以小写字母打头，在 JSX 中使用他之前把他赋给一个大写的变量。

如，这段代码将不会如你所期望的那样：

```jsx
import React from 'react';

// / Wrong! This is a component and should have been capitalized
function hello(props){
    // Correct! This use of <div> is legitimate because div is a valid HTML tag
    return <div>Hello {props.toWhat}</div>;
}

function HelloWorld(){
    // Wrong! React thinks <hello /> is an HTML tag because it's not capitialized
    return <hello toWhat="World" />;
}
```

要修复他，我们将 `hello` 重命名为 `Hello` 并且当引用时使用 `<Hello />`:

```jsx
import React from 'react';

// Correct! This is a component and should have been capitalized
function Hello(props){
    // Wrong! React thinks <hello /> is an HTML tag because it's not capitialized
    return <hello toWhat="World" />;
}

function HelloWorld(){
    // Correct! React knows <Hello /> is component because it's capitialized
    return <Hello toWhat="World" />;
}
```

## Choosing the Type at Runtime

你不能当通用表达式用作 React 元素类型。如果你想使用一个通用表达式指出元素的类型，只要先将他赋给一个大写民的变量就好了。当你想基于一个属性渲染不同的组件时常常会出现这样的事：

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}
```

要修复他，我们将先把类型赋给一个大写的变量：

```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX can be a capitialized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## Props in JSX

在 JSX 中指定属性 (props) 有几种不同的方式。

### JavaScript Expression as Props

你可以传递任何 JavaScript 表达式作为属性，要将 JavaScript 包围在 `{}` 中。如，这个 JSX 中：

```jsx
<MyComponent foo={1 + 2 + 3 + 4}/>
```

编译后的代码：

```js
_react2.default.createElement(MyComponent, { foo: 1 + 2 + 3 + 4 });
```

对于 `MyComponent`, `props.foo` 将会是 `10` 因为表达式 `1 + 2 + 3 + 4` 得到了求值。

`if` 语句 (statements) 及 `for` 循环在 JavaScript 中并不是表达式，所以不能在 JSX 中直接使用他们。而是你可以在这样做。如：

```jsx
function NumberDescriber(props){
    let description;
    if(props.number % 2 == 0){
        description = <strong>event</strong>;
    }else{
        description = <i>odd</i>;
    }
    
    return <div>{pros.number} is an {description} number</div>;
}
```

在相应节 [conditional rendering](/conditional-rendering/) 及 [loops](/list-and-keys/) 你学到更多。

### String Literals

你也可以传递字符串字面量作为属性。这两个 JSX 表达式是等同的：

```jsx
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

编译成：

```js
_react2.default.createElement(MyComponent, { message: 'hello world' });

_react2.default.createElement(MyComponent, { message: 'hello world' });
```

当你传递字符串字面时，他是值是 HTML 转义的。所以这两个 JSX 表达式是等同的：

```jsx
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

编译成：

```js
_react2.default.createElement(MyComponent, { message: '<3' });

 _react2.default.createElement(MyComponent, { message: '<3' });
```

### Props Default to "True"

如果你没有给一个属性传值，他的值默认是 `true`. 这两个 JSX 表达式是等同的：

```jsx
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

编译成：

```js
_react2.default.createElement(MyTextBox, { autocomplete: true });

_react2.default.createElement(MyTextBox, { autocomplete: true });
```

通常，我们不推荐这样用，因为这会与 [ES6 object shorthand](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) `{foo}` 是 `{foo: foo}` 而不是 `{foo: true}` 的语法搞混。这种行为只在这因为他匹配 HTML 的行为。

### Spread Attributes

如果你已经有一个 `props` 对象，你想在 JSX 中传递他，你可以使用 `...` 作为 "spread" 操作符来传递整个属性对象。这两个组件是等同的：

[index.jsx](./spread-attributes/index.tsx)

```tsx
import * as React from 'react';

function App1(){
    return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2(){
    const props: GreetingProps = {firstName: 'Ben', lastName: 'Hector'};
    return <Greeting {...props}/>;
}

interface GreetingProps{
    firstName: string;
    lastName: string;
}

function Greeting(props: GreetingProps){
    return <div>Hello, {props.firstName} {props.lastName}.</div>
}
```

编译成：

```js
function App1() {
    return React.createElement(Greeting, { firstName: "Ben", lastName: "Hector" });
}
function App2() {
    var props = { firstName: 'Ben', lastName: 'Hector' };
    return React.createElement(Greeting, __assign({}, props));
}
function Greeting(props) {
    return React.createElement("div", null,
        "Hello, ",
        props.firstName,
        " ",
        props.lastName,
        ".");
}
```

你也可以挑选你组件将使用的特定的属性，使用展开操作符 (spread opeator) 传递其他所有属性。

[index.tsx](./pick-props/index.tsx)

```tsx
import * as React from 'react';
import { render } from 'react-dom';

interface ButtonProps {
    kind: string;
    [prop: string]: any;
}

const Button = (props: ButtonProps) => {
    const { kind, ...other} = props;
    const className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton';

    return <button className={className} {...other} />;
};

const App = () => {
    return (
        <div>
            <Button kind="primary" onClick={() => console.log('clicked!')}>Hello world!</Button>
        </div>
    );
}

let div = document.createElement('div');
document.body.appendChild(div);
render(<App />, div);

```

编译成：

```js
"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

var React = __webpack_require__("GiK3");
var react_dom_1 = __webpack_require__("O27J");
var Button = function (props) {
    var kind = props.kind, other = __rest(props, ["kind"]);
    var className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton';
    return React.createElement("button", __assign({ className: className }, other));
};
var App = function () {
    return (React.createElement("div", null,
        React.createElement(Button, { kind: "primary", onClick: function () { return console.log('clicked!'); } }, "Hello world!")));
};
var div = document.createElement('div');
document.body.appendChild(div);
react_dom_1.render(React.createElement(App, null), div);
```

在上面的示例中，安全地使用了 `kind`, 并且并没有把他传递给 DOM 中的 `<button>` 元素。

通过 `..other` 对象传递的其他属性使这个组件真的灵活。你可以看到他伟递了 `onClick` 及 `children` 属性。

spread 特性可以是有用的，但也很容易传递不必要的属性，组件不关心是否给 DOM 传递了无效的 HtML 属性。我们建议节俭地使用这个语法。

## Children in JSX

在既包含开标签又包含闭标符的 JSX 表达式中，这些标签间的内容作为一个特殊的属性传递 `props.children`. 传递子元素有几种不同的方式：

### String Literals

你可以在开闭标签间放一个字符串，`props.children` 将会只是字符串。这对大多内置的 HTML 是有用的。如：

```jsx
<MyComponent>Hello world!</MyComponent>
```

编译成：

```js
_react2.default.createElement(
    MyComponent,
    null,
    'Hello world!'
);
```

这是有效的 JSX, `MyComponent` 中的 `props.children` 将只会是 `"Hello world!"`. HTML 被转义，所以你可以就像写 HTML 一样这样写 JSX:

```html
<div>This is valid HTML &amp; JSX at the same time.</div>
```

JSX 移除一行开头和结尾的空白符。对齐标签的新行被移除，出现在字符串字面量的新行被压缩成一个单个空格。所以这些渲染的是一样的东本：


```jsx
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```

编译成：

```js
_react2.default.createElement(
    'div',
    null,
    'Hello World'
),
_react2.default.createElement(
    'div',
    null,
    'Hello World'
),
_react2.default.createElement(
    'div',
    null,
    'Hello World'
),
_react2.default.createElement(
    'div',
    null,
    'Hello World'
)
```

### JSX Children

你也可以提供更多 JSX 元素作为子元素。这用来渲染嵌套组件有用：

```jsx
<MyContainer>
    <MyFirstComponent />
    <MySecondComponent />
</MyContainer>
```

你可以混合不同类型的子元素，所以你可以将字符串字面量和 JSX 子元素 一起使用。这是 JSX 另一处像 HTML 的地方，所以两者都是有效的 JSX 和有效的 HTML:

```jsx (or html)
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

一个 React 组件也可以返加一个元素数组：

```jsx
render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

## JavaScript Expressions as Children

你可以传递任何 JavaScript 表达式作为子元素，将他包括在 `{}` 中。如，这些表达式是等同的：

```jsx
<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>
```

编译成：

```js
_react2.default.createElement(
    MyComponent,
    null,
    'foo'
);

_react2.default.createElement(
    MyComponent,
    null,
    'foo'
);
```

这用于渲染一个任意长度的 JSX 表达式列表常常是有用的。如，渲染一个 HTML 列表：

[index.tsx](./javascript-expression-as-children/index.tsx)

```jsx
import * as React from 'react';

interface ItemProps {
    message: string;
}

function Item(props: ItemProps){
    return <li>{props.message}</li>
}

function TodoList(){
    const todos = ['finish doc', 'submit pr', 'nag da to review'];
    return (
        <ul>
            {
                todos.map(message => <Item key={message} message={message} />)
            }
        </ul>
    );
}
```

编译成：

```jsx
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("GiK3");
function Item(props) {
    return React.createElement("li", null, props.message);
}
function TodoList() {
    var todos = ['finish doc', 'submit pr', 'nag da to review'];
    return (React.createElement("ul", null, todos.map(function (message) { return React.createElement(Item, { key: message, message: message }); })));
}
```

JavaScript 表达式也可以混合其他类型的子元素。这常在字符串模板中有用：

```jsx
function Hello(props){
    return <div>Hello {props.address}!</div>;
}
```

编译成：

```js
function Hello(props) {
    return _react2.default.createElement(
        'div',
        null,
        'Hello ',
        props.address,
        '!'
    );
}
```

## Functions as Children

正常地，插入到 JSX 中的 JavaScript 表达式将求值为字符串，React 元素，或者这些东西的列表。然而 `props.children` 就像其他属性一样可以传递任何种类的数据，而不仅仅是 React 知道怎样去渲染的种类。例如，你有一个自定义组件，你可以让他接收一个回调作为 `props.children`:

```jsx
// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

传递给一个自定义组件的子元素 (children) 可以是任何东西，只要在 React 在渲染前可以理解就行。这种用法不常见，但可以工作，如果你想拉伸 JSX 的能力的话。//好用

## Booleans, Null, and Undefined Are Ignored

`false`, `null`, `undefined`, 及 `true` 是有效的 children. 只是他们不渲而已。这些 JSX 标签将渲染同样的东西：

```jsx
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

编译成：

```js
_react2.default.createElement('div', null),
_react2.default.createElement('div', null),
_react2.default.createElement(
    'div',
    null,
    false
),
_react2.default.createElement(
    'div',
    null,
    null
),
_react2.default.createElement(
    'div',
    null,
    undefined
),
_react2.default.createElement(
    'div',
    null,
    true
)
```

这用于有条件地渲染 React 元素很有用。这个 JSX 只渲染 `<Header />` 如果 `showHeader` 是 `true`:

```jsx
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

警告下，一些 ["false" 值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), 如数字 `0`，仍然会被 React 渲染。如这段代码将不会如果所愿，因为当 `props.messages` 是空数组时将会打印 `0`.

```jsx
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

要修复这个问题，确保 `&&` 前的表达工一直是 boolean:

```jsx
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```

相反地，如果你想如 `flase`, `true`, `null` 或 `undefined` 出现在输出中，你要先把他[转换为字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion)：

```jsx
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```