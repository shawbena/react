import React from '../react';
import ReactDOM from '../react-dom';
/*
 Avoid using refs for anything that can be done declaratively
*/
/*
 正常的 React 数据流中， props 是父组件与其子组件交互的唯一方式。要修改子组件，你使用新的 props 渲染
*/

/*
 # 给 DOM 元素添加 ref
 React 支持一个可以添加给任何组件特殊属性。ref 属性接收一个回调函数，回调函数会在组件挂载后或卸载后立即被执行。

 当 ref 属性用于 HTML 元素上时，ref 回调接收一个底层 DOM 元素作为其参数。例如这段代码使用 ref 回调存储一个 DOM 节点引用：
*/

class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    focus = () => {
        //Explicitly focus the text input using the raw DOM API
        this.textInput.focus();
    }
    render() {
        return (
            <div>
                <input type="text" ref={(input) => { this.textInput = input; }} />
                <input type="button" value="Focus the text input" onClick={this.focus} />
            </div>
        );
    }
}

/*
 组件挂载时 React 将带一个 DOM 元素调用 ref 回调, 组件卸载时 调用 ref 带 null. 使用 ref 回调只设置一个类的属性是访问 DOM 元素的常见方式。倾向的方式是在上面的 ref 回调中设置属性。
*/

/*
 # 给类组件添加 ref
 当 ref 属性用于声明为类的自定义组件时，ref 回调接收组件的挂载实例做为其参数。
*/

class AutoFocusTextInput extends React.Component{
    componentDidMount(){
        this.textInput.focus();
    }
    render(){
        return (
            //此处 input 指 CustomTextInput
            <CustomTextInput ref={(input) => {this.textInput = input;}}/>
        );
    }
}
/*
 # refs 和函数功能组件
 你可能不会将 ref 属性用于函数功能的组件，因为他们滑实例：
*/

function MyFunctionalComponent(){
    return <input />;
}

class Parent extends React.Component{
    render(){
        // This will *not* work
        return (
            <MyFunctionalComponent ref={(input) => {this.textInput = input;}}/>
        );
    }
}
/*
 如果你要需要引用组件你应该把他转为类，就像你需要生命周期方法时那样做。然而你可以在函数功能组件内使用 ref 属性引用一个 DOM 元素或一个类组件。
*/

function CustomTextInputFun(props){
    //textInput 必须先在些声明 ref 回调才能引用他
    let textInput = null;

    function handleClick(){
        textInput.focus();
    }

    return (
        <div>
            <input type="text" ref={(input) => {textInput = input;}}/>
            <input type="button" value="Focus the text input" onClick={handleClick}/>
        </div>
    );
}

/*
 # DOM refs 暴露给父组件
 很少有你想在父组件中访问子组件的 DOM 节点。通常不推荐这样做，因为这破坏了组件的封装，但这偶你会有用于触发子组件 DOM 点的焦点或测量其大小或位置。
 虽然你可以给子组件添加 ref, 但这不是个理想的解决方案
*/

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <CustomTextInput />
                <AutoFocusTextInput />
                <CustomTextInputFun />
            </div>
        );
    }
}

function bootstrap() {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
}

export { bootstrap };