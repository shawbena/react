/*
 展示数据
 UI 要做的基本的东西就是展示一些数字。React 使得展示数据和数据更新时保持页面更新变得简单。
*/
/*
 响应式的更新
 在浏览器中打开 hello-react.html，在文本域中键入你的名子。注意 React UI 中的时间字符串——文本域中输入的任何值都会保留，即使你没有写任何代码管理这种行为。React 为你计算并做正确的事情。
 除非需要 React 是不会操作 DOM 的。React 用内部的 mock DOM 执行比较并为你计算出效率最高的 DOM 修改。
 这个组件的输入叫做 props —— "properties" 的简写。在 JSX 语法中，他们是作为属性传递的。在组件中你应该把这些认为是不可修改的，即，不要写 this.props.
*/
/*
 组件就像函数
 React 组件很单。你可以把他们想像为接收 props 和 state 的简单的函数并渲染 HTML.
React 组件只能渲染一个根节点，如果你想返回多个节点必须将他们包裹在一个根节点中。
*/
/*
 JSX 语法
 我们强烈建议分开关系使用组件是正确的方式，而不是用模板和显示逻辑。我们认为标记和代码生成的组件结合的非常紧密。而且显示逻辑是非常复杂的，使用模板显示是非常臃肿的。

 我们发现解决这个问题的最好方案是在 JavaScript 代码中直接生成 HTML 和组件树，这样你可以使用真正编程语言表达式的强大去构建 UI。

 为了使这简单，我们添加了一个非常简单，可选的类似 HTML 的语法构建这些 React 树节点。

 JSX 使得你使用类似 HTML 的语法创建 JavaScript 对象。在 React 中生成纯 JavaScritp 可以这样写：
 React.createElement('a', {href: 'http://facebook.github.io/react/'}, 'hellow!');
 使用 JSX:
 <a href="http://facebook.github.io/react/">hellow!</a>这使得构建 React 应用更简单，设计师也倾向这种语法，但是每个人都有自己的工作流程，用 React 并非要用 JSX.

 JSX 很小。更多请看 JSX in depth. 或参见 the Babel REPL(https://babeljs.io/repl/) 的转换。

 JSX 类似 HTML, 但并非一样。不同见 JSX gotchas (http://reactjs.cn/react/docs/jsx-gotchas.html).

Babel 暴露了一些 JSX 起步的方法，从命令行工具到 Rails 集成的 Ruby. 选择一个适合你的工具。
 我们发现
*/
/*
 不使用 JSX
 如果不使用 JSX。在 JavaScritp 中创建元素可用 React.createElement, 这个方法接受一个标签名或组件，一个属性对象，和可变可选的子元素参数。
 var child1 = React.createElement('li', null, 'First Text Content');
 var child2 = React.createElement('li', null, 'Second Text Content');
 var root = React.createElement('ul', {className: 'my-list'}, child1, child2);
 ReactDOM.render(root, document.getElementById('example'));
*/
/*
 JSX in Depth
 JSX 是 JavaScript 语法的扩展，其看起来像 XML.
*/
var HelloWorld = React.createClass({
    render: function () {
        return (
            <p>
                Hello,
                <input type="text" placeholder="Your name here"/>
                It is {this
                    .props
                    .date
                    .toTimeString()}。
            </p>
        );
    }
});
setInterval(function () {
    ReactDOM.render(
        <HelloWorld date={new Date()}/>, document.getElementById('example'));
}, 500);
/*
 HTML 标签和 React 组件
 React JSX 使用 upper vs. lower case 约定区别本地组件类和 HTML 标签。
 JSX 是 JavaScript, 如 class 和 for 这样的标识符在 XML 属性中是不推荐的，React DOM 组件期望像 className 和 htmlfor 这样的属性名。
*/
//渲染 HTML 标签，在 JSX 中仅需创建一个 小写的标签名:
let myDivElement = <div className="foo"/>;
ReactDOM.render(myDivElement, document.getElementById('example_jsx_1'));

//渲染 React 组件，仅需创建一个大写字母开头的本地变量名：
let MyComponent = React.createClass({
    render() {
        return (
            <div>my element</div>
        );
    }
});
let myElement = <MyComponent someProperty={true}/>;
ReactDOM.render(myElement, document.getElementById('example_jsx_2'));

/*
 转换
 React JSX 将类似 XML 的语法转换为本土 JavaScritp 语法。XML 元素，属性和子元素被转换成参数传递给 React.createElement
*/
//要使用 <Nav /> Nav 变量必须在作用域范围内
let Nav = 'div',
    Profile = 'p';
let app = <Nav color="blue"/>;
app = React.createElement(Nav, {color: "blue"});

//使用 XML 语法指定 children
app = <Nav>
    <Profile>click</Profile>
</Nav>;
app = React.createElement(Nav, {
    color: "blue"
}, React.createElement(Profile, null, "click"));

/*
 名称空间化组件
 构建有很多 children 的组件，如表单，你可能要声明很多变量。名称空间化的组件使得你可以使用属性是其他组件的组件。
*/
let MyFormComponent = React.createClass({
    render() {
        return (
            <div className="form"></div>
        );
    }
});
MyFormComponent.Row = React.createClass({
    render() {
        return (
            <div class="form-row"></div>
        );
    }
});
MyFormComponent.Label = React.createClass({
    render() {
        return (
            <div class="form-label"></div>
        );
    }
});
MyFormComponent.Input = React.createClass({
    render() {
        return (
            <div class="form-Input"></div>
        );
    }
});
let Form = MyFormComponent;
app = (
    <Form>
        <Form.Row>
            <Form.Label/>
            <Form.Input/>
        </Form.Row>
    </Form>
);

/*
 JavaScript 表达式
 //属性表达式
 在属性值中用 JavaScript 表达式，应将其包裹在 {} 中：
 let person = <Person name={window.isloggedIn ? window.name : ''} />;
 person = React.createElement(
 Person, {name: window.isloggedIn ? window.name : ''}
 //布尔属性
 忽略的属性值将被 JSX 视为真
);
*/
