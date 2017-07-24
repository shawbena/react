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
 你可能不会将 ref 属性用于函数功能的组件，因为他们没有实例：
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
 虽然你可以给子组件添加 ref, 但这不是个理想的解决方案, 因为这样你只得到一个组件实例而非一个 DOM 节点。而且，对于功能型组件这也不起作用。

 这种情形，我们推荐暴露给子组件一个特殊的属性，子组件可使用一个函数属性 (如 inputRef) 将其附加给 DOM 节点做为 ref 属性。这使得父元素通过中间的组件传递其 ref 回调给子 DOM 节点。

 这既可用于类组件也可用于函数功能的组件。

 function CustomTextInput(props){
     return(
         <div>
            <input ref={props.inputRef} />
         /div>
     );
 }

 class Parent extends React.Component{
     render(){
         return(
             <CustomTextInput inpurRef={el => this.inputElement = el}>
         );
     }
 }

 上面这个例子，Parent 组件将其 ref 回调作为 inputRef 属性传递给 CustomeTextInput, CustomTextInput 传递同样的函数作为 <input> 的特殊属性 ref. 最后，Parent 中的 this.inputElement 将会被设置为 CustomTextInput 中对应的 DOM 节点 <input> 元素。

 注意上面例子中的 inputRef 属性 这个名称并没有特殊含义，只是一个常规的组件属性。然而，在 <input> 上使用 ref 属性是重要的，因为他告诉 React 给其 DOM 节点添加一个 ref.

 即使 CustomTextInput 是个函数功能的组件这也起作用了。不像 ref 属性只能特写于 DOM 元素或类组件，像 inputRef 这样的常规组件属性没有这样的限制。

 这种模式的另一个好处是再深入几个组件这也起作用。例如: 设想 Parent 不需要那个 DOM 节点，但是渲染 Parent 的组件(假设他为 Grandparent 吧)需要 访问。那我们可以让 Grandparent 指定 inputRef 属性给 Parent, 让 Parent 往前给 CustomTextInput:

 function CustomeTextInput(props){
     return(){
         <div>
            <input ref={props.inputRef} />
         </div>
     }
 }

 function Parent(props){
     return (
         <div>
            My input: <CustomTextInput inputRef={props.inputRef} />
         </div>
     );
 }

 class Grandparent extends React.Component{
     render(){
         return (
             <Parent inputRef={el => this.inputElement = el}>
         );
     }
 }

 这里，ref 回调由 Grandparent 指定，作为常规属性 inputRef 传递给 Parent，Parent 也将他作为属性传递给 CustomTextInput😁. 最后 CustomTextInput 读到 ref 这个属性并将这个传递来的函数作为 ref  的属性传递给 <input>, 结果时 Grandparent 中的 this.inputElement 将会被设置为 CustomTextInput 中对应的 <input> DOM 节点。

 All things considered, we advise against exposting DOM nodes whenever posssible, but this can be a userful escape hatch. Note that this approach requires you to add some code to the child component. If you have absolutey no control over the child component implementation, your last option is to use findDOMNode(), but it is discouraged.
*/

/*
 # Legacy API: String Refs
 ...
*/

/*
# Caveats
如果 ref 回调定义为内联函数，在更新期间将被调用两次，第一次接收 null, 再次为 DOM 元素。这是因为每次渲染会创建新的函数实例，所以 React 需要清理旧的 ref 并建立新的。你可以将 ref 回调的定义绑定到类方法来避免这种行为，但大数情形没什么问题。
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