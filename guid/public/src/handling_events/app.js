/*
* 处理 React 元素的事件非常类似于处理 DOM 元素的事件。只是语法上有些差异：
* React 事件以 camelCase 命名，而非 lowercase
* JSX 中你传递函数作为事件处理程序，而不是字符串
*/
/* in html*/
// <button onclick="activeLasers()">
// </button>  
/* in react*/
// let button = <button onClick={activeLasers}>
//     Activate Lasers
// </button>

/*
* 另一个不同是在 React 中你不能返回 fase 阻止默认行为. 你必须明确调用 preventDefault. 例如，在HTML 中，要阻止链接的默认行为，可以这样写：
*/
// <a href="#" onclick="console.log('The link was clicked.');return false">Click me</a>

/*
* 在 React 中要这样写
*/

function ActionLink(){
    return (
        <a href="#" onClick={handleClick}>Click</a>
    );
    /*
     e 是合成事件。React 定义这些合成事件 (synthetic event) 依据 W3C spec (https://www.w3.org/TR/DOM-Level-3-Event), 所以你不用担心跨浏览器兼容性。更多详见 SyntheticEvent.
    */
    function handleClick(e){
        e.preventDefault();
        console.log('The link was clicked.');
    }
}
/*
 用 React 时，你应该通常不需要在 DOM 元素创建后用 addEventListener 给 DOM 元素添加事件侦测者。而是在元素初始渲染时添加侦听者。

 当用 ES6 class 定义一个组件，事件侦听者的常见模式是作为类上的一个方法。

 注意在 JSX 回调中的 this。在 JavaScript 中，类方法默认是没有 bound (绑定)，如果你忘了绑定 this.handleClick 并将他传递给了 onClick, 当函数被调用时 this 将会是 undefined. //此处请认真阅读

 这不是 React 的问题，JavaScript 中的函数就是这样的。通常如果你引用函数而后面没有 ()，如 onClick={this.handleClick}, 你应该 bind 这个方法. //此处是理解问题的关键

 如果使用 bind 让你很烦感，你可以用以下两种方法解决：
 //使用 property initializer syntax (https://babeljs.io/docs/plugins/transform-class-properties/)
 //Create React App 默认启用这种语法 (https://github.com/facebookincubator/create-react-app)
 class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
//使用 arrow function 
这种语法的问题是每次渲染 LogginButton 都会创建一个不同的回调，大多数情况下是没有问题的。然而，如果这个回调作为属性传递给下层的组件，这些组件可能要额外渲染。我们通常推荐在构造函数中绑定或使用 property initializer syntax, 避免这样的性能问题。
(https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
*/
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {isToggleOn: true};
        // This binding is necessary to make `this` work in the callback
        //React 中每个方法自动绑定 React 实例（ES6 class 语法除外）。//?
        // this.handleClick = this.handleClick.bind(this);
    }
    //property initializer syntax
    //应该是绑定上下文的 this
    handleClick = (e) =>{
        console.log(e);
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    render(){
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('app')
);