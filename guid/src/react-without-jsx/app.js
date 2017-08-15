import React from 'react';

/*
 # React 并非一定要用 JSX, 当你在你的构建环境中不想编译时不用 JSX 是非常方便的。

 每个 JSX 元素仅仅是调用 React.createElement(component, props, ...children) 的语法糖。所以用 JSX 可以做到的用纯 JavaScript 也可以做到。
*/

class Hello extends React.Component{
    render(){
        return React.createElement('div', null, `Hello ${this.props.toWhat}`);
    }
}

ReactDOM.render(
    React.createElement(Hello, {toWhat: 'World'}, null),
    document.getElementById('root')
);

/*
 组件既可以是字符串，也可以是 React.Component 的子类，或者是函数形式的无状态组件。

 如果你厌倦了老是键入 React.createElement, 你可以将他赋给一个简写：
 用简写形式会方便的多。
*/
const e = React.createElement;
ReactDOM.render(
    e('div', null, 'Hello World'),
    document.getElementById('root')
);
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div id="react_without_jsx">

            </div>
        );
    }
}

function bootstrap(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
}

export {bootstrap};