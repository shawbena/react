/*
 正常情况下我们定义 React 组件为一个 JavaScript 类：
 
 class Greeting extends React.Component{
     render(){
         return <h1>Hello, {this.props.name}</h1>;
     }
 }

 如果你还没有用 ES6, 你可以使用 create-react-class 模块：
*/

var createReactClass = require('create-react-class');   //应该就是 React.createClass
 var Greeting = React.createClass({
     render: function(){
         return <h1>Hello, {this.props.name}</h1>
     }
 });

 /*
  ES6 类 API 类似于 createReactClass(), 只是有少许区别
 */

/*
 # Declaring Default Props
 对于函数和 ES6 类 defaultProps 是定义为组件自身的一个属性

 class Greeting extends React.Component{
     //...
 }

 Greeting.defaultProps = {
     name: 'Mary'
 };
*/

/*
 # 对于 createReactClass(), 你需要在传递的对像上定义一个 getDefaultProps() 函数：
*/

var Greting = React.createClass({
    getDefaultProps: function(){
        return {
            name: 'Mary'
        };
    },

    //...
});

/*
 # Setting the Initial State

 在 ES6 中，你能过在构造函数中给 this.state 赋值定义初始 state:

 class Counter extends React.Component{
     constructor(props){
        super(props);
        this.state = {count: props.initialCount};
     }
     ...
 }

 对于 createReactClass(), 你必须提供一个 getInitialState 方法以返回初始值：

 var Counter = createReactClass({
     getInitialState: function(){
         retrun {count: this.props.initialCount};
     },
     //...
 })
*/

/*
 # Autobinding

 声明为 ES6 类的 React 组件中，方法遵循常规 ES6 类中同样的句意。这意味着他们不会自运绑定 this 到实例。你必须在构造函数中明确使用 .bind(this):   //??
*/

class SayHello extends React.Component {
    constructor(props){
        super(props);
        this.state = {message: 'hello!'};
        //This line is important!
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        alert(this.state.message);
    }
    render(){
        //Beause `this.handleClick` is bound, we can use it an event handle.
        return(
            <button onClick={this.handleClick}>
                Say Hello
            </button>
        );
    }
}

/*
 对于 createReactClass() 则不必，因为他绑定所有的方法：

 var SayHello = createReactClass({
     getInitialState: function(){
         return {message: 'Hello!'};
     }
     handleCLick: function(){
         alert(this.state.message);
     }
     render: function(){
         return (
             <button onClick={this.handleClick}>
                Say Hello 
             </button>
         );
     }
 });

 这意味着用 ES6 类用于事件处理函数带来了一些更加模板化的代码，但是好处是大应用有好一点的性能。

 如果这些模板化的代码一点也不吸引你，你可以启用试验性的 [类属性语法](https://babeljs.io/docs/plugins/transform-class-properties/)

 class SayHello extends React.Component {
     constructor(props){
         super(props);
         this.state = {message: 'hello!'};
     }
     //WARNNING: this syntax is experimental!
     //Using an arrow here binds the method:
     handleClick = () => {
         alert(this.state.message);
     }
     render(){
         return (
             <button onClick={this.handleClick}>
                Say hello
             </button>
         );
     }
 }

 请注意上面的语法是实验性的，可能会有所变化，或者提案会被写入该语言。

 如果你想保险点, 你有以下选项：

 - 在构造函数中绑定方法

 - 使用箭头函数，如: onClick={(e) => this.handleClick(e)}

 - 继续使用 createReactClass

*/

/*
 # Mixins
  ES6起没有任何 mixin 支持。因此，当你使用 React 与 ES6 时没有 mixins 支持。当使用 ES6 时不支持。我们也发现 codebases 中使用 mixins 有数不尽的问题，新的代码中我们不推荐使用。
*/