import React from '../react';
import ReactDOM from '../react-dom';
import WarningButton from './WarningButton';
import { Pop, NewRolePop } from './Pop';
import Greeting from './Greeting';
import MyComponent from './MyComponent';
import {MyContainer, MyFirstComponent, MySecondComponent} from './MyContainer';
import MixedComponent from './MixedComponent';
import {ListOfTenThings} from './ListThings';

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
    showPopHandler = () => {
        ReactDOM.render(
            <Pop id="new_role_pop" title="新建角色" childPop={NewRolePop} />,
            document.getElementById('pop')
        );
    }
    render() {
        return (
            <div>
                <WarningButton />
                <div>
                    <button onClick={this.showPopHandler}>显示弹窗</button>
                </div>
                <MyTextBox autocomplete />
                <App1 />
                <App2 />
                <MyComponent>Hello world!</MyComponent>
                <MyComponent>
                    <div>
                        This is valid HTML &amp; JSX at the same time.
                    </div>
                </MyComponent>
                <SameDiv />
                <MyContainer>
                    <MyFirstComponent />
                    <MySecondComponent />
                </MyContainer>
                <MixedComponent>
                    aaaaaa
                </MixedComponent>
                <ListOfTenThings />
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

/*
 # Using Dot Notation for JSX Type
 见 MyComponents.js
*/

/*
 # 用户定义的组件必须要大写（capitalized (开头大写吗)）
*/

//...

/*
 # Choosing the Type at Runtime
 你可以使用常规表达式做为 React element type. 如果你真想用一个常规表达式指出元素的类型，首先将他赋值给一个大写的变量。这经常是你想基于一个 prop 渲染一个不同的组件：

*/
/*
 # Props in JSX
 # JavaScript Expression as Props
 # String Literals
 # props 默认为 ture 的 props
 如果你不给 prop 传值，他默认为 true. 下面两个 JSX 表达式是等价的：
    <MyTextBox autocomplete />
    <MyTextBox autocomplete={true} />
 [ES6 object shorthand] (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) 中 {foo} 是 {foo: foo} 而非 {foo: true} 的简写。这里这样写是因为匹配了 HTMl 的行为，注意这一点。
*/
function MyTextBox(props) {
    return (
        <div className="my-text-box">
            <input type="text" autoComplete={props.autocomplete} />
        </div>
    );
}

/*
# Props in JSX
 # Spread Attributes
 如果已经有一个 `props` 对象，并且你想让他在 JSX 中传递，你可以用 ... 作为 "spread" 操作符以传递整个 props 对象。以下两个组件是相等的：
*/

function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
    const propps = { firstName: 'Ben', lastName: 'Hector' };
    return <Greeting {...propps} />;
}
/*
 如果你要构建泛型的空中使用 Spread Attributes 很有用。然而，这样可能也会传递一些不相关的属性。我们建议你少使用这种语法。
*/

/*
 # Children in JSX
 在既有开标签又有闭合标签的，标签间的内容作为一个特殊属性传递：`props.children`. 有几种不同的方式传递 children：
 # String Literals
 # JSX Children
 # JavaScript Expression as Children
 # Function as Children
 # Booleans, Null, and Undefined Are Ignored
*/

/*
 # String Literals
 你可以在开和闭合标签间放一个字符串，`props.children` 将会是那这字符串。对于很多内置的 HTML 元素这样很有用。如：

  <MyComponent>Hello world!</MyComponent>
 
 这是有效的 JSX, `MyComponent` 中的 `props.chidren` 将会是字符串 "Hello world!". HTML 没有转义，所以你可以像写 HTML 一样写 JSX：
  
   <div>This is valid HTML &amp; JSX at the same time</div>

 JSX 移除了行开头和结尾的空白符。也移除了空行。临近标签的新行也被移除；字符串字面量间的新行被压缩为一个空格。所以这些渲染的是一样的：
*/
function SameDiv() {
    return (
        <div className="same-div">
            <div>Hello World</div>
            <div>
                Hello World
            </div>
            <div>
                Hello
                World
            </div>
            <div>


                Hello World
            </div>
        </div>
    );
}

/*
 # JSX Children
 你可以提供更多 JSX 元素做为 children. 这非常有用于展示嵌套的组件：
  
  <MyContainer>
      <MyFirstComponent />
      <MyFirstComponent />
  </MyContainer>
 
 你可以混合使用不同类型的 children, 你可以将字符串字面量和 JSX children 一起使用。JSX 的这一点类似 HTML，所以这是有效的 JSX 也是有效的 HTML:
  
   <div>
       Here is a list:
       <ul>
           <li>Item 1</li>
           <li>Item 2</li>
       </ul>
   </div>

  一个 React 组件不能返回多个 React 元素，但一个 JSX 表达式可以有多个子元素，所以如果你想用一个组件渲染多个东西，你可以像上面一样把他包裹在一个 div 中。 
*/

/*
 # JavaScript Expression as Children
 你可以传递任何 JavaScript 表达式作为 children, 将其包裹在 `{}` 中。如下面的表达式是等价的：

     <MyComponent></MyComponent>
     <MyComponent></MyComponent>

 当渲染任意长度的 JSX 表达式列表时很有用。如下渲染一个 HTMl 列表：

     function Item(props){
         return <li>{props.message}</li>
     }

     function TodoList(){
         const todos = ['finish doc', 'submit pr', 'nag dan to review'];
         return (
             <ul>
                {todos.map((message) => <Item key={message} message={}message />)}
             </ul>
         );
     }

 JavaScript 表达式可以和其他类型的 children 混用。这经常有用于替代字符中模板：
      
      function Hello(props){
          return <div>Hello {props.addressee}</div>;
      }
 */ 
/*
 # Functions as Children
 通常，插入 JSX 的 JavaScript 表达式将评估为字符串，一个 React 元素，或者一个列表的这样的元素。
    <ListOfTenThings />
 传递给自定义组件的 children 可以是任何东西，只要在渲染前组件把他们转换成 React 可理解的就可以。这种用途并不觉，但是他可以工作如果你想延伸下 JSX。
*/

/*
 # Booleans, Null, and Undefined Are Ignored
 `false`, `null`, `undefined` 和 `true` 是有效的 children. 只是不渲染而已。以下的 JSX 表达式渲染的是一样的：
  
  <div />
  <div></div>
  <div>{false}</div>
  <div>{null}</div>
  <div>{undefined}</div>
  <div>{true}</div> 

  这有用于有条件渲染 React 元素。这个 JSX 仅当 showHeader 为 true 时渲染一个 <Header />:

      <div>
          {showHeader && <Header>}
          <Content />
      </div>

 注意 `false` 值，如一个 0 数组，仍然会被 React 渲染。例如，这段代码的执行结果不会如你所愿，因为当 props.message 是一个空数组时将会打印 0：

     <div>
         {props.messages.length && <MessageList messages={props.messages} />}
     </div>
 
 相反，如果像 `false`, `true`, `null` 或 `undefined` 这样的值如果你想让他出现在输出中，你要把先把他转换 (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion) 成字符串：

     <div>
         My JavaScript variable is {String(myVariable)};
     </div>
 
*/
/*
 # end
*/
export default App;