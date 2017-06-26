import React from '../react';
import NameForm from './nameForm';
import EassyForm from './eassyForm';
import FlavorForm from './flavorForm';
import Reservation from './reservation';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <NameForm />
                <EassyForm />
                <FlavorForm />
                <Reservation />
            </div>
        );
    }
}

/*
 # forms
 在 React 中 HTML 表单元素有点不同于其他 DOM 元素，表单元素天生地保持着一个内部状态。如下表单：

     <form>
         <label>
             Name:
             <input type="text" name="name" />
         </label>
         <input type="submit" value="Submit"/>
     </form>

 这个表单有默认的 HTML 表单的行为，当用记提交时他会浏览一个新页面。在 React 中也可以。但大多情况下，用 JavaScript 函数处理表单提交，访问用户输入表单中的数据是很方便的。做这种事情的标准方式叫 "controlled components"
*/
/*
 # Controlled Components
 在 HTML 中，form 元素如 <input>, <textarea> 和 <select> 常常维护自己的状态并且基于用户输入更新。在 React 中，可修改的状态通常保存在组件的 state 属性中，仅当调用 setState() 时更新。

 我们可以将这两个方式结合起来记 React state 成为 "single source of truth". 然后渲染表单的 React 组件响应后续用户输入。一个表单元素以这种方式被 React 控制叫 "controlled component".
 
 例如，我们可以把前面的盒子写成 controlled component 的表单：
  
      class NameForm extends React.Component {}..
 
 我们在表单元素上设置了 value 属性，显示的值将会一直是 this.state.value, making the React state the source of truth. 由 handleChange 响应每次键击，显示的值将随用户键入更新。

 有了 controlled component, 每次 state 修改都有一个相关的事件处理函数。这样使得修改或验证用户输入变得很直接。例如，如果我们想把用户输入的名子变全部大写可以这样写：
     
     handleChange = () => {
         this.setState({value: event.target.value.toUppercase()});
     }
*/

/*
 # textarea 标签
 在 HTML 中， <textareg> 通过子元素定义自己的广西：

     <textarea>
         Hello there, this is some text in a text area.
     </textarea>

 在 React 中，<textarea> 使用 value 属性。这样使用 <textarea> 的表单可以写的非常类似 input. //见 esssyForm.js
*/

/*
 # select 标签 
 在 HTML 中， <select> 创建一个下拉列表。如这段 HTML 创建一个风味下拉列表：

     <select>
         <option value="grapefruid">Grapefruit</option>
         <option value="lime">Lime</option>
         <option selected value="coconut">Coconut</option>
         <option value="mango">Mango</option>
     </select>

 注意最被选中的是 Coconut 选项，因为有 selected 属性。React 不使用 selected 而是用 select 标签的 value 属性。这样更方便。例如：

     见 flavorForm.js

 总的来说这使得 <input type="text">, <textarea> 和 <select> 非常相似 - 他们都接受一个 value 属性，你可以用他实现一个 controlled component.
*/

/*
 # 处理多个 input
 当你需要处理多个控制的 input 元素，你可以给每个元素添加一个 name 属性，让处理函数可以基于 event.target.name 选择。例如：

     见 reservation.js

*/

/*
 # 可选的 Uncontrolled Component
 我们推荐使用 Controlled Component, 但也可以使用 Uncontrolled COmponent (uncontrolled-components.md)
*/