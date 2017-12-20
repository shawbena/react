# Handing Events

prev: state-and-life-cycle
next: conditional-rendering

处理 React 元素的事件非常类似于处理 DOM 元素的事件。只是语法上有些差异：

- React 事件以 camelCase 命名，而非 lowercase

- JSX 中你传递函数作为事件处理程序，而不是字符串

例如，在 HTML 中：

```html
<button onclick="activateLasers()">
    ActivateLasers
</button>
```

和 React 中有点不同：

```jsx
<button onClick={activateLasers}>
    Activate Lasers
</button>
```

 另一个不同是在 React 中你不能返回 `false` 阻止默认行为。你必须明确调用 `preventDefault`. 例如，在HTML 中，要阻止链接的默认行为，可以这样写：

 ```html
 <a href="#" onclick="console.log('The link was clicked.'); return false">Click me</a>
 ```

 在 React 中应该是这样：

 ```jsx
function ActionLink(){
    function handleClick(e){
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>Click me</a>
    );
}
 ```

 这里 `e` 是合成事件。React 根据 [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/) 定义这些事件, 所以你不用担心跨浏览器兼容性。详见 [SyntheticEvent](/docs/events).

 使用 React 你通常不需要在 DOM 元素创建后调用 `addEventListener` 添加侦听函数。而是仅仅在元素最初渲染时提供一个侦听函数。

 当你用 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 定义组件时，事件处理函数的常见模式是类的方法。如，这个 `Toggle` 组件渲染一个按钮，让用户可以切换 "ON" 和 "OFF" 状态：

 ```jsx
 class Toggle extends React.Component{
     constructor(props){
         super(props);
         this.state = { isToggleOn: true };

         // This binding is necessary to make `this` work in the callback
         this.handleClick = this.handleClick.bind(this);
     }

    handleClick(){
        this.setState(prevState => ({
            isToggleOn: prevState.isToggleOn
        }));
    }

    render(){
        return(
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
 }

 ReactDOM.render(<Toggle />, document.getElementById('root'));
 ```

 小心 JSX 回调中 `this` 的函义。在 JavaScript 中，类方法默认是[不绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)的。如果你忘记了绑定 `this.handleClick` 并将他传递给 `onClick`, 当函数被调用时 `this` 将会是 `undefined`.

这不是 React 才有的问题，[JavaScript 中的函数就是这样](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)的。通常如果你引用函数而后面没有 `()`，如 `onClick={this.handleClick}`, 你应该绑定 (bind) 这个方法. //此处是理解问题的关键

 如果调用 `bind` 让你很烦感，你可以用以下两种方法避开他。如果使用 [public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/), 你可以用类域正确绑定回调：

```jsx
class LoggingButton extends React.Component {
    //This syntax ensures `this` is bound within handleClick
    //Warning: this is *experimental* syntax
    handleClick = () => {
        console.log('this is: ', this);
    }

    render(){
        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        );
    }
}
```

[Create React App](https://github.com/facebookincubator/create-react-app) 默认启用这种语法。

如果你不用类域语法，你可以使用在回调中使用 [箭头函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions):

```jsx
class LoggingButton extends React.Component {
    handleClick(){
        console.log('this is: ', this);
    }

    render(){
        // This syntax ensures `this` is bound within handleClick
        return(
            <button onClick={e => this.handleClick(e)}>
                Click me
            </button>
        );
    }
}
```

 这种语法的问题是每次渲染 `LogginButton` 都会创建一个不同的回调，大多数情况下是没有问题的。然而，如果这个回调作为属性传递给下层的组件，这些组件可能要做额外渲染。我们通常推荐在构造函数中绑定或使用类域语法, 避免这样的性能问题。

 ## Passing Arguments to Event Handler

 在一个循环中给事件处理函数传递额外的参数是常见的需求。如，如果 `id` 是行 ID, 以下示例中的哪个都可以：

 ```jsx
 <button onClick={e => this.deleteRow(id, e)}>Delete Row<button>
 <button onClick={this.deleteRow.bind(this, id)}>Delete Row<button>
 ```

 上面示例中的两行是等同的，分别使用[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)和 [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind).

 两种情形中的 `e` 都表示在 ID 后要传的 React 事件。使用箭头函数明确地传递，数据将会附加在函数前面。
