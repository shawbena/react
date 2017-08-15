/*
 # composition vs inheritance
 React 有强大的创作模式，我们建议 composition 而非继承组件间的代码。

 一些对 React 还比较陌生的开发者常常想着要用继承, 本节我们将就此思考如何用 composition 解决问题
*/

/**
 * ## 容器
 * 一些组件并不能预先知道他们的子组件。对于像 Sidebar 或 Dialog 这些泛型的盒子组件是尤其常见的。对于这样的组件我们推荐使用 children 属性将子元素直接传入其输出：
 */

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

/**
 * 这使得其他组件通过嵌套 JSX 的形式传递任意的子组件：
 */

//这是传说中的 UI 组件吗
function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visition our spacecraft!
            </p>
        </FancyBorder>
    );
}
/**
 * <FancyBorder> JSX 标签中的东本都会为 children 属性传递给 FancyBorder. FancyBorder 在 一个 <div> 中渲染  {props.children}, 传递的元素将会出现在最终的输出中。
 * 不太常见的是，有时你可能需要一个组件中有多个 "洞". 这种情况你可能有自己的习惯而非使用 children
 *
 * 
 */

function SplitPane(props){
    return(
        <div className="SplitPanel">
            <div className="SplitPanel-left">
                {props.left}
            </div> 
            <div className="SplitPanel-right">
                {props.right}
            </div>
        </div>
    );
}

function App(){
    return (
        <SplitPane left={<Contacts />} right={<Chat />}/>
    );
}

/**
 * React 元素像 <Contacts /> 和 <Chat /> 仅仅是对象，所以你可以像传递任何数据那样把他人们传递为属性。
 */

/**
 * ## Specialization
 * 有时我们可以认为组件是其他组件的 "special cases", 例如我们可能认为 WelcomeDialog 是 Dialog 的一个特写的例子。
 * 
 * 在React 中这样也是通过 composition 做到，这种情形一个 "specific" 组件渲染一个 "generic" 并用 props 配置他：
 */

function Dialog(props){
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-message">{props.message}</p>
        </FancyBorder>
    );
}

function WelcomeDialog(){
    return (
        <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
    );
}

/**
 * Composition 也适用于类组件
 */

 function Dialog(props){
     return (
         <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-message">{props.message}</p>
            {props.children}
         </FancyBorder>
     );
 }

class SignUpDialog extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.state = {login: ''};
    }
    handleChange(e){
        this.setState({login: e.target.value});
    }
    handleSignUp(){
        alert(`Welcome aboard, ${this.state.login}!`);
    }
    render(){
        return(
            <Dialog title="Mars Exploration Program" message="How should refer to you?">
                <input type="text" value={this.state.login} onChange={this.handleChange}/>
                <button onClick={this.handleSignup}>Sign Me Up!</button>
            </Dialog>
        );
    }
}

/**
 * ## 那么继承呢
 * 在 Facebook 我们成千上万个组件中使用 React, 我们并没有发现哪种情形我们将会推荐使用继承来创建组件。
 * props 和 composiiton 给你自定义一个组件的外观衙行为的所有灵活性，清淅且安全。记住，组件可接收任意属性，包括基本值，React 元素或函数。
 * 如果你想在组件间重用非 UI 功能，我们建议你将其抽取成一个独立的 JavaScript 模块。组件可以引入他并使用其功能，对象，或类，而不用扩展他。
 */