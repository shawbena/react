import React from '../react';
import ReactDOM from '../react-dom';
import { NewRolePop } from '../pops';

/*
 # list and keys
     //处理 JavaScript 中的数组
     const numbers = [1, 2, 3, 4, 5, 6];
     const doubled = numbers.map((number) => number * 2);
     console.log(doubled);

    在 React 中将数组转换成元素 (rendering-element.md) 列表是相近的。

 # 渲染多个组件
 你可以构建一个元素集合，并用 {} 将他放在 JSX (introducing-jsx.md, jsx-in-depth.md) 中。
*/
const numbers = [1, 2, 3, 4, 5];
//"key" 是一个特殊属性，当创建列表元素时要带上他。
const listItems = numbers.map((number) => {
    return <li key={number}>{number}</li>
});

/**
 * # 基本的列表组件
 * 我们经常需要在一个组件中渲染列表。
 * 
*/
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => {
        return <li key={number}>{number}</li>
    });
    return (
        <ul className="number-list">{listItems}</ul>
    );
}

/*
 # Keys
 Keys 帮助 React 识别变化，被添加，移除的项。应该给数组中的元素添加 key 以给元素稳定的身份。挑选 key 的最好方式是有能在其同级中独一无二的标识。常常把数据的 ID 用做 key:

     const todoItems = todos.map((todo) => {
         <li key={todo.id}>
            {todo.text}
         </li>
     });

不推荐使用项索引做为 key，如果重排序，那会非常慢。如果你感兴趣可以读下深入解释为什么需要 key (reconciliation.md).

     const dotoItems = todos.map((todo, index) => {
         return <li key={index}>{todo.text}</li>;
     });
*/

/*
 # 提取带键的组件
 键只在包含他的数组的上下文中有意义。

    //这样是不正确的 Key 的用法
    function ListItem(props) {
    const value = props.value;
    return (
        // Wrong! There is no need to specify the key here:
        <li key={value.toString()}>
        {value}
        </li>
    );
    }

    function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // Wrong! The key should have been specified here:
        <ListItem value={number} />
    );
    return (
        <ul>
        {listItems}
        </ul>
    );
    }

    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
    );

    //正确的用法
    function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li>{props.value}</li>;
    }

    function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // Correct! Key should be specified inside the array.
        <ListItem key={number.toString()}
                value={number} />
    );
    return (
        <ul>
        {listItems}
        </ul>
    );
    }

    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
    );
*/

/*
 # 键必须在兄弟姐妹中独一无二
 数组中的键应该在兄弟姐妹中独一无二的。然而不需要全局独一无二。当创建不同数组时可心使用同样的键：
*/

function Blog(props) {
    const sidebar = (
        <ul>
            {
                props.posts.map((post) => {
                    return (
                        <li key={post.id}>
                            {post.title}
                        </li>
                    );
                })
            }
        </ul>
    );

    const content = props.posts.map((post) => {
        return (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
        );
    });

    return (
        <div className="blogs">
            {sidebar}<hr />
            {content}
        </div>
    );
}

const posts = [
    {
        id: 1,
        title: 'Hello World',
        content: 'Welcome to learning'
    }, {
        id: 2,
        title: 'Installation',
        content: 'You can install React from npm.'
    }
];

/*
 键的作用是给 React 个提示，但汪会传递给组件，如果组件中需要同样的值，请用属性传递：

    const content = posts.map((post) =>
    <Post
        key={post.id}
        id={post.id}
        title={post.title} />
    );
*/

/*
 # 在 JSX 中嵌入 map()
 前面的例子中我们声明了一个 listItems 变量并将他放在了 JSX 中：

    function NumberList(props){
        const numbers = props.numbers;
        const listItems = numbers.map((number) => {
           return <ListItem key={number.toString()} value={number} />
        });

        return (
            <ul>{listItems}</ul>
        );
    }

 JSX 允许在 {} 中嵌入 (introducing-jsx.md) 任表达式，所以你可以内联 map() 结果：

     function NumberList(props){
         const numbers = props.numbers;
         return (
             <ul>
                {numbers.map(number) => <ListItem key={number.toString() value={number} />}
             </ul>
         );
     }
 有时这样做会使代码清淅一点，但这也可能被滥用。像在 JavaScript 中一样，这取决于你是否值得将变量提取出来以获得更好的阅读性。如果 map() 体太嵌套了，那就是就把他抽取成一个组件的绝佳时机。
*/

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <ul>
                    {listItems}
                </ul>
                <NumberList numbers={numbers} />
                <Blog posts={posts} />
            </div>
        );
    }
}
export default App;