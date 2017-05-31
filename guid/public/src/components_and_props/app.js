/*
 # 组件和属性
 组件让你将 UI 分成独立的重用的块块，并且可以独立的考虑每个块。
 概念上，组件类似 JavaScript 函数。他们接收任意输入（叫属性）并返回 React 元素（用于显示在屏幕上）。
*/
/*
 # 功能和组件
 定义组件的最简单方式是写一个 JavaScript 函数：
 这是一个有效的 React 组件，因为他接收一个单一的 "props" 对象参数并返回一个 React 元素。我们称这样的组件 "functional" 因为他们是字面量上地 JavaScript 函数。
*/
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// 用 ES6 class 定义一个组件。类有更多的特性
class Welcome2 extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

/*
 # 渲染一个组件
*/

//表示 DOM 标签的 React 元素
const element = <div />;
//使用用户自定义组件
const element2 = <Welcome name="Sara" />;

/*
 当 React 发现一个表示用户自定义组件的元素，React 把 JSX 属性作为一个单一对象传递给组件，我们叫这个对象为 "props". 例如，下面的代码在页面渲染 "Hello, Sara"
*/
// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// const element = <Welcome name="Sara" />;
ReactDOM.render(element2, document.getElementById('root'));

/*
 # 编辑组件
 组件可以在输出中引用其他组件。This lets us use the same component abstraction for any level of detail. 按钮，表单，对话框，屏幕：在 React 应用中，这些通常都用组件表示。例如，可以创建一个 App 组件渲染 Welcome 多次：
*/

function App() {
    return (
        <div>
            <Welcome name="Sara"></Welcome>
            <Welcome name="Cahai"></Welcome>
            <Welcome name="Edite"></Welcome>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root2')
);

/*
 # 提取组件
 对于可重的 UI 或复杂的组件，是很适合抽取为可重用的组件。
 function Comment(props){
    return(
        <div className="comment">
            <div className="user-info">
                <img className="avatar" src={props.author.avatarUrl} alt={props.author.name} />
                <div className="user-info-name">
                    {props.author.name}
                </div>
            </div>
            <div className="comment-text">
                {props.text}
            </div>
            <div className="comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}
*/
function Comment(props) {
    return (
        <div className="comment">
            <UserInfo user={props.author} />
            <div className="comment-text">
                {props.text}
            </div>
            <div className="comment-date">
                {Utli.formatDate(props.date)}
            </div>
        </div>
    );
}

// 提取 Avatar:
function Avata(props) {
    return (
        <img className="avatar" src={props.user.avatarUrl} alt={props.user.name} />
    );
}

//提取 UserInfo
function UserInfo(props) {
    return (
        <div className="user-info">
            <Avata user={props.user} />
            <div className="user-info-name">
                {props.user.name}
            </div>
        </div>
    );
}
//还可以继续提取...

let author = {
    name: 'jessi',
    avatarUrl: 'https:/images/jessi.png',
    text: 'sdfsdf',
    date: new Date(),
};
ReactDOM.render(
    <Comment author={author} text={author.text} date={author.date} />,
    document.getElementById('root3')
);
/*
 # props 是只读的
 无论组件是 function 或 class，都不应该改变其 props.
*/

/*
 #
 组件要用大写的驼峰；组件要返回一个单一的根元素
*/