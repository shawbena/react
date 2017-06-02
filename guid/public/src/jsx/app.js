import React from '../react'
import ReactDOM from '../react-dom'
import WarningButton from './WarningButton'

/*
 # JSX in depth
*/
// JSX 语法只是 React.createElement(component, props, ...children) 函数的语法糖

// <MyButton color="blue" shadowSize={2}>
//     Click Me
// </MyButton>
/* 
    编译成：
    React.createElement(
        MyButton,
        {color: 'blue', shadowSize: 2},
        'Click Me'
    )
*/

class App extends React.Component {
    render() {
        return (
            <div>
                <WarningButton />
            </div>
        );
    }
}
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>
    }
    return <h1>Hello, Stranger.</h1>
}
function formatName() {

}

// <MyButton color="blue" shadowSize={2}>Click Me</MyButton>

// 如果没有子元素可以使用自我闭合的标签
let div = <div className="sidebar" />
/*
 编译成：
 React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
*/

/*
 # 指定 React 元素类型
 The first part of a JSX tag determines the type of the React element.
 大写的类型指出 JSX 标签引入的是一个 React 组件。这些标签编译成了对命名变量的直接引用。所以如果你使用 JSX <Foo /> 表达式，Foo 必须在作用哉内
*/

/*
 # React 必须在作用域内
 由于 JSX 编译成了 React.createElement 调用，React 库必须总是在你的 JSX 代码的作用域内。
*/













export default App;