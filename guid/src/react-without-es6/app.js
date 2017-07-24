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

 未完蛋，待续...
*/
