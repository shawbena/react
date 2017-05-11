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

*/
var HelloWorld = React.createClass({
    render: function(){
        return (
            <p>
                Hello, <input type="text" placeholder="Your name here" />
                It is {this.props.date.toTimeString()}。
            </p>   
        );
    }
});
setInterval(function(){
    ReactDOM.render(
        <HelloWorld date={new Date()} />,
        document.getElementById('example')
    );
}, 500);
