/* 多组件
 React 最好的特色就是：可组合性。
*/
/* Seapration of Con cerns
 通过构建模块化的组件，以良好定义的接口重用其他组件，你获得通过函数或类可以获得的好处。特别是你可能通过构建新的组件来分开不同的关系。通过为你的应用构建自定义的组件，你以最适合你的方式构建 UI.
*/
/* Ownership
*/
/* Children
*/
/* Child Reconciliation
*/
/* StateFul Children
*/
/* Dynamic Children
*/
/* Data Flow
 在 React 中数据透过 props 从所有者流向所拥有的组件。这是有效的单向数据绑定：所有者将拥有的组件的 props 绑定至所有者基于自己的 props 或 state 计算的值。由于这个过程是递归的，数据的变化自动反映在所用到的地方。
*/
/* 关于性能
 你可能认为如果所有者有大量的节点，那么变动数据花费会很大。好消息是 JavaScript 非常快而且 render() 方法倾向于非常简单，所以大多应该是极其快的。除此之外，瓶颈几乎总是 DOM 修改而非 JS 执行。React 通过批处理和变化侦测为你优化。
 然而，有时你想正好的控制属性。这时你可以重写 shouldComponentUpdate() 返回 false 如果你想让 React 跳过处理子树。详见 the React reference docs (http://reactjs.cn/react/docs/component-specs.html).
 注意，如果数据真的变化了而 shouldComponentUpdate() 返回 false, React 不会保持你的 UI 同步。用他是确保你知道你在做什么，只有当你不有明显的性能问题时，否则不要用他。不要低估了 JavaScript 比 DOM 快多了。
*/
let Avatar = React.createClass({
    render(){
        return (
            <div>
                <PagePic pagename={this.props.pagename} />
                <PageLink pagename={this.props.pagename} />    
            </div>
        );
    }
});

let PagePic = React.createClass({
    render(){
        return (
            <img src={'https://graph.facebook.com/' + this.props.pagename + '/picture'} />
        );
    }
});

let PageLink = React.createClass({
    render(){
        return (
            <a href={'https://www.facebook.com/' + this.props.pagename}>
                {this.props.pagename}
            </a>
        );
    }
});

ReactDOM.render(
    <Avatar pagename="Engineering" />,
    document.getElementById('example')
);