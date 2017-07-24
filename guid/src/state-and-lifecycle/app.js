/*
    #
    到目前为止，你应该能使用基本的 JSX，编写简单的组件，知道怎么渲染 UI
*/
/*
 # State and Lifecycle
 本节我们学习怎样使用 Clock 组件重用和封装。Clock 组件将建立自己的 timer 并每隔1秒自动更新自己。
*/

function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );

    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}
// setInterval(tick, 1000);

//封装 Clock
function Clock1(props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick2() {
    /*
     理想的情形时这样的代码只写一次, 让组件更新自己，要这样做需要给 Clock 组件添加 "state". State 类似 props, 但是是组件私有并完全控制的。前面我们说过定义为类的组件有额外的功能。本地 state 是仅类可用的特色。
     */
    ReactDOM.render(
        <Clock1 />,
        document.getElementById('root2')
    );
}
// setInterval(tick2, 1000);

/*
 # 将 Function 转换为 Class
 # 给类添加本地状态
*/

class Clock extends React.Component {
    // Class components should always call the base constructor with props.
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <FormattedDate date={this.state.date} />
            </div>
        );
    }
    //组件挂载时，在组件输出已经渲染至 DOM 后运行
    componentDidMount() {
        //此处必需要用 lambda 函数绑定上下文的 this
        this.timerID = setInterval(() => {
            this.tick();
            console.log(this);
        }, 1000);
        
    }
    //组件卸载时, 拆除定时器
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

/*
 组件第一次渲染叫挂载，移除叫卸载
*/

/*
* # 正确使用 State
*
* 不要直接修改 State
* //Wrong, 这样不会重新渲染组件
* this.state.comment = 'Hello';
* //使用 setState();
* //correct
* this.setState({comment: 'Hello'});
* 可以给 this.state 赋值的地方只能是在构造函数中
*
* State 更新可能是异步的
* React 将多个 setState() 调用批处理成一个为了性能。
* 因为 this.props 和 this.state 可能异步更新，所以你不应该依赖他们的值计算下一个 state
* //wrong
* this.setState({
*   counter: this.state.counter + this.props.increment
* });
* //correct, 使用 setState() 的另一种形式
* this.setState((prevState, props) =>({
*    counter: prevState.counter + props.increment   
* }));
* //correct
* this.setState(function(prevState, props){
    return {
*     counter: prevState.counter + props.increment   
*   };
*  });
*
* State 更新是合并的
* 当你调用 setState() 时，React 用你传入的对象合并成当前的 State.
* this.setState({comments}) 不会改动 this.state.posts, 只是替换了 this.state.comments.
*/

/*
* # 数据向下流动
* 无论是父组件还是子组件都不应该知道某个组件是有状态的还是无状态的，他们不应该关心组件是函数或者类
* 这就是为什么状态经常叫做本地的或封装的。除了拥有的或设置的组件外对任何组件都是不可访问的。
*
* 一个组件可选择将自己的状态作为 prpos 传递给子组件
* FormattedDate 组件将会接收到 date 作为属性并且不知道他是来自 Clock 的 state，来自 Clock 的 props，还是随手键入的。
* 这常常称为 "top-down" 或 "unindrectional" 数据流。任何状态只能被一些特定的组件所拥有，继承状态的任何数据或 UI只能影响树中他们之下的组件。
* 如果你把组件树想像为 props 的瀑布流，每个组件的状态就像一个额外的水源在任意节点汇入但是是向下流动的。
* 所有的组件都是完全孤立的，请看 <App> 组件
*/
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
// <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
ReactDOM.render(
    <Clock />,
    document.getElementById('root2')
);
/*
 每个 Clock 建立自己的计时器，并独立更新。
 在 React 应用中，无论一个组件是有状态的还是无状态的都被视为组件的实现细节，可能会随时间变化。你可以在无状态的组件中使用有状态的组件，反过来也可以。
*/
function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root3')
);