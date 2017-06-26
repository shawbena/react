// 制件交互式的 UI
class LikeButton extends React.Component{
    constructor(){
        super();
        this.state = {
            liked: false
        };
        this.handleClick = this.handleClick.bind(this); //?
    }
    handleClick(){
        this.setState({liked: !this.state.liked});
    }
    render(){
        const text = this.state.liked ? 'liked' : 'haven\'t liked';
        return (
            <div onClick={this.handleClick}>
                You {text} this. Click to toggle.
            </div>
        );
    }
}
let Button = <LikeButton />;
// ReactDom.render(ReactElement element, DOMElement container, [function callback])
ReactDOM.render(
    <LikeButton />,
    document.getElementById('example')
);
//事件处理与合成事件
//原理：自动绑定与事件委托
/*
 自动绑定：React 中每个方法自动绑定 React 实例（ES6 class 语法除外）。
 事件委托：
*/

/* 组件就是状态机器
 React 认为 UI 就是简单的状态机器。把 UI 认为是几种状态并渲染这些状态，很容易保持你的 UI 一致。
 在React 中，你仅需更新一个组件的状态，然后基于新的状态渲染一个新的 UI. React 负责以最有效的方式更新 DOM.
*/

/* State (状态) 是怎样工作的
 通知 React 数据变化的常规方式是调用 setState(data, callback). 这个方法将 data 与 this.state 合并重新渲染组件。当组件完成渲染时，调用可选的 callback. 大多数情况下你用不着 callback 因为 React 将负责为你更新 UI 。
*/
/* 什么组件应该有 State?
 大多组件仅从 props 接收数据并渲染他。然而有时你需要响应用户输入，服务器请求或时间流逝。这你可用 state.
 尽量尽可能使组件无状态。使状态与大多逻辑孤立起来，最小化冗余度，使程序更容易理解。
 常用的模式是创建一些只渲染数据的组件，之上有一个有状态的组件通过 props 将其状态传递给子组件。有状态的组件包括了所有的交互逻辑，而无状态的组件负责渲染数据。
*/

/* State 中应该有什么？
 State 应该包含组件事件处理程序变化触发使 UI 更新的事件。在真实的应用中，这些数据倾向于非常小并且是 JSON 序列化的。当构建状态化组件时，多想使用最小化表示的 state, 仅把这些属性存在 this.state 中。在 render() 中基于这些组件计算出你需要的其他信息。你会发现以这样的方式思考和写应用的结果是更加正确的应用程序，因为给 state 添加繁多的或计算的值意味这你要明确地保持他们同步而非让 React 为你计算他们。
*/

/* State 中不应该有什么？
 this.state 应该只包含表示 UI 状态的最小数量的数据。因此，不应该包括：
 * 计算的数据：不要担心基于 state 重复计算值——如果你在 render() 中做所有的计算这样易于保持 UI 一致。例如，在 state 中有一个数据列表，你想把他把他的数量渲染为字符串，仅在 render() 方法中渲染 this.state.listItems.length + ' list items' 而不是将其存在 state 中。
 * React 组件：在 render() 中基于底层 props 和 state 构建他们。
 * 来自 props 重复的数据：当你需要知道之前的值时你可以存储属性，因为父组件重新渲染时属性便会更新。
*/