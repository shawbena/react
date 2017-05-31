// JSX 语法只是 React.createElement(component, props, ...children) 函数的语法糖
function getGreeting(user){
    if(user){
        return <h1>Hello, {formatName(user)}!</h1>
    }
    return <h1>Hello, Stranger.</h1>
}
function formatName(){

}

<MyButton color="blue" shadowSize={2}>Click Me</MyButton>

// 如果没有子元素可以使用自我闭合的标签
let div = <div className="sidebar" />
//未完待续