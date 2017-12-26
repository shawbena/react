# Composition vs Inheritance

[prev](/lifting-state-up/): lifting-state-up
[next](/thinking-in-react/): thinking-in-react

React 有强大的创作模式，我们建议编创作 (composition) 而非继承组件间的代码。

React 新手对待一些问题通常倾向继承, 本节我们将就此思考如何用 compositio 解决问题。

## Containment

一些组件并不能预先知道他们的子组件。对于像 `Sidebar` 或 `Dialog` 这些泛型的盒子组件是尤其常见的。对于这样的组件我们推荐使用 children 属性将子元素直接传入他们输出：

```js
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}
```

这使得其他组件通过嵌套 JSX 的形式传递任意的子组件：

```js
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
```

`<FancyBorder>` JSX 标签中的东本都会作为 children 属性传递给 `FancyBorder` 组件. `FancyBorder` 在一个 `<div>` 中渲染 `{props.children}`, 传递的元素将会出现在最终的输出中。
 
 不太常见的是，有时你可能需要一个组件中有多个 "洞". 这种情况你可能有自己的习惯而非使用 `children`:

 ```js
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
```

像 `<Contacts />` 和 `<Chat />` 的 React 元素只是对象而已，所以你可以像传递任何数据那样把他们作为属性传递。

## Specialization

有时我们可以认为组件是其他组件的 "特例", 例如我们可能认为 `WelcomeDialog` 是 `Dialog` 的一个特定的例子。

在React 中这样也是通过创作做到，这种情形一个 "specific" 组件渲染一个 "generic" 组件并用属性配置他：

```js
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
```

创建同样适用于定义为类的组件：

```js
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
```

## So What About Inheritance?

在 Facebook, 我们有成千上万个组件使用 React, 我们并没有发现哪种情形我们将会推荐组件继承层次。

属性和创作给你自定组件的外观和行为的所有灵活性，清淅且安全。记住，组件可接收任意属性，包括基本值，React 元素或者函数。

如果你想在组件间重用非 UI 功能，我们建议你将其抽取成一个独立的 JavaScript 模块。组件可以引入他并使用其功能，对象，或类，而不用扩展他。