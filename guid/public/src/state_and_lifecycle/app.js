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
        this.state = { data: new Date() };
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root2')
);
